import { useEffect, useRef, useState } from "react";
import { puertas, tribunas } from "../data/points";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

export function CircuitPage() {
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const mapInstanceRef = useRef<L.Map | null>(null);
  const routingRef = useRef<any>(null);

  const isCircuit = location.pathname.includes("circuit");

  const [puertaSeleccionada, setPuertaSeleccionada] = useState("");
  const [tribunaSeleccionada, setTribunaSeleccionada] = useState("");

  useEffect(() => {
    if (!isCircuit) return;
    if (!mapRef.current) return;
    if (!puertaSeleccionada || !tribunaSeleccionada) return;

    const puerta = puertas.find((p) => p.id === puertaSeleccionada);
    const tribuna = tribunas.find((t) => t.id === tribunaSeleccionada);

    if (!puerta || !tribuna) return;

    // Crear mapa SOLO si no existe
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([0, 0], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);
    }

    const map = mapInstanceRef.current;

    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // 🔥 BORRAR RUTA ANTERIOR
      if (routingRef.current) {
        map.removeControl(routingRef.current);
      }

      // 🔥 CREAR NUEVA RUTA
      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userLat, userLng),
          L.latLng(puerta.lat, puerta.lng),
          L.latLng(tribuna.lat, tribuna.lng),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        lineOptions: {
          styles: [{ color: "blue", weight: 5 }],
        },
      }).addTo(map);

      map.setView([userLat, userLng], 14);
    });
  }, [isCircuit, puertaSeleccionada, tribunaSeleccionada]);

  return (
    <div>
      <div
        ref={mapRef}
        id="mapa"
        className="w-60 h-80 rounded-xl z-0 mt-7 mx-auto bg-black/10"
      />

      <form className="mt-4 flex flex-col gap-2 items-center">
        <label htmlFor="puerta">Puerta:</label>
        <select
          value={puertaSeleccionada}
          onChange={(e) => setPuertaSeleccionada(e.target.value)}
          id="puerta"
          className="border p-2 rounded-lg"
        >
          <option value="invalid" className="text-black">
            --Selecciona--
          </option>
          {puertas.map((p) => (
            <option key={p.id} value={p.id} className="text-black">
              {p.nom}
            </option>
          ))}
        </select>

        <label htmlFor="tribuna">Tribuna:</label>
        <select
          id="tribuna"
          value={tribunaSeleccionada}
          onChange={(e) => setTribunaSeleccionada(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option className="text-black">--Selecciona--</option>
          {tribunas.map((t) => (
            <option key={t.id} value={t.id} className="text-black">
              {t.nom}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
