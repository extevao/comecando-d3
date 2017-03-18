var data = [30, 15, 50, 70, 80, 65, 43];
var width = 500;
var height = 400;

var canvas = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#ccc');

var widthScale = d3.scale.linear()
    .domain([0, 80])
    .range([0, width]);

var heightScale = d3.scale.linear()
    .domain([0, 80])
    .range([0, height]);

var colorScale = d3.scale.linear()
    .domain([0, 80])
    .range(['blue', 'red']);

var bars = canvas.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', function(d){
        return widthScale(d);
    })
    .attr('height', 50)
    .attr('y', function(d, i){
        return  60 * i ;
    })
    .attr('fill', function(d){
        return colorScale(d);
    });
    
