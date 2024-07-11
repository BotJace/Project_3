document.addEventListener('DOMContentLoaded', function () {
    // Define coordinates for each city
    var cityCoordinates = {
        "austin": [30.2672, -97.7431],
        "losangeles": [34.0522, -118.2437],
        "manhattan": [40.7831, -73.9712]
    };

    // Initialize the map with default view
    var map = L.map('map').setView(cityCoordinates["austin"], 13); // Default to Austin

    // Add a tile layer to the map (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Function to load and plot data for a specific city and year
    function loadCityData(city, year) {
        var filePath = 'data/' + city + '/' + year + '.csv';
        console.log('Loading data from:', filePath); // Debugging output

        // Fetch the CSV file using d3.csv
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(csvText => {
                var data = d3.csvParse(csvText);
                console.log('Data loaded:', data); // Debugging output

                // Clear existing markers
                map.eachLayer(function (layer) {
                    if (layer instanceof L.CircleMarker) {
                        map.removeLayer(layer);
                    }
                });

                // Plot the crime data on the map
                data.forEach(function (crime) {
                    var latitude = parseFloat(crime.Latitude);
                    var longitude = parseFloat(crime.Longitude);

                    // Check if latitude and longitude are valid numbers
                    if (isNaN(latitude) || isNaN(longitude)) {
                        console.error('Invalid coordinates:', crime);
                        return; // Skip this entry
                    }

                    var coordinates = [latitude, longitude];
                    L.circleMarker(coordinates, {
                        radius: 8
                    }).addTo(map).bindPopup(crime['Highest Offense Description']);
                });

                // Adjust map view to the city's coordinates
                map.setView(cityCoordinates[city], 13);
            })
            .catch(function (error) {
                console.error('Error loading data:', error);
                alert('Error loading data: ' + error.message); // More user-friendly alert
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
});