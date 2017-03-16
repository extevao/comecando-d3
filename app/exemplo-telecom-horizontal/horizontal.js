 var margin = { top: 20, right: 30, bottom: 30, left: 40 };
    var width = 650 - margin.left - margin.right;
    var height = 150 - margin.top - margin.bottom;

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
        .range([0, width])


    var y = d3.scale.ordinal()
        .domain(operadoras)
        .rangeRoundBands([0, height], .1);



    var svg = d3.select('body')
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
        .attr('x', function (d) {
            return x(d.x0);
        })
        .attr('y', function (d, i) {
            return y(d.y);
        })
        .attr('height', function (d) {
            return y.rangeBand();
        })
        .attr('width', function (d) {
            return x(d.x);
        }).attr("class", function (d, i) {
            return 'bar ' + d.legenda;
        })