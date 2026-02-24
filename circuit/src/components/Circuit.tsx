import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

export function Circuit() {
  const [background] = useState("inici.jpg");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Crear mapa
    const map = L.map(mapRef.current).setView([0, 0], 13);
    mapInstanceRef.current = map;

    // Capa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Obtener ubicación del usuario
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // 👉 DESTINO (CAMBIA ESTO POR LA UBICACIÓN QUE QUIERAS)
      const destination = L.latLng(41.57032654170345, 2.257613551839339); 

      // Crear ruta
      L.Routing.control({
  waypoints: [
    L.latLng(userLat, userLng),
    destination,
  ],
  routeWhileDragging: false,
  addWaypoints: false,
  draggableWaypoints: false,
  show: false, // 👈 OCULTA EL PANEL
  lineOptions: {
    styles: [{ color: "blue", weight: 5 }],
  },
}).addTo(map);

  
      map.setView([userLat, userLng], 13);
    });
  }, []);



  return (
    <div
      id="fondo"
      className="relative h-full w-full flex flex-col justify-between py-8 bg-center bg-cover text-white"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div
        ref={mapRef}
        id="mapa"
        className="w-60 h-80 rounded-xl z-0 mt-7 mx-auto"

      />
    </div>
  );
}