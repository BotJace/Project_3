# Project 3 City Crime
-----
Analysis and Visualization of incidents in Austin, Manhattan, and L.A.

## Contributors
-----
- Jason Liao
- Adrian Rivera
- Anthony Lipscomb
- Thomas Tobolka
- Shraddha Mehta

## Overview
----
This project aims to visualize the types of crimes within Austin, Manhattan, and L.A. By retrieving data from publicly available police records the project creates interactive maps to display hotspots and incidents color-coded by type of crime. 

## Features
----
- Visualizations of city map with the selection of year and location.
- Bar chart displaying the total number of incidents by type.

## Data Sources
----
- Police department data: Available to the public

# Getting started
----

## Data Cleaning Process:
-----
### Loading and Understanding Data:

The data is loaded from a CSV file and the initial structure is examined. Columns are identified and the 'Date Rptd' column is converted to a datetime format. Date and time are extracted from the 'Date Rptd' column. Only essential columns (date, time, location, latitude, longitude) are retained. Categorizing Crimes:

Crime descriptions are mapped to broader categories such as Violent, Theft, and Misdemeanor. A new column, 'category', is added based on these classifications.

### Saving Cleaned Data:

The cleaned data is saved to a new CSV file for further use.

### Filtering Data by Year:

Data for specific years (2020, 2021, 2022, 2023, and 2024) is filtered and saved into separate CSV files.

### Technologies Used for Data Cleaning:

Python
Python is the primary programming language used for scripting the data cleaning process.

Pandas
Pandas is a powerful data manipulation and analysis library in Python. It provides data structures like DataFrames and functions needed to clean, transform, and analyze the data.

#### Functions used:

read_csv(): To read the CSV file into a DataFrame.

to_datetime(): To convert date strings to datetime objects.

copy(): To create a copy of the DataFrame.

map(): To map classifications to a new column.

to_csv(): To save the cleaned DataFrame back to a CSV file.

### Datetime
The datetime module is used in conjunction with Pandas for handling date and time data.

#### Functions used:

dt.date: To extract the date from a datetime object.

dt.time: To extract the time from a datetime object.

dt.year: To filter data by year.

## Interacting with the map
---- 
#### Start page
- Dropdown menu for city selection
- Dropdown menu for year selection
- Button for graph view
- Clicking on data points provide a more detailed description of the specific crime(s) at that point
#### Selecting City
- By slecting cities in the dropdown menu, the map and bar graph will update to the city selected

#### Selecting Year
- By seleting year in the dropdown menu, the map and bar graph will update to year selected
Note: Manhattan does not have data for 2024

## Tools Used in This Project:
---- 
#### Data Processing and Analysis
- D3.js: For data visualization and manipulation.
- Leaflet.js: For creating interactive maps.

#### Web Development
- HTML5: For structuring the content.
- CSS: For styling and layout.
- JavaScript: For interactivity and dynamic content.
#### Libraries and Frameworks
- Leaflet: For data visualization
- Chart: For displaying graph

#### Development Tools
- VS Code: Editing and Development
- Github: Repository collaboration

## References
----
- Austin Dataset: https://data.austintexas.gov/Public-Safety/Crime-Reports/fdj4-gpfu/data_preview 
- Manhattan Dataset: Borough and Precinct Crime Stats - NYPD (nyc.gov)
- L.A. Dataset: https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8/data_preview 
- This project also used Chat-GPT 4o for debugging help. 

