var chartdata= data

console.log(chartdata)

var trace1= {
    x: data.est_population,
    y: data.fully_vaccinated
};

var data = [trace1];

var layout = {
  title: "'Bar' Chart"
};

Plotly.newPlot("plot", data, layout);
