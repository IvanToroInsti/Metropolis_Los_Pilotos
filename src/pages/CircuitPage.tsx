import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

import { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import { puertas, tribunas, baños, bares } from "../data/points";
import { TbBackground } from "react-icons/tb";

const circuitCoords: [number, number] = [41.56919, 2.258137];


// Marcador azul para WC
const wcIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    background-color: green; 
    width: 20px; 
    height: 20px; 
    border-radius: 50%; 
    border: 2px solid white;
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Marcador rojo para bares
const barIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    background-color: red; 
    width: 20px; 
    height: 20px; 
    border-radius: 50%; 
    border: 2px solid white;
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export function CircuitPage() {

  const [mostrarWC, setMostrarWC] = useState(false);
  const [mostrarBares, setMostrarBares] = useState(false);

=======
import { puertas, tribunas } from "../data/points";

const circuitCoords: [number, number] = [41.56919, 2.258137];

export function CircuitPage() {
>>>>>>> 852a497fb5cd942312484dd75f726abfe8f9fe87
  const [coords, setCoords] = useState<[number, number]>(circuitCoords);

  const [puerta, setPuerta] = useState<string | null>(null);
  const [puertaCoords, setPuertaCoords] = useState<[number, number] | null>(
    null,
  );

  const [tribuna, setTribuna] = useState<string | null>(null);
  const [tribunaCoords, setTribunaCoords] = useState<[number, number] | null>(
    null,
  );

  const [message, setMessage] = useState<string | null>(null);

  const positionSuccess: PositionCallback = (pos) => {
    setCoords([pos.coords.latitude, pos.coords.longitude]);
  };

  const positionError: PositionErrorCallback = (err) => {
    setMessage(
      "Permita el acceso a su ubicación para conocer la ruta más próxima.",
    );

    console.error(err.message);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
  }, []);

  useEffect(() => {
    if (!puerta || !tribuna) return;

    const p = puertas.find((val) => val.id === puerta);
    const t = tribunas.find((val) => val.id === tribuna);

    if (p?.lat && p?.lng) setPuertaCoords([p.lat, p.lng]);
    if (t?.lat && t.lng) setTribunaCoords([t.lat, t.lng]);
  }, [puerta, tribuna]);

  return (
    <div className="border h-2/3">
      <MapContainer
        className="w-full h-full"
        center={coords}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ChangeView center={coords} />
        <Routing
          center={coords}
          puerta={puertaCoords}
          tribuna={tribunaCoords}
        />
<<<<<<< HEAD

        {mostrarWC &&
          baños.map((b) => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={wcIcon}>
              <Popup>{b.nom}</Popup>
            </Marker>
          ))}

        {mostrarBares &&
          bares.map((b) => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={barIcon}>
              <Popup>{b.nom}</Popup>
            </Marker>
          ))}
      </MapContainer>
      {message && <div>{message}</div>}
      <div className="panel">

        <div className="columna">
          <h3>Transporte</h3>

          <label className="transporte">
            <input type="radio" name="transporte" value="tren" />
            <img src="/tren.png" width={25} height={25} />
          </label>

          <label className="transporte">
            <input type="radio" name="transporte" value="bus" />
            <img src="/autobus.png" width={25} height={25} />
          </label>

          <label className="transporte">
            <input type="radio" name="transporte" value="coche" />
            <img src="/coche.png" width={25} height={25} />
          </label>

        </div>


        <div className="columna">
          <h3>Info</h3>

          <label className="info">
            <input
              type="checkbox"
              checked={mostrarWC}
              onChange={(e) => setMostrarWC(e.target.checked)}
            />
            <p>WC</p>
          </label>

          <label className="info">
            <input
              type="checkbox"
              checked={mostrarBares}
              onChange={(e) => setMostrarBares(e.target.checked)}
            />
            <p>Bares</p>
          </label>

        </div>

      </div>
      <div className="flex flex-col gap-2 py-2 px-1">
        <select
          id="puertas"
          className="border p-2 rounded-lg w-full"
          value={puerta ?? ""}
          onChange={(e) => {
            setPuerta(e.target.value);
          }}
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

        <select
          id="tribuna"
          className="border p-2 rounded-lg w-full"
          value={tribuna ?? ""}
          onChange={(e) => {
            setTribuna(e.target.value);
          }}
        >
          <option className="text-black">--Selecciona--</option>
          {tribunas.map((t) => (
            <option key={t.id} value={t.id} className="text-black">
              {t.nom}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return center ? (
    <Marker position={center}>
      <Popup>
        {center[0] === circuitCoords[0] && center[1] === circuitCoords[1]
          ? "Circuito de catalunya"
          : "Estas aqui"}
      </Popup>
    </Marker>
  ) : null;
}

function Routing({
  center,
  puerta,
  tribuna,
}: {
  center: [number, number];
  puerta: [number, number] | null;
  tribuna: [number, number] | null;
}) {
  const map = useMap();

  const routingRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;
    if (!center) return;
    if (!puerta || !tribuna) return;

    if (!routingRef.current) {
      routingRef.current = (L as any).Routing.control({
        waypoints: [
          L.latLng(center[0], center[1]),
          L.latLng(puerta[0], puerta[1]),
          L.latLng(tribuna[0], tribuna[1]),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        lineOptions: {
          styles: [{ color: "blue", weight: 5 }],
        },
      }).addTo(map);
    } else {
      routingRef.current.setWaypoints([
        L.latLng(center[0], center[1]),
        L.latLng(puerta[0], puerta[1]),
        L.latLng(tribuna[0], tribuna[1]),
      ]);
    }
  }, [map, center, puerta, tribuna]);

  return null;
}
