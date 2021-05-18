// Store our API endpoint inside queryUrl
var queryUrl = "https://oshpd-chhsagency.opendata.arcgis.com/datasets/e3e28181b1e744b8a39f29f664bcf2e5_0.geojson?outSR=%7B%22latestWkid%22%3A4326%2C%22wkid%22%3A4326%7D";
console.log(queryUrl)
// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});
// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(Testingsitedata) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        //console.log(feature)
        layer.on({
            // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
            mouseover: function (event) {
                layer = event.target;
                layer.setStyle({
                    fillOpacity: 0.9
                });
            },
            // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
            mouseout: function (event) {
                layer = event.target;
                layer.setStyle({
                    fillOpacity: 0.5
                });
            },

        });

        layer.bindPopup("<h3>" + (feature.properties.MuaDgnTypD) +
            "<h3>" + `Service Area Name: ${feature.properties.MuaSvcArNM}` +
            "<h3>" + `Date Designated:${feature.properties.MuaDgnDtT}` +
            "<h3>" + `Score: ${feature.properties.MuaSCORE}`);
    }

    function mapstyle(feature, layer) {
        //Style Map
        var mapstyle = {
            color: 'white',
            fillOpacity: 0.5,
            weight: 1.5
        };

        if (feature.properties.MuaSCORE >= 60 && feature.properties.MuaSCORE < 62) {
            mapstyle.color = 'LawnGreen';
        } else if (feature.properties.MuaSCORE >= 55 && feature.properties.MuaSCORE < 60) {
            mapstyle.color = "DarkSeaGreen";
        } else if (feature.properties.MuaSCORE >= 50 && feature.properties.MuaSCORE < 55) {
            mapstyle.color = 'Gold';
        } else if (feature.properties.MuaSCORE >= 45 && feature.properties.MuaSCORE < 50) {
            mapstyle.color = "Orange";
        } else if (feature.properties.MuaSCORE >= 40 && feature.properties.MuaSCORE < 45) {
            mapstyle.color = "OrangeRed";
        } else if (feature.properties.MuaSCORE <= 40) {
            mapstyle.color = "DarkRed";
        }


        return mapstyle
    }

    // function pointFunction(feature, layer) {
    //     console.log(feature)
    //     return L.circleMarker(layer, { radius: feature.properties.address});
    // }
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var TestSites = L.geoJSON(Testingsitedata, {
        onEachFeature: onEachFeature, //add popups
        // pointToLayer: pointFunction // add circles
        style: mapstyle // add styles

    });
    // Sending our earthquakes layer to the createMap function
    createMap(TestSites);
}
function createMap(TestSites) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-streets-v10",
        accessToken: API_KEY
    });


    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap,
        "Satelite": satellite
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        TestSites: TestSites
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            36.778259, -119.417931
        ],
        zoom: 6,
        layers: [streetmap, TestSites]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({
        position: 'bottomright'
    });
    legend.onAdd = function createLegend(legend) {
        var className = 'leaflet-legend';
        var items = [
            { color: 'LawnGreen', label: '60 - 62' },
            { color: 'DarkSeaGreen', label: '55 - 60' },
            { color: 'Gold', label: '50 - 55' },
            { color: 'Orange', label: '45 - 50' },
            { color: 'OrangeRed', label: '40 - 45' },
            { color: 'DarkRed', label: '< 40' }
        ];
        var list = L.DomUtil.create('div', className + '-list');
        items.forEach(function (item) {
            var div = L.DomUtil.create('div', className + '-item', list);
            var colorbox = L.DomUtil.create('div', className + '-color', div);
            colorbox.innerHTML = '&nbsp;';
            colorbox.style.backgroundColor = item.color;
            L.DomUtil.create('div', className + '-text', div).innerHTML = item['label'];
        });
        return list;
    }
    legend.addTo(myMap);
}




