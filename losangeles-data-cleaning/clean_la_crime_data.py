import pandas as pd

# Specify the path to your CSV file
file_path = r'C:\Users\shrad\OneDrive\Desktop\LA\crime_data.csv'

try:
    # Load the CSV file
    df = pd.read_csv(file_path)

    # Display the first few rows of the DataFrame to understand its structure
    print("Initial DataFrame:")
    print(df.head())

    # Print column names for verification
    print("Column names in the DataFrame:")
    print(df.columns)

    # Convert the 'Date Rptd' column to datetime format, handle errors gracefully
    df['Date Rptd'] = pd.to_datetime(df['Date Rptd'], format='%m/%d/%Y %I:%M:%S %p', errors='coerce')

    # Extract date and time from the 'Date Rptd' column
    df['date'] = df['Date Rptd'].dt.date
    df['time'] = df['Date Rptd'].dt.time

    # Keep only necessary columns: date, time, address, latitude, longitude
    df_simplified = df[['date', 'time', 'LOCATION', 'LAT', 'LON']].copy()

    # Example classification mapping for 'Crm Cd Desc' column
    classification = {
        'ASSAULT': 'Violent',
        'BURGLARY': 'Theft',
        'ROBBERY': 'Violent',
        'THEFT': 'Theft',
        'VANDALISM': 'Misdemeanor',
        # Add more classifications as needed
    }

    # Create a new column 'category' based on the description
    if 'Crm Cd Desc' in df.columns:
        df['category'] = df['Crm Cd Desc'].map(classification).fillna('Other')
        df_simplified['category'] = df['category']
    else:
        print("Column 'Crm Cd Desc' not found. Skipping classification.")

    # Save the cleaned data to a new CSV file
    cleaned_file_path = r'C:\Users\shrad\OneDrive\Desktop\LA\cleaned_crime_data.csv'
    df_simplified.to_csv(cleaned_file_path, index=False)

    print(f"Cleaned data saved to {cleaned_file_path}")

except FileNotFoundError as e:
    print(f"Error: {e}")
except KeyError as e:
    print(f"Column error: {e}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
