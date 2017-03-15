var dataArray = [4, 8, 15, 16, 23, 42];

var data = [
  {name: "Locke",    value:  4},
  {name: "Reyes",    value:  8},
  {name: "Ford",     value: 15},
  {name: "Jarrah",   value: 16},
  {name: "Shephard", value: 23},
  {name: "Kwon",     value: 42}
];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .range([0, width]);

var char = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', barHeight * data.length);

var bar = char.selectAll('g')
        .data(data)
    .enter()
    .append('g')
        .attr('transform', function(d, i){
          return  "translate(0," + i * barHeight + ")";
        });
bar.append("rect")
    .attr("width", function(d) { return x(d.value)})
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d.value) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d.value; });


