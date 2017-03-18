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