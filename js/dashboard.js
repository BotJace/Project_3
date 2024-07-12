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

    // Define color coding for crime categories
    var crimeColors = {
        "Violent": "red",
        "Theft": "black",
        "Other": "darkgrey"
    };

    // Initialize bar chart
    var ctx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Violent", "Theft", "Other"],
            datasets: [{
                label: 'Number of Crimes',
                data: [0, 0, 0],
                backgroundColor: ['red', 'black', 'darkgrey']
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

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

                // Initialize crime counts
                var crimeCounts = {
                    "Violent": 0,
                    "Theft": 0,
                    "Other": 0
                };

                // Group crimes by coordinates
                var crimeGroups = {};
                data.forEach(function (crime) {
                    var coordinates = `${crime.Latitude},${crime.Longitude}`;
                    if (!crimeGroups[coordinates]) {
                        crimeGroups[coordinates] = [];
                    }
                    crimeGroups[coordinates].push(crime);
                });

                // Plot the crime data on the map
                Object.keys(crimeGroups).forEach(function (coordinates) {
                    var crimes = crimeGroups[coordinates];
                    var [latitude, longitude] = coordinates.split(',').map(parseFloat);

                    // Check if latitude and longitude are valid numbers
                    if (isNaN(latitude) || isNaN(longitude)) {
                        console.error('Invalid coordinates:', coordinates);
                        return; // Skip this entry
                    }

                    // Generate popup content
                    var popupContent = crimes.map(crime => {
                        var category = crime.category || "Unidentified";
                        var description = crime.Description || "No description available";
                        return `${category}: ${description}`;
                    }).join('<br>');

                    // Add marker to the map
                    L.circleMarker([latitude, longitude], {
                        color: crimeColors[crimes[0].category] || "gray", // Use the category of the first crime for color coding
                        radius: 0.8
                    }).addTo(map).bindPopup(popupContent);

                    // Update crime counts
                    crimes.forEach(function (crime) {
                        if (crime.category in crimeCounts) {
                            crimeCounts[crime.category]++;
                        }
                    });
                });

                // Update the bar chart
                barChart.data.datasets[0].data = [
                    crimeCounts["Violent"],
                    crimeCounts["Theft"],
                    crimeCounts["Other"]
                ];
                barChart.update();

                // Adjust map view to the city's coordinates
                map.setView(cityCoordinates[city], 13);
            })
            .catch(function (error) {
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

    // Event listener for view toggle
    document.getElementById('toggle-view').addEventListener('click', function () {
        var mapContainer = document.getElementById('map');
        var chartContainer = document.getElementById('barChart');
        if (mapContainer.style.display === 'none') {
            mapContainer.style.display = 'block';
            chartContainer.style.display = 'none';
        } else {
            mapContainer.style.display = 'none';
            chartContainer.style.display = 'block';
        }
    });

    // Load data for the default city and year on page load
    loadCityData(selectedCity, selectedYear);

    // Create legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        var categories = ["Violent", "Theft", "Other"];
        var labels = [];

        // Loop through categories to generate a label with a colored square for each category
        categories.forEach(function (category) {
            div.innerHTML += '<div class="legend-item"><div class="legend-color" style="background:' + crimeColors[category] + '"></div><div class="legend-text">' + category + '</div></div>';
        });

        return div;
    };

    legend.addTo(map);
});
