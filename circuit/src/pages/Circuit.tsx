import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

export function Circuit() {
  const menuItems = [
    { title: "Home", image: "/home.png", route: "home" },
    { title: "Eventos", image: "/eventos.png", route: "eventos" },
    { title: "Entradas", image: "/entradas.png", route: "tickets" },
    { title: "Mapa", image: "/app.svg", route: "app" },
    { title: "Circuit", image: "/circuit.png", route: "circuit" },
    { title: "Cuenta", image: "/cuenta.png", route: "cuenta" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routingRef = useRef<any>(null);

  const isCircuit = location.pathname.includes("circuit");

  const [puertaSeleccionada, setPuertaSeleccionada] = useState("");
  const [tribunaSeleccionada, setTribunaSeleccionada] = useState("");

  const puertas = [
    { nom: "Puerta 1", id: "puerta1", lat: 41.57358414534825, lng: 2.2577796192549173 },
    { nom: "Puerta 2", id: "puerta2", lat: 41.574337562719805, lng: 2.263736902283102 },
    { nom: "Puerta 3", id: "puerta3", lat: 41.57045034330061, lng: 2.263384702661838 },
    { nom: "Puerta 4", id: "puerta4", lat: 41.566554165553335, lng: 2.26015166405373 },
    { nom: "Puerta 5", id: "puerta5", lat: 41.56582755148905, lng: 2.2584747083326744 },
    { nom: "Puerta 6", id: "puerta6", lat: 41.56362576279445, lng: 2.251721741815354 },
    { nom: "Puerta 7", id: "puerta7", lat: 41.56926685502898, lng: 2.2540137937396962 }
  ];

  const tribunas = [
    { nom: "Tribuna A", id: "T-A", lat: 41.564149345230845, lng: 2.254919328417029 },
    { nom: "Tribuna L", id: "T-L", lat: 41.56482134250079, lng: 2.253589903258085 },
    { nom: "Tribuna F", id: "T-F", lat: 41.56496196951934, lng: 2.257349635269684 },
    { nom: "Tribuna E", id: "T-E", lat: 41.56562542636767, lng: 2.257891884622491 },
    { nom: "Tribuna K", id: "T-K", lat: 41.566288876412436, lng: 2.2584724103923266 },
    { nom: "Tribuna J", id: "T-J", lat: 41.56731983562511, lng: 2.2593400093341534 },
    { nom: "Tribuna Principal", id: "T-Main", lat: 41.57007508192984, lng: 2.2616373930705573 },
    { nom: "Tribuna H", id: "T-H", lat: 41.57439793920392, lng: 2.263185526443056 },
    { nom: "Tribuna C", id: "T-C", lat: 41.57511447558829, lng: 2.2607226903947337 },
    { nom: "Tribuna G", id: "T-G", lat: 41.57434891148191, lng: 2.2589836661389633 },
    { nom: "Tribuna B", id: "T-B", lat: 41.572642013980705, lng: 2.258786812378574 },
    { nom: "Tribuna N", id: "T-N", lat: 41.57048086183231, lng: 2.255471509923303 },
    { nom: "Pelouse 1", id: "P-1", lat: 41.566408510405346, lng: 2.253010221944334 },
    { nom: "Pelouse 2", id: "P-2", lat: 41.56670274885349, lng: 2.2568010349709264 },
];

  useEffect(() => {
  if (!isCircuit) return;
  if (!mapRef.current) return;
  if (!puertaSeleccionada || !tribunaSeleccionada) return;

  const puerta = puertas.find(p => p.id === puertaSeleccionada);
  const tribuna = tribunas.find(t => t.id === tribunaSeleccionada);

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
    <div className="pb-18 text-white h-full bg-[#25263A]">
      <div className="h-full pt-5">
        <Outlet />

        {isCircuit && (
          <div>
            <div
              ref={mapRef}
              id="mapa"
              className="w-60 h-80 rounded-xl z-0 mt-7 mx-auto"
            />

            <form className="mt-4 flex flex-col gap-2 items-center">
              <label>Puerta:</label>
              <select
                value={puertaSeleccionada}
                onChange={(e) => setPuertaSeleccionada(e.target.value)}
                className="text-black"
              >
                <option value="">--Selecciona--</option>
                {puertas.map(p => (
                  <option key={p.id} value={p.id}>{p.nom}</option>
                ))}
              </select>

              <label>Tribuna:</label>
              <select
                value={tribunaSeleccionada}
                onChange={(e) => setTribunaSeleccionada(e.target.value)}
                className="text-black"
              >
                <option value="">--Selecciona--</option>
                {tribunas.map(t => (
                  <option key={t.id} value={t.id}>{t.nom}</option>
                ))}
              </select>
            </form>
          </div>
        )}
      </div>

      <div className="border-t w-full border-t-[#3A3B4F] min-h-12 flex justify-center">
        {menuItems.map((val) => (
          <Button
            key={val.title}
            title={val.title}
            image={val.image}
            cb={() => navigate(val.route)}
          />
        ))}
      </div>
    </div>
  );
}

function Button({
  image,
  title,
  cb,
}: {
  image?: string;
  title: string;
  cb: () => void;
}) {
  return (
    <div
      className="w-full flex flex-col justify-center items-center cursor-pointer group"
      onClick={cb}
    >
      <div className="w-full flex justify-center rounded-full group-active:bg-[#38394B] duration-150 p-1">
        <div
          className="w-4 h-4 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
      </div>
      <p className="text-[8px] text-[#9696A1]">{title}</p>
    </div>
  );
}