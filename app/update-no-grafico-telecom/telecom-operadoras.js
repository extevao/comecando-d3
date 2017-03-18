function fluxoOperadorasHorizontal(data) {
    console.log('teste')

    var margin = { top: 20, right: 30, bottom: 30, left: 110 };
    var width = 500 - margin.left - margin.right;
    var height = 100 - margin.top - margin.bottom;

    var dataIntermediate = parametrosEixoX.map(function (parametro) {
        return relacaoLigacoesOperadoras.map(function (relacaoOperadora) {
            return { x: relacaoOperadora.nome, y: relacaoOperadora[parametro], legenda: parametro };
        });
    });


    var dataStackLayout = d3.layout.stack()(dataIntermediate);
    var dataset = dataStackLayout.map(function (group) {
        return group.map(function (d) {
            // Invert the x and y values, and y0 becomes x0
            return {
                x: d.y,
                y: d.x,
                x0: d.y0,
                legenda: d.legenda
            };
        });
    });

    var xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    });

    var operadoras = dataset[0].map(function (d) {
        return d.y;
    });

    var x = d3.scale.linear()
        .domain([0, xMax])
        .range([0, width]);


    var y = d3.scale.ordinal()
        .domain(operadoras)
        .rangeRoundBands([0, height], .1);

    /* criando legenda do eixo x */
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');
    /* FIM criando legenda do eixo x */

    svg = d3.select('#operadoras-horizontal')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g');

    var rects = groups.selectAll('rect')
        .data(function (d) {
            return d;
        })
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function (d, i) {
            return y(d.y);
        })
        .attr('height', function (d) {
            return y.rangeBand();
        })
        .attr('width', 0)
        .attr("class", function (d, i) {
            return 'bar ' + d.legenda;
        })
        .on('mouseover', function (d) {

            var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
            var yPos = parseFloat(d3.select(this).attr('y')) + y.rangeBand() / 2;
            d3.select('#tooltip')
                .style('left', xPos + 'px')
                .style('top', yPos + 'px')
                .select('#value')
                .text(`${d.x}`);

            d3.select('#tooltip').classed('hidden', false);
        })
        .on('mouseout', function () {
            d3.select('#tooltip').classed('hidden', true);
        });

    /* Adicionando as legendas */
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis);
    /* FIM Adicionando as legendas */

    rects.transition()
        .delay(500)
        .duration(1000)
        .attr('x', function (d) {
            return x(d.x0);
        })
        .attr('width', function (d) {
            return x(d.x);
        });
}






