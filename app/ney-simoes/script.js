var dataArray = [ 30, 15, 50, 70];

var width = 500;
var height = 500;

var canvas = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var widthScale = d3.scaleLinear()
    .domain([0, 80])
    .range([0, width]);


var bars = canvas.selectAll('rect')
    .data(dataArray)
    .enter()
        .append('rect')
        .attr('width', function(dado){
            return dado * 10;
        })
        .attr('height', 50)
        .attr('y', function(dado, index){
            return index * 100;
        });