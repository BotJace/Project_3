document.addEventListener('DOMContentLoaded', function () {
    // Define coordinates for each city
    var cityCoordinates = {
        "austin": [30.2672, -97.7431],
        "losangeles": [34.0522, -118.2437],
        "brooklyn": [40.6782, -73.9442]
    };

    // Initialize the map with default view
    var map = L.map('map').setView(cityCoordinates["austin"], 13); // Default to Austin

    // Add a tile layer to the map (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Define color coding for crime types
    var crimeColors = {
        "Assault": "red",
        "Burglary": "blue",
        "Theft": "green"
        // Add more crime types and their colors here
    };

    // Function to load and plot data for a specific city and year
    function loadCityData(city, year) {
        var filePath = 'data/' + city + '/' + year + '.csv';
        console.log('Loading data from:', filePath); // Debugging output
        d3.csv(filePath).then(function (data) {
            console.log('Data loaded:', data); // Debugging output

            // Clear existing markers
            map.eachLayer(function (layer) {
                if (layer instanceof L.CircleMarker) {
                    map.removeLayer(layer);
                }
            });

            // Plot the crime data on the map
            data.forEach(function (crime) {
                var coordinates = [parseFloat(crime.latitude), parseFloat(crime.longitude)];
                L.circleMarker(coordinates, {
                    color: crimeColors[crime.type],
                    radius: 8
                }).addTo(map).bindPopup(crime.type);
            });

            // Adjust map view to the city's coordinates
            map.setView(cityCoordinates[city], 13);
        }).catch(function (error) {
            console.error('Error loading data:', error);
        });
    }

    // Variables to store current selections
    var selectedCity = 'austin';
    var selectedYear = '2020';

    // Event listener for city selection
    document.getElementById('city-select').addEventListener('change', function () {
        selectedCity = this.value;
        console.log('City selected:', selectedCity); // Debugging output
        loadCityData(selectedCity, selectedYear);
    });

    // Event listener for year selection
    document.getElementById('year-select').addEventListener('change', function () {
        selectedYear = this.value;
        console.log('Year selected:', selectedYear); // Debugging output
        loadCityData(selectedCity, selectedYear);
    });

    // Load data for the default city and year on page load
    loadCityData(selectedCity, selectedYear);

    // Add a legend to the map
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend');
        for (var crimeType in crimeColors) {
            div.innerHTML +=
                '<i style="background:' + crimeColors[crimeType] + '"></i> ' +
                crimeType + '<br>';
        }
        return div;
    };

    legend.addTo(map);
});
