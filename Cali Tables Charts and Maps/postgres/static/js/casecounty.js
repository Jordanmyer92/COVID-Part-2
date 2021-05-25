
// from data.js
var tableData = data;

// YOUR CODE HERE!
// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

// Complete the event handler function for the form
function runEnter() {
    // tableData = data;

    // Prevent the page from refreshing
    d3.event.preventDefault();

    //Deep copy 
    var filtered_data = JSON.parse(JSON.stringify(data));
    // filtered_data = data;

    // Select the input element and get the raw HTML node

    var inputcounty = d3.select("#county").property('value');


    // console.log(inputValue);

    if (inputcounty)
        filtered_data = filtered_data.filter(d => d.county.toLowerCase() == inputcounty.toLowerCase());



    var table = d3.select("table");
    table.html("<tbody></tbody>");
    var tableBody = d3.select("tbody");
    filtered_data.forEach(datedata => {
        var trow = tableBody.append("tr")
        Object.values(datedata).forEach(value => {
            trow.append("td").text(value)
        });
    });



};

