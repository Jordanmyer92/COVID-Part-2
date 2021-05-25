// URL to COVID json data (all states data as of 05/21/2021, this include cases,deaths, and vaccinations)
var queryUrl = "https://alshamsi1996.github.io/final_data.geojson";

// GET request, and function to handle returned JSON data
d3.json(queryUrl, function(data) {
    createCovidStatistics(data.features);
    // console.log(createCovidStatistics);
});


// function "createCovidStatistics" to pull, arrange, use the data.
function createCovidStatistics(CovidData) {

  console.log(CovidData);

  var CovidMarkers = [];
  var CovidData = [];


    for (var i = 0; i < CovidData.length ; i++) {

      var cases = CovidData[i].properties.cases
      // var deaths = CovidData[i].properties.deaths
      // var total_vaccination = CovidData[i].properties.total_vaccinations
      // var total_vaccinations_per_hundred = CovidData[i].properties.total_vaccinations_per_hundred
      var lat = CovidData[i].geometry.coordinates[1]
      var lng = CovidData[i].geometry.coordinates[0]
      var latlngs = [lat,lng]

      var color = "";
        if (cases < 100000){color = "DarkOrange"}
        else if (cases < 300000) {color = "Tomato"}
        else if (cases < 500000) {color = "DarkSalmon"}
        else if (cases < 700000) {color = "Blue"}
        else if (cases < 900000) {color = "Red"}
        else {cases = "DarkRed"}

      CovidMarkers.push(L.polygon(latlngs, {
          stroke: false,
          fillOpacity: .8,
          color: "white",
          fillColor: color,
        }).bindPopup("<h3>" + CovidData[i].properties.NAME +
        "</h3><hr><p>" + CovidData[i].properties.cases + "</h3><hr><p>" + CovidData[i].properties.deaths + CovidData[i].properties.total_vaccinations + "</p>")
    )
  }

  var CovidCases = L.layerGroup(CovidMarkers)

    // CovidStatistics layer to the createMap function
  createMap(CovidCases);

}


// function to define maping layers (street map and dark map)
function createMap(CovidCases) {

    var streetsmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
    
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/dark-v10",
      accessToken: API_KEY
  });
    
    // to define the base map object to hold layer (satellite map as base layer)
    var baseMaps = {
        "Streets Map": streetsmap,
        "Dark Map": darkmap
    };
    
    // to define the overlay object 
    var overlayMaps = {
        "COVID Cases": CovidCases
    };

    // to create map with the create layers.

    var myMap = L.map("map", {
    center: [38.2700, -100.8603], // center of the US.
    zoom: 4,
    layers: [streetsmap, CovidCases]
    });

    // to create layer control and added to myMap
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
    
      function legendColor(cases){
        if (cases < 100000){return "DarkOrange"}
        else if (cases < 300000) {return "Tomato"}
        else if (cases < 500000) {return "DarkSalmon"}
        else if (cases < 700000) {return "Blue"}
        else if (cases < 900000) {return "Red"}
        else {return "DarkRed"}
    }  

    // to create legend in myMap 

    var legend = L.control({
        position: "bottomleft",
        fillColor: "White"
    });

    // to create legend and added to myMap
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        var depth = [9, 29, 49, 69, 89, 500];
        var labels = ["<100000", "100000-300000", "300000-500000", "500000-700000", "700000-900000", "900000+"];
        div.innerHTML = '<div>Cases</div>';
        for (var i = 0; i < depth.length; i++){
          div.innerHTML += '<i style="background:' + legendColor(depth[i]) + '">&nbsp;&nbsp;&nbsp;&nbsp;</i>&nbsp;'+
                          labels[i] + '<br>';
        }
        return div;
    };
      
    legend.addTo(myMap);
}