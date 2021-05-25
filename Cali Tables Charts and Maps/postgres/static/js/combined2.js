
d3.json("/static/js/combined.js").then(data => {

    console.log(data);

    var date1 = data.map(data => data.date)
    // console.log(date1)

    var male = data.map(data => data.gender_male)
    // console.log(vaccinated)

    var female = data.map(data => data.gender_female)
    // console.log(new_cases)

    var vaccines = data.map(data => data.vaccine_doses_distributed)
    // console.log(new_cases)


    var trace1 = {
        x: date1,
        y: male,
        type: 'scatter',
        name: 'Male'
    };

    var trace2 = {
        x: date1,
        y: female,
        type: 'scatter',
        name: 'Female'
    };


    var layout1 = {
        title: 'Number of Cases per Gender',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Number of Cases' },
    };

    var data1 = [trace1, trace2];

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
    var layout4 = {
        title: 'Number of Cases per Gender',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true,
            title: 'Number of Cases'
        }
    };


    Plotly.newPlot('plot', data1, layout4);

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

    var age1 = data.map(data => data.age_0_to_17)
    // console.log(vaccinated)

    var age2 = data.map(data => data.age_18_to_49)
    // console.log(new_cases)
    var age3 = data.map(data => data.age_50_to_64
    )
    // console.log(vaccinated)

    var age4 = data.map(data => data.age_65_and_up
    )
    // console.log(new_cases)

    var trace3 = {
        x: date1,
        y: age1,
        type: 'scatter',
        name: '0-17'
    };

    var trace4 = {
        x: date1,
        y: age2,
        type: 'scatter',
        name: '18-49'
    };

    var trace5 = {
        x: date1,
        y: age3,
        type: 'scatter',
        name: '50-64'
    };

    var trace6 = {
        x: date1,
        y: age4,
        type: 'scatter',
        name: '65+'
    };


    var layout2 = {
        title: 'Number of Cases per Age Group',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Number of Cases' },
    };

    var data2 = [trace3, trace4, trace5, trace6];

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
    var layout3 = {
        title: 'Number of cases per Age Group',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true,
            title: 'Number of Cases'
        }
    };

    Plotly.newPlot('plot1', data2, layout3);

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


