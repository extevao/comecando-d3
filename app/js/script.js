var dataArray = [30, 15, 50, 70, 80];

var width = 500;
var height = 500;


var canvas = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var widthScale = d3.scaleLinear()
  .domain([0, 80])
  .range([0, width]);

var colorScale = d3.scaleLinear()
  .domain([0, 80])
  .range(['red', 'blue']);

var bars = canvas.selectAll('rect')
  .data(dataArray)
  .enter()
  .append('rect')
  .attr('width', function (dado) {
    return widthScale(dado);
  })
  .attr('height', 50)
  .attr('fill', function(dado){
    return colorScale(dado);
  })
  .attr('y', function (dado, index) {
    return index * 100;
  });

console.log(bars);

