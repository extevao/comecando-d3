var dataArray = [ 5, 30, 15, 50, 70, 80];

var width = 500;
var height = 500;

var canvas = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var widthScale = d3.scaleLinear()
    .domain([0, 83])
    .range([0, width]);

var colorScale = d3.scaleLinear()
    .domain([0, 80])
    .range(['red', 'blue']);


var bars = canvas.selectAll('rect')
    .data(dataArray)
    .enter()
        .append('rect')
        .attr('width', 50)
        .attr('height', 50)
        .attr('fill', '#000')
        .attr('y', 0);

bars
    .transition()
        .duration(1000)    
        .attr('y',function(dado, index){
            return index * 100;
        } )
    .transition()
        // .delay(1000)
        .duration(1000)
        .attr('width', function(dado){
                return widthScale(dado);
            })
        .attr('fill', function(dado){
                return colorScale(dado)
            })