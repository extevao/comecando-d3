var margin = { top: 20, right: 30, bottom: 30, left: 40 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var color = d3.scale.category20();

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var dataIntermediate = parametrosEixoX.map(function (parametro) {
    return relacaoLigacoesOperadoras.map(function (relacaoOperadora) {
        return { x: relacaoOperadora.nome, y: relacaoOperadora[parametro], legenda: parametro };
    });
});
var dataStackLayout = d3.layout.stack()(dataIntermediate);

x.domain(dataStackLayout[0].map(function (d) {
    return d.x;
}));

y.domain([0,
    d3.max(dataStackLayout[dataStackLayout.length - 1],
        function (d) { return d.y0 + d.y; })
]).nice();

var canvas = d3.select("body")
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



canvas.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

canvas.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("transform", "rotate(-90)")
    .attr('y', 6)
    .attr('dy', '.71em')
    .style("text-anchor", "end")
    .text("Quantidade de ligações");

var layer = canvas.selectAll('stack')
    .data(dataStackLayout)
    .enter()
    .append('g');

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
    .attr("width", x.rangeBand())
    .attr("class", function (d, i) {
        return d.legenda;
    })
    .append("text")
        .text(function (d) {
            return d.y;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
