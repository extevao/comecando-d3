var dataArray = [30, 15, 50];


var canvas = d3
  .select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);

var bars = canvas.selectAll('rect')
  .data(dataArray)
  .enter()
  .append('rect')
  .attr('width', function(dado ){
    return dado * 10 ;
  })
  .attr('height', 50)
  .attr('y', function(dado, index){
    return index * 100;
  });

console.log(bars);

