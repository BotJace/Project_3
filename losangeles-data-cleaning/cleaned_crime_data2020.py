import pandas as pd

# Load the dataset
file_path = r'C:\Users\shrad\OneDrive\Desktop\LA\cleaned_crime_data.csv'
data = pd.read_csv(file_path)

# Convert the 'date' column to datetime format
data['date'] = pd.to_datetime(data['date'])

# Filter data for the year 2020
data_2020 = data[data['date'].dt.year == 2020]

# Save the filtered data to a new CSV file
output_file_path = r'C:\Users\shrad\OneDrive\Desktop\LA\crime_data_2020.csv'
data_2020.to_csv(output_file_path, index=False)

print(f"Filtered data for the year 2020 has been saved to {output_file_path}")
