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

// Définition des styles de la carte
const containerStyle = {
  width: "100%",
  height: "500px",
};

const GOOGLE_MAPS_API_KEY = "AIzaSyB35ZEH3D547OyXd0OPTC_b9kkdArspmgU"; // Remplace par ta clé API

export default function MapWithRoute() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // États pour stocker les arrêts et la route
  const [stops, setStops] = useState([]);
  const [routePath, setRoutePath] = useState([]);

  useEffect(() => {
    fetch("/dataexample.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données brutes :", data); // 🛠️ Debug

        if (!data.routesResponse) {
          console.error("Erreur: `routesResponse` est manquant");
          return;
        }

        // ✅ Correction : Parser la chaîne en objet JSON
        const parsedRoutes = JSON.parse(data.routesResponse);

        console.log("Données après parsing :", parsedRoutes);

        if (!parsedRoutes.routes || parsedRoutes.routes.length === 0) {
          console.error("Aucune route trouvée dans le JSON");
          return;
        }

        // Maintenant, tu peux utiliser parsedRoutes.routes normalement
        console.log("Routes extraites :", parsedRoutes.routes);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données :", error)
      );
  }, []);

  // Décode une polyline Google Maps
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

  // Centrage de la carte sur le premier arrêt ou position par défaut
  const center = stops.length > 0 ? stops[0] : { lat: 36.7528, lng: 3.0422 };

  return (
    <div className="relative">
      {/* Affichage de la carte */}
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
          {/* Marqueurs des arrêts */}
          {stops.map((stop, index) => (
            <Marker key={index} position={stop} label={`${index + 1}`} />
          ))}

          {/* Tracé de l'itinéraire */}
          <Polyline
            path={routePath}
            options={{ strokeColor: "#FF0000", strokeWeight: 3 }}
          />
        </GoogleMap>
      ) : (
        <Skeleton className="w-full h-[500px]" />
      )}

      {/* Carte d'information sur la commande */}
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
