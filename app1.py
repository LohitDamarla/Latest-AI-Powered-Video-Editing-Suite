import os
import requests 
from flask import Flask, jsonify

# Initialize Flask app
app = Flask(__name__)

# Environment variables for API keys (Set these in your system or use a .env file)
NASA_POWER_API_URL = "https://power.larc.nasa.gov/api/temporal/daily/point?start=20241217&end=20241218&latitude=28.6139&longitude=77.2090&community=re&parameters=ALLSKY_SFC_SW_DWN%2CT2M%2CWS10M&format=json&user=noone&header=true&time-standard=lst"
NIWE_API_URL = "https://niwe.res.in/"
IMD_API_URL = "https://mausam.imd.gov.in/"
BHUWAN_API_URL = "https://bhuvan.nrsc.gov.in/"
OSM_API_URL = "https://www.openstreetmap.org/"
PROTECTED_PLANET_API_URL = "https://www.protectedplanet.net/"
COPERNICUS_API_URL = "https://land.copernicus.eu/"
CEA_API_URL = "https://cea.nic.in/"
VIIRS_API_URL = "https://earthdata.nasa.gov/"
MAPMYINDIA_API_URL = "https://www.mapmyindia.com/api/"
BHUWAN_WEB_API_URL = "https://bhuvan.nrsc.gov.in/bhuvanweb/"

@app.route('/climate-data', methods=['GET'])
def get_climate_data():
    """Fetch solar radiation, wind speed, and temperature data from NASA POWER API"""
    location = request.args.get('location', '28.6139,77.2090')  # Default to New Delhi coordinates
    params = {
        'latitude': location.split(',')[0],
        'longitude': location.split(',')[1],
        'parameters': 'ALLSKY_SFC_SW_DWN,T2M,WS10M',  # Example parameters for solar, temp, wind
        'format': 'json'
    }
    response = requests.get(NASA_POWER_API_URL + 'temporal/daily/point', params=params)
    return response.json()


@app.route('/wind-resource', methods=['GET'])
def get_wind_resource_data():
    """Fetch wind speed data from NIWE API"""
    location = request.args.get('location', '28.6139,77.2090')  # Default to New Delhi coordinates
    response = requests.get(f"{NIWE_API_URL}/api/wind/{location}")
    return response.json()


@app.route('/weather', methods=['GET'])
def get_weather_data():
    """Fetch weather data (rainfall, temperature) from IMD API"""
    location = request.args.get('location', 'Delhi')  # Default to Delhi city
    response = requests.get(f"{IMD_API_URL}/api/weather/{location}")
    return response.json()


@app.route('/land-use', methods=['GET'])
def get_land_use_data():
    """Fetch land use data from Bhuvan API"""
    response = requests.get(f"{BHUWAN_API_URL}/api/land-use")
    return response.json()


@app.route('/infrastructure', methods=['GET'])
def get_infrastructure_data():
    """Fetch road, transmission line data from OpenStreetMap API"""
    response = requests.get(f"{OSM_API_URL}/api/infrastructure")
    return response.json()


@app.route('/protected-areas', methods=['GET'])
def get_protected_areas():
    """Fetch protected areas data from Protected Planet API"""
    response = requests.get(f"{PROTECTED_PLANET_API_URL}/api/protected-areas")
    return response.json()


@app.route('/environmental-sensitivity', methods=['GET'])
def get_environmental_sensitivity_data():
    """Fetch environmental sensitivity data from Copernicus API"""
    response = requests.get(f"{COPERNICUS_API_URL}/api/environmental-sensitivity")
    return response.json()


@app.route('/energy-demand', methods=['GET'])
def get_energy_demand_data():
    """Fetch energy demand data from CEA API"""
    response = requests.get(f"{CEA_API_URL}/api/energy-demand")
    return response.json()


@app.route('/nighttime-lights', methods=['GET'])
def get_nighttime_lights_data():
    """Fetch nighttime lights data from NASA VIIRS API"""
    location = request.args.get('location', '28.6139,77.2090')  # Default to New Delhi coordinates
    response = requests.get(f"{VIIRS_API_URL}/api/viirs-nighttime-lights?location={location}")
    return response.json()


@app.route('/map-visualization', methods=['GET'])
def get_map_visualization():
    """Fetch map visualization layers from MapMyIndia API"""
    response = requests.get(f"{MAPMYINDIA_API_URL}/api/map-visualization")
    return response.json()


@app.route('/bhuvan-map', methods=['GET'])
def get_bhuvan_map_data():
    """Fetch spatial mapping data from Bhuvan Web API"""
    response = requests.get(f"{BHUWAN_WEB_API_URL}/api/bhuvan-map")
    return response.json()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Run the server on port 5000