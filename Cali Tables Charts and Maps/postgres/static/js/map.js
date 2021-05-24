//https://covid19.ca.gov/state-dashboard/

// Creating map object
var myMap = L.map("map", {
    center: [38.57, -121.47],
    zoom: 5.8
});
console.log(myMap)

// Adding tile layer

// Adding tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "/static/resources/ca_counties.geojson";
console.log(link)

// Function that will determine the color of a county based on the county it belongs to
function chooseColor(NAMELSAD) {
    switch (NAMELSAD) {
        case "Tulare County":
            return "red";
        case "Calaveras County":
            return "orange";
        case "Merced County":
            return "red";
        case "San Luis Obispo County":
            return "orange";
        case "Sonoma County":
            return "orange";
        case "Marin County":
            return "orange";
        case "Humboldt County":
            return "orange";
        case "Mono County":
            return "yellow";
        case "Del Norte County":
            return "red";
        case "Colusa County":
            return "orange";
        case "Alameda County":
            return "orange";
        case "El Dorado County":
            return "orange";
        case "Sutter County":
            return "orange";
        case "Kings County":
            return "orange";
        case "Sierra County":
            return "yellow";
        case "Lassen County":
            return "yellow";
        case "Lake County":
            return "orange";
        case "Tehama County":
            return "red";
        case "San Francisco County":
            return "orange";
        case "Alpine County":
            return "yellow";
        case "Madera County":
            return "orange";
        case "Sacramento County":
            return "red";
        case "Santa Barbara County":
            return "orange";
        case "Plumas County":
            return "orange";
        case "Modoc County":
            return "orange";
        case "Solano County":
            return "red";
        case "Ventura County":
            return "orange";
        case "Santa Cruz County":
            return "orange";
        case "Yuba County":
            return "red";
        case "Tuolumne County":
            return "orange";
        case "Napa County":
            return "orange";
        case "Siskiyou County":
            return "orange";
        case "Placer County":
            return "red";
        case "Glenn County":
            return "orange";
        case "Trinity County":
            return "yellow";
        case "Inyo County":
            return "orange";
        case "San Benito County":
            return "orange";
        case "Monterey County":
            return "orange";
        case "San Diego County":
            return "orange";
        case "Mariposa County":
            return "orange";
        case "Nevada County":
            return "red";
        case "Mendocino County":
            return "yellow";
        case "Yolo County":
            return "orange";
        case "Imperial County":
            return "orange";
        case "Stanislaus County":
            return "red";
        case "Kern County":
            return "orange";
        case "Contra Costa County":
            return "orange";
        case "Fresno County":
            return "orange";
        case "Santa Clara County":
            return "orange";
        case "San Mateo County":
            return "yellow";
        case "Butte County":
            return "orange";
        case "San Joaquin County":
            return "red";
        case "Amador County":
            return "orange";
        case "Shasta County":
            return "red";
        case "Riverside County":
            return "orange";
        case "Los Angeles County":
            return "yellow";
        case "Orange County":
            return "orange";
        case "San Bernardino County":
            return "orange";
        default:
            return "black";
    }
}
console.log(chooseColor)
    // Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        // Style each feature (in this case a county)
        style: function(feature) {

            return {
                color: "white",
                // Call the chooseColor function to decide which color to color our county (color based on county)
                fillColor: chooseColor(feature.properties.NAMELSAD),
                fillOpacity: 0.5,
                weight: 1.5
            };
        },
        // Called on each feature

        onEachFeature: function(feature, layer) {
            // Set mouse events to change map styling
            layer.on({
                // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.9
                    });
                },
                // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%

                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.5
                    });
                },
                // When a feature (county) is clicked, it is enlarged to fit the screen

                click: function(event) {

                    myMap.fitBounds(event.target.getBounds());
                }
            });
            // Giving each feature a pop-up with information pertinent to it
            layer.bindPopup("<h1>" + feature.properties.NAMELSAD + "</h1> <hr> <h2>" + "<br>" + feature.properties.DOSESADMIN + "<br>" + "Vaccine Doses Administered" + "<hr></hr>" + "<br>" + feature.properties.CASES + "<br>" + "Total Cases" + "</h2>");

        }
    }).addTo(myMap);

    var legend = L.control({
        position: 'bottomleft'
    });
    legend.onAdd = function createLegend(legend) {
        var className = 'leaflet-legend';
        var items = [
            { label: "<h3>" + "Risk Level Based On Number Of Cases And Vaccinations." + "<br>" + "Counties Must Meet Next Tier's Requirements For Two Consecutive Weeks." + "<hr></hr></h3>" },
            { color: "black", label: "Maximum Risk (All non-essential businesses are closed)" },
            { color: "red", label: "High Risk (Most non-essential businesses are closed)" },
            { color: "orange", label: "Medium Risk (Some non-essential businesses are open with masks & distancing)" },
            { color: "yellow", label: "Low Risk (All businesses are open with masks & distancing))" }
        ];
        var list = L.DomUtil.create('div', className + '-list');

        items.forEach(function(item) {

            var div = L.DomUtil.create('div', className + '-item', list);
            var colorbox = L.DomUtil.create('div', className + '-color', div);
            colorbox.innerHTML = '&nbsp;';
            colorbox.style.backgroundColor = item.color;
            L.DomUtil.create('div', className + '-text', div).innerHTML = item['label'];
        });
        return list;
    }
    legend.addTo(myMap);
});