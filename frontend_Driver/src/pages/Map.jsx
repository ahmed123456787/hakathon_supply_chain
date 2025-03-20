import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import packageIcon from "../assets/package-icon.jpg";
import { getOptimalRoutes } from "../api/dirverApi";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const GOOGLE_MAPS_API_KEY = "AIzaSyB35ZEH3D547OyXd0OPTC_b9kkdArspmgU"; // Remplace par ta clé API

export default function MapWithRoute() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [stops, setStops] = useState([]);
  const [routePath, setRoutePath] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    fetch("/dataexample.json")
      .then((response) => JSON.parse(response) /* 🚨 Erreur ici */)
      .then((data) => {
        console.log("Données brutes :", data); // 🛠️ Debug
=======
    // Définir une fonction asynchrone pour récupérer les données
    const fetchData = async () => {
      try {
        // Appel à l'API getOptimalRoutes
        const data = await getOptimalRoutes();
        console.log("API response:", data);
>>>>>>> a129bff5f140a6d6936dc751046f3cb792ec6159

        if (!data.routesResponse) {
          console.error("Error: `routesResponse` is missing");
          return;
        }

        // Parse the routesResponse (si nécessaire)
        const parsedRoutes = JSON.parse(data.routesResponse);

        console.log("Parsed routes:", parsedRoutes);

        if (!parsedRoutes.routes || parsedRoutes.routes.length === 0) {
          console.error("No routes found in the JSON");
          return;
        }

        // Extract the first route (or iterate through all routes if needed)
        const route = parsedRoutes.routes[0];

        // Extract stops
        const stops = route.stops.map((stop) => ({
          lat: stop.latitude,
          lng: stop.longitude,
          address: stop.address,
          distance: stop.distance,
        }));

        // Decode the polyline
        const polyline = decodePolyline(route.routePolyline);

        // Update state
        setStops(stops);
        setRoutePath(polyline);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    // Appeler la fonction asynchrone
    fetchData();
  }, []);

  function decodePolyline(encoded) {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let shift = 0,
        result = 0,
        byte;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return points;
  }

  const center = stops.length > 0 ? stops[0] : { lat: 36.7528, lng: 3.0422 };

  return (
    <div className="relative">
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
          {stops.map((stop, index) => (
            <Marker key={index} position={stop} label={`${index + 1}`} />
          ))}

          <Polyline
            path={routePath}
            options={{ strokeColor: "#FF0000", strokeWeight: 3 }}
          />
        </GoogleMap>
      ) : (
        <Skeleton className="w-full h-[500px]" />
      )}

      {stops.length > 0 && (
        <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white shadow-lg rounded-lg p-4">
          <CardContent className="flex items-center space-x-4">
            <img src={packageIcon} alt="Package" className="w-12 h-12" />
            <div className="flex-1">
              <h2 className="font-bold text-lg">Nearest Order</h2>
              <p className="text-sm text-gray-600">{stops[0].address}</p>
              <Badge>Distance : {stops[0].distance} m</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
