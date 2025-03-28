import requests
import json
from datetime import datetime

# API keys (replace with your own)
OPENWEATHERMAP_API_KEY = "6b08bb999d3c05b8b425ac25cfbe7997"
EIA_API_KEY = "ragWNvzLl6WLpzDAVud4C4dABkcYUdA2IrLa1bwl"
MAPBOX_API_KEY = "your_mapbox_api_key"

def fetch_weather_data(lat, lon):
    """Fetch weather data from OpenWeatherMap API"""
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching weather data: {response.status_code}")
        return None

def fetch_energy_data(state_code):
    """Fetch energy consumption data from EIA API"""
    url = f"https://api.eia.gov/v2/electricity/retail-sales/data/?api_key={EIA_API_KEY}&data[]=price&data[]=sales&facets[statecode][]={state_code}&sort[0][column]=period&sort[0][direction]=desc&length=1"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching energy data: {response.status_code}")
        return None

def fetch_elevation_data(lat, lon):
    """Fetch elevation data from Mapbox Terrain-RGB API"""
    url = f"https://api.mapbox.com/v4/mapbox.terrain-rgb/{lon},{lat},13/256x256.pngraw?access_token={MAPBOX_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        # Note: This returns raw PNG data. You'd need to process this to extract elevation.
        # For demonstration, we're just returning the content length
        return len(response.content)
    else:
        print(f"Error fetching elevation data: {response.status_code}")
        return None

def fetch_earthquake_data(lat, lon, radius_km):
    """Fetch earthquake data from USGS Earthquake Hazards Program API"""
    end_time = datetime.utcnow().strftime("%Y-%m-%d")
    start_time = "2000-01-01"  # Adjust as needed
    url = f"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime={start_time}&endtime={end_time}&latitude={lat}&longitude={lon}&maxradiuskm={radius_km}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching earthquake data: {response.status_code}")
        return None

def main():
    # Example coordinates (New York City)
    lat, lon = 40.7128, -74.0060
    state_code = "NY"
    radius_km = 100

    # Fetch data from multiple APIs
    weather_data = fetch_weather_data(lat, lon)
    energy_data = fetch_energy_data(state_code)
    elevation_data = fetch_elevation_data(lat, lon)
    earthquake_data = fetch_earthquake_data(lat, lon, radius_km)

    # Print results
    print("Weather Data:")
    print(json.dumps(weather_data, indent=2))
    print("\nEnergy Data:")
    print(json.dumps(energy_data, indent=2))
    print(f"\nElevation Data (content length): {elevation_data}")
    print("\nEarthquake Data:")
    print(json.dumps(earthquake_data, indent=2))

if __name__ == "__main__":
    main()