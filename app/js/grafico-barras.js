var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25
];
var $dataset = [5, 10, 13];

//Width and height
var width = 500;
var height = 100;
var barPadding = 1;

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);


svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (dado, indice) {
        return indice * (width / dataset.length);
    })
    .attr("y", function (dado) {
        return height - dado * 4;
    })
    .attr("width", width / dataset.length - barPadding)
    .attr("height", function (dado) {
        return dado * 4;
    })
    .attr("fill", function (d) {
        return "rgb(0, 0, " + (d * 10) + ")";
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (dado) {
        return dado;
    })
    .attr("x", function (dado, indice) {
        return indice * (width / dataset.length) + (width / dataset.length - barPadding)/2;
    })
    .attr("y", function (dado) {
        return height - (dado * 4) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");