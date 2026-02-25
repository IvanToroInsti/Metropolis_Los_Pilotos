import { Outlet, useNavigate } from "react-router-dom";
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
    <div className="pb-18 text-white h-full bg-[#25263A]">
      <div className="h-full pt-5">
        <Outlet />
         <div
        ref={mapRef}
        id="mapa"
        className="w-60 h-80 rounded-xl z-0 mt-7 mx-auto"
      />
      </div>
      <div className="border-t w-full border-t-[#3A3B4F] min-h-12 flex justify-center">
        {menuItems.map((val) => {
          return (
            <Button
              title={val.title}
              image={val.image}
              cb={() => {
                navigate(val.route);
              }}
            />
          );
        })}
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
      onClick={() => {
        if (cb) cb();
      }}
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
