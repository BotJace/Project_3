<<<<<<< HEAD
# Comparative Crime Data Dashboard for Manhattan, Austin & Los Angeles

**Objective**

The project aims to create a comprehensive dashboard that allows users to compare crime data across different cities (Austin, Los Angeles, Manhattan) and different years. This comparison is especially useful for travelers and residents to understand crime trends and make informed decisions.

**Data Cleaning and Preparation**

Austin Crime DAta:

Initial Loading: 

Read the raw dataset from Crime_Reports.csv.

Column Selection: 

Keep only relevant columns (Highest Offense Description, Family Violence, Occurred Date, Latitude, Longitude).

Filtering: 

Remove records indicating family violence.

Year Extraction: 

Extract the year from the Occurred Date and split data into separate DataFrames for each year (2020-2024).

Save Processed Data: 

Save the cleaned data into separate CSV files for each year.

Offense Description: 

Extract unique offense descriptions and save them to a text file.

Los Angeles Crime Data:

Initial Loading: 

Read the raw dataset from crime_data.csv.

Column Conversion and Extraction: 

Convert date columns to datetime format and extract necessary columns (date, time, LOCATION, LAT, LON).

Classification: 

Map offense descriptions to categories (e.g., Violent, Theft, Misdemeanor).

Save Processed Data: 

Save the cleaned data to a new CSV file and further filter data by year (2020-2024).

Manhattan Crime Data:

Initial Loading: 

Load the datasets for Manhattan North and South for the years 2020-2023.

Cleaning: 

Follow similar steps as for Austin and Los Angeles, ensuring consistency across all datasets.

**Data Visualization**

HTML Structure: 

Create an HTML file (index.html) with dropdowns for city and year selection, a map container, and a canvas for a bar chart.

JavaScript and D3 Integration: 

Use Leaflet for map visualization and D3 for data fetching and parsing. Chart.js is used for bar chart visualization.

Interactivity: 

Implement event listeners to update the map and bar chart based on selected city and year. Add a toggle button to switch between map view and bar chart view.

Crime Categorization: 

Use color coding for different crime categories (e.g., red for Violent, black for Theft) and a legend for easy interpretation.

Implementation Details

City Coordinates: 

Predefined coordinates for Austin, Los Angeles, and Manhattan.

Data Loading: 

Fetch CSV data dynamically based on user selection.

Map and Bar Chart Updates: 

Clear existing markers on the map and update bar chart data based on the loaded dataset.

Legend Creation: 

Add a legend to the map to indicate color coding for crime categories.

**Final Product**

The final product is a user-friendly dashboard that allows users to visually compare crime data across different cities and years. The map view shows crime locations with color-coded markers, while the bar chart provides a summary of crime categories. This tool helps in understanding crime trends and making informed decisions regarding safety.
=======
Running on local server:
1. Install local http-server
- npm install -g http-server
2.  Cd to project
- cd path/to/your/project_root
http-server -p 8080
3. Open browser and nav to
- http://localhost:8080
>>>>>>> backend-branch
