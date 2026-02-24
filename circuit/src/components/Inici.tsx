import { useState } from "react";

export function Inici() {
  const [background, setBackground] = useState("inici.jpg");


  return (
    <div
      id="fondo"
      className="relative h-full w-full flex flex-col justify-between py-8 bg-center bg-cover text-white"
      style={{ backgroundImage: `url('${background}')` }}
    >
      {/* Dock estilo iOS */}
      <a href="/circuit"><div
        id="circuito"
        className="absolute bottom-3 right-18 h-[35px] w-[35px]"
        style={{ backgroundColor: "transparent" }}
      >
      </div></a>
    </div>
  );
}

function DockIcon({ image }: { image: string }) {
  return (
    <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shadow-md shadow-black/30 active:scale-90 transition-transform duration-150">
      <div
        className="w-8 h-8 bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      />
    </div>
  );
}
