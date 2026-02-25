import { Outlet, useNavigate } from "react-router-dom";

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

  return (
    <div className="sm:pb-12 text-white h-full bg-[#25263A] box-border max-h-full flex flex-col">
      <div className="overflow-auto pb-12 flex-1 p-2">
        <Outlet />
      </div>

      <div className="border-t w-full border-t-[#3A3B4F] sm:min-h-10 flex justify-center py-1">
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
      <div className="w-full flex justify-center rounded-full group-active:bg-[#38394B] duration-150 px-4 py-1">
        <img src={image} alt={`${image}`} className="max-h-8" />
      </div>
      <p className="text-[8px] text-[#9696A1]">{title}</p>
    </div>
  );
}
