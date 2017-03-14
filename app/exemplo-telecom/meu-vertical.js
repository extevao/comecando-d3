var width = 700;
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
        return { x: relacaoOperadora.nome, y: relacaoOperadora[parametro] };
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

var widthScale = d3.scale.linear()
  .domain([0, 83])
  .range([0, width]);

var canvas = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var layer = canvas.selectAll('stack')
  .data(dataStackLayout)
  .enter()
    .append('g')
    .style("fill", function (d, i) {
        return color(i);
    });


layer.selectAll("rect")
    .data(function (d) {
        return d;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
        return y(d.y0 + d.y);
    })
    .attr("y", function(d, indice){
        return x(d.x);
    })
    .attr("height", x.rangeBand() )
    .attr("width", function (d) {
        return y(d.y0) - y(d.y + d.y0);
    } );