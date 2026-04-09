import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

import { useEffect, useRef, useState } from "react";
import { puertas, tribunas, baños, bares } from "../data/points";

import * as L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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

const idiomas = [
  "Castellano",
  "Catalán",
  "Inglés",
  "Francés",
  "Alemán",
  "Italiano",
];

export function CircuitPage() {
  const [mostrarWC, setMostrarWC] = useState(false);
  const [mostrarBares, setMostrarBares] = useState(false);

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
    <div className="h-full px-2">
      <div className="py-2 flex gap-2 items-center">
        <h3 className="text-sm mb-1">Idioma</h3>
        <select
          name=""
          id=""
          className="w-full bg-black/55 p-2 text-xs rounded-lg"
        >
          {idiomas.map((i, n) => (
            <option key={n} className="text-white">
              {i}
            </option>
          ))}
        </select>
      </div>

      <MapContainer
        className="w-full h-2/3 rounded-lg"
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

        {mostrarWC &&
          baños.map((b: any) => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={wcIcon}>
              <Popup>{b.nom}</Popup>
            </Marker>
          ))}

        {mostrarBares &&
          bares.map((b: any) => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={barIcon}>
              <Popup>{b.nom}</Popup>
            </Marker>
          ))}
      </MapContainer>
      {message && <div>{message}</div>}
      <div className="flex gap-2 p-2">
        <div>
          <h3 className="text-lg font-semibold text-center">Puerta</h3>
          <select
            id="puertas"
            className="p-2 rounded-lg w-full bg-black/55 text-xs"
            value={puerta ?? ""}
            onChange={(e) => {
              setPuerta(e.target.value);
            }}
          >
            <option value="invalid" className="text-white text-xs">
              --Selecciona--
            </option>

            {puertas.map((p) => (
              <option key={p.id} value={p.id} className="text-white text-xs">
                {p.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-center">Tribuna</h3>
          <select
            id="tribuna"
            className="p-2 rounded-lg w-full bg-black/55 text-xs"
            value={tribuna ?? ""}
            onChange={(e) => {
              setTribuna(e.target.value);
            }}
          >
            <option className="text-white">--Selecciona--</option>
            {tribunas.map((t) => (
              <option key={t.id} value={t.id} className="text-white">
                {t.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="px-4 text-center flex flex-col gap-2 ">
        <h3 className="text-lg font-semibold">Transporte</h3>

        <div className="flex gap-2 w-full justify-center px-2">
          <Option value="tren" image="/tren.png" />
          <Option value="bus" image="/autobus.png" />
          <Option value="coche" image="/coche.png" />
        </div>

        <div className="px-4 text-center flex flex-col gap-2 pb-12">
          <h3 className="text-lg font-semibold">Capas de información</h3>

          <div className="flex gap-2 w-full justify-center px-2">
            <LabelInfo showWC={mostrarWC} setShowWC={setMostrarWC} title="WC" />
            <LabelInfo
              showWC={mostrarBares}
              setShowWC={setMostrarBares}
              title="Bares"
            />
          </div>
        </div>
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

const Option = ({ value, image }: { value: string; image: string }) => {
  return (
    <div className="flex items-center justify-center gap-2 w-full rounded-lg bg-black/55 transition-all  cursor-pointer">
      <input type="radio" name="transporte" value={value} />
      <img src={image} width={25} height={25} />
    </div>
  );
};

const LabelInfo = ({
  showWC,
  setShowWC,
  title,
}: {
  showWC: boolean;
  setShowWC: (e: any) => void;
  title: string;
}) => {
  return (
    <div className="w-full flex gap-2 justify-center rounded-lg bg-black/55 p-2">
      <input
        type="checkbox"
        checked={showWC}
        onChange={(e) => setShowWC(e.target.checked)}
      />
      <p>{title}</p>
    </div>
  );
};
