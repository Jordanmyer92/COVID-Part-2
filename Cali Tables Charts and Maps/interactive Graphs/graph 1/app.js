d3.csv("combined.csv", function (data) {

    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'AAPL High',
        x: unpack(rows, 'date'),
        y: unpack(rows, 'confirmed_cases_total'),
        line: { color: '#17BECF' }
    }

    var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'AAPL Low',
        x: unpack(rows, 'date'),
        y: unpack(rows, 'deaths_total'),
        line: { color: '#7F7F7F' }
    }

    var data1 = [trace1, trace2];

    var layout = {
        title: 'Basic Time Series',
    };

    Plotly.newPlot('plot', data1, layout);
})
