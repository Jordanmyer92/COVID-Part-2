
d3.json("/static/js/graph1.js").then(data => {

    // console.log(data);

    var date = data.map(data => data.date)
    console.log(date)

    var cases = data.map(data => data.confirmed_cases)
    // console.log(cases)

    var new_cases = data.map(data => data.new_confirmed_cases)
    // console.log(new_cases)

    var trace1 = {
        x: date,
        y: cases,
        type: 'scatter',
        name: 'Cases'
    };

    var trace2 = {
        x: date,
        y: new_cases,
        type: 'scatter',
        name: 'Cases'
    };

    // var metadata = [trace2];

    // Plotly.newPlot('plot', metadata);

    var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all',
        }],
    };
    var layout = {
        title: 'Numberof new cases',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true,
            title: 'Number of Cases'
        }
    };

    var metadata = [trace2];

    Plotly.newPlot('plot', metadata, layout);
});

function prepData(rawData) {
    var x = [];
    var y = [];

    rawData.forEach(function (datum, i) {

        x.push(new Date(datum[xField]));
        y.push(datum[yField]);
    });

    return [{
        mode: 'lines',
        x: x,
        y: y
    }];
};


d3.json("/static/js/graph2.js").then(data1 => {

    var date1 = data1.map(data => data.date)
    // console.log(date1)

    var vaccinated = data1.map(data => data.new_doses_administered)
    // console.log(vaccinated)

    var doses = data1.map(data => data.doses_administred)
    // console.log(new_cases)

    var trace3 = {
        x: date1,
        y: vaccinated,
        type: 'scatter',
        name: 'Vaccinations'
    };

    var trace4 = {
        x: date1,
        y: doses,
        type: 'scatter',
        name: 'Vaccinations'
    };

    var layout1 = {
        title: 'Number of Vaccines Administered',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Number of Vaccinations' }
    };

    var data2 = [trace3];

    Plotly.newPlot('plot1', data2, layout1);

});

