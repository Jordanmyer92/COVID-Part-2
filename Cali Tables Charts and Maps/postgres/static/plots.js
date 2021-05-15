d3.json("/api").then(data => {
    console.log('this is data loaded from the api. ');
    console.log(data);
    data.forEach(element => {
        console.log(element)
    });

    var trace1 = {
        x: data.Age_Group,
        y: data.Cases.map(val => Math.sqrt(val)),
        type: "bar",
        name: "Number of Cases",
    };

    // Create the data array for the plot
    var chart = [trace1];

    // Define the plot layout
    var layout = {
        title: "NUmber of Positive Cases in California by Age Group",
        xaxis: { title: "Age Group" },
        yaxis: { title: "Number of Cases" }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", chart, layout);
});
