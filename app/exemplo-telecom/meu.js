var width = 500;
var height = 600;
var barPadding = 1;
var color = d3.scale.category20();

var x = d3.scale
    .ordinal()
    .rangeRoundBands([0, width], .35);
var y = d3.scale
    .linear()
    .rangeRound([height, 0]);

var dataIntermediate = parametrosEixoX.map(function (parametro) {
    return relacaoLigacoesOperadoras.map(function (relacaoOperadora) {
        //  console.log('--operadora: ', operadora, '--relacaoOperadora: ', relacaoOperadora[operadora])
        return { x: relacaoOperadora.nome, y: relacaoOperadora[parametro] };
    });
});

console.log(dataIntermediate)

var dataStackLayout = d3.layout.stack()(dataIntermediate);

console.log(dataStackLayout)

x.domain(dataStackLayout[0].map(function (d) {
    return d.x;
}));

y.domain([0,
    d3.max(dataStackLayout[dataStackLayout.length - 1],
        function (d) { return d.y0 + d.y; })
]).nice();



var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var layer = svg.selectAll("stack")
    .data(dataStackLayout)
    .enter().append("g")
    .attr("class", "stack")
    .style("fill", function (d, i) {
        return color(i);
    });

layer.selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter().append("rect")
    .attr("x", function (d) {
        return x(d.x);
    })
    .attr("y", function (d) {
        return y(d.y + d.y0);
    })
    .attr("height", function (d) {
        return y(d.y0) - y(d.y + d.y0);
    })
    .attr("width", x.rangeBand());

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


















































// svg.selectAll('stack')
//     .data(dataStackLayout)
//     .enter()
//         .append("g")
//         .attr("class", "stack")
//         .attr("x", function (operadora, indice) {
//             return indice * (width / relacaoLigacoesOperadoras.length);
//         })
//         .attr("y", function (dado) {
//             return height - dado.total;
//         })
//         .attr("width", width / relacaoLigacoesOperadoras.length - barPadding)
//         .attr("height", function (operadora) {
//             return operadora.total;
//         })
//         .style("fill", function (d, i) {
//             return color(i);
//         });



