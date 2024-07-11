Los Angeles Crime Data Summary

Overview:

The Los Angeles crime data set provides detailed information about various crime incidents reported in the city. This data spans multiple years and includes crucial details such as the date, time, location, and nature of the crime. For this project, the data has been cleaned and filtered to focus on key columns such as date, time, location, latitude, longitude, and crime category. The categories include classifications like Violent, Theft, Misdemeanor, and others.

Data Cleaning Process:

Loading and Understanding Data:

The data is loaded from a CSV file and the initial structure is examined.
Columns are identified and the 'Date Rptd' column is converted to a datetime format.
Date and time are extracted from the 'Date Rptd' column.
Only essential columns (date, time, location, latitude, longitude) are retained.
Categorizing Crimes:

Crime descriptions are mapped to broader categories such as Violent, Theft, and Misdemeanor.
A new column, 'category', is added based on these classifications.
Saving Cleaned Data:

The cleaned data is saved to a new CSV file for further use.

Filtering Data by Year:

Data for specific years (2020, 2021, 2022, 2023, and 2024) is filtered and saved into separate CSV files.
