import { useNavigate } from "react-router-dom";

// Esta es la primera pantalla que vemos, la de HOME
export function FirstFrame() {
  const navigate = useNavigate();
  return (
    <div
      className="h-full w-full flex flex-col justify-between py-8 bg-center bg-cover text-white"
      style={{ backgroundImage: "url('bg.jpg')" }}
    >
      {/* App principal */}
      <div className="h-full flex justify-center items-center">
        <div className="w-fit flex flex-col items-center gap-2 p-2 cursor-pointer group">
          <div
            className="w-12 h-12 rounded-xl bg-center bg-cover shadow-lg shadow-black/40 group-active:opacity-85"
            style={{ backgroundImage: "url('image.webp')" }}
            onClick={() => navigate("/app")}
          />
          <p className="text-xs text-white/80 font-medium">Circuit BCN-CAT</p>
        </div>
      </div>

      {/* Dock estilo iOS */}
      <div className="w-full px-2 sm:mb-4">
        <div className="h-20 rounded-3xl bg-white/5 backdrop-blur-xs border border-white/20 shadow-2xl flex gap-3 items-center justify-center">
          <DockIcon image="apple-store.svg" />
          <DockIcon image="camera.svg" />
          <DockIcon image="settings.svg" />
          <DockIcon image="maps.svg" />
        </div>
      </div>
    </div>
  );
}

// Este es el componente que carga los botones NO funcionan, unicamente el del circuit
function DockIcon({ image }: { image: string }) {
  return (
    <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shadow-md shadow-black/30 active:scale-90 transition-transform duration-150 cursor-pointer">
      <div
        className="w-8 h-8 bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      />
    </div>
  );
}
