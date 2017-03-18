function atualizandoElementosJaExistentes() {
    var p = d3.select('body')
        .selectAll('p')
        .data([4, 8, 15, 16, 23, 42])
        .enter()
        .append('p')
        .text(function (d) {
            return `Eu sou o número ${d}!`;
        });


    p.style('color', 'blue')
        .text(function (d) {
            return `Eu sou o número atualizado ${d}!`;
        });
}

var data = [30];

var canvas = d3.select('body')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 500)
    .style('background', '#ccc');

var circle1 = canvas.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', 30);

var circle2 = canvas.append('circle')
    .attr('cx', 100)
    .attr('cy', 200)
    .attr('r', 30);

d3.selectAll('circle')
    .data(data)
    .exit()
    .remove();