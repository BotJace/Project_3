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

Technologies Used for Data Cleaning

1. Python

Python is the primary programming language used for scripting the data cleaning process.

2. Pandas

Pandas is a powerful data manipulation and analysis library in Python. It provides data structures like DataFrames and functions needed to clean, transform, and analyze the data.

Functions used:

read_csv(): To read the CSV file into a DataFrame.

to_datetime(): To convert date strings to datetime objects.

copy(): To create a copy of the DataFrame.

map(): To map classifications to a new column.

to_csv(): To save the cleaned DataFrame back to a CSV file.

3. Datetime

The datetime module is used in conjunction with Pandas for handling date and time data.

Functions used:

dt.date: To extract the date from a datetime object.

dt.time: To extract the time from a datetime object.

dt.year: To filter data by year.

4. Error Handling

Error handling is implemented to gracefully manage potential issues like missing files or incorrect column names using try-except blocks.
