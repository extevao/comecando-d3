var canvas = d3.select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

var circle = canvas.append('circle')
    .attr('cx', 100)
    .attr('cy', 150)
    .attr('r', 50)
    .attr('fill', 'red');

var rect = canvas.append('rect')
    .attr('width', 100)
    .attr('height', 50)
    .attr('fill', '#999');

var line = canvas.append('line')
    .attr('x1', 0)
    .attr('y1', 100)
    .attr('x2', 300)
    .attr('y2', 200)
    .attr('stroke', 'blue')
    .attr('stroke-width', 5);