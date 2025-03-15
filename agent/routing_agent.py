import requests
import folium
import polyline
from dotenv import load_dotenv
import os

# Load API key from .env file
load_dotenv()
MAP_API_KEY = os.getenv("MAP_API_KEY")

# Define coordinates for Constantine and Algiers
constantine = (36.365, 6.6147)
algiers = (36.7372, 3.0869)

# Routing API request (without invalid parameters)
routing_url = f"https://router.hereapi.com/v8/routes?transportMode=car&origin={constantine[0]},{constantine[1]}&destination={algiers[0]},{algiers[1]}&return=polyline,summary,travelSummary&apikey={MAP_API_KEY}"

response = requests.get(routing_url)
if response.status_code == 200:
    data = response.json()
    print("✅ API Response:", data)  # Debugging: Print the full response

    # Ensure we have the expected polyline
    try:
        route_polyline = data["routes"][0]["sections"][0]["polyline"]
    except (KeyError, IndexError):
        print("❌ No polyline found in the response. Check API parameters or response format.")
        exit(1)

    # Decode and continue processing...

if response.status_code == 200:
    data = response.json()

    # Extract polyline from response
    route_polyline = data["routes"][0]["sections"][0]["polyline"]

    # Decode the polyline into a list of (lat, lon) coordinates
    route_coords = polyline.decode(route_polyline)

    # Create a folium map centered on the midpoint of the route
    midpoint = [(constantine[0] + algiers[0]) / 2, (constantine[1] + algiers[1]) / 2]
    map_ = folium.Map(location=midpoint, zoom_start=7)

    # Add route line to the map
    folium.PolyLine(route_coords, color="blue", weight=5, opacity=0.8).add_to(map_)

    # Add markers for Constantine and Algiers
    folium.Marker(location=constantine, popup="Constantine", icon=folium.Icon(color="red")).add_to(map_)
    folium.Marker(location=algiers, popup="Algiers", icon=folium.Icon(color="green")).add_to(map_)

    # Save map to file
    map_.save("algiers_to_constantine_traffic.html")
    print("✅ Map saved as 'algiers_to_constantine_traffic.html'. Open it in a browser.")

else:
    print(f"❌ Error fetching route: {response.text}")
