import React from "react";
import { useNavigate } from "react-router-dom";

interface Frame {
  children: React.ReactNode; // Cambiado a ReactNode para mayor flexibilidad
}

// este es el componente que carga el marco del IPHONE en children va el contenido, dentro de las etiquetas
export default function MobileFrame({ children }: Frame) {
  const navigate = useNavigate();
  return (
    <div className="fixed w-full sm:relative flex sm:items-center justify-center sm:min-h-screen bg-gray-100 sm:p-4">
      {/* Cuerpo del teléfono */}
      <div className="relative w-full sm:max-w-75 h-screen md:h-150 max-h-162.5 sm:rounded-[3rem] sm:border-8 sm:border-gray-800 shadow-2xl overflow-hidden">
        {/* Altavoz / Notch superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20 hidden sm:block">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-700 rounded-full"></div>
        </div>

        {/* Pantalla (Contenido) */}
        <div className="w-full h-full overflow-hidden sm:border">
          {/* Esta es la barra de notificaciones, su componente está más abajo */}
          <NotiBar />
          {children}
        </div>
        {/* Barra de inicio inferior (iOS style) */}
        <div
          className="absolute bottom-1 w-full group cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="hidden sm:visible w-1/2 mx-auto h-1 bg-gray-300 rounded-full mb-1 duration-150 group-active:-translate-y-1"></div>
        </div>
      </div>
    </div>
  );
}

// Este es el componente de la barra de notificaciones
function NotiBar() {
  const date = new Date();
  return (
    <>
      {/* Status Bar iOS */}
      <div className="hidden sm:visible top-0 left-0 w-full h-8 px-6 sm:flex items-center justify-between text-[11px] font-medium text-white z-20 bg-[#25263A]">
        {/* Hora */}
        <span className="tracking-tight">
          {date.getHours()}:{date.getMinutes()}
        </span>

        {/* Indicadores derecha */}
        <div className="flex items-center gap-1.5">
          {/* Señal */}
          <div className="flex items-end gap-0.5">
            <span className="w-0.5 h-1 bg-white rounded-sm"></span>
            <span className="w-0.5 h-1.5 bg-white rounded-sm"></span>
            <span className="w-0.5 h-2 bg-white rounded-sm"></span>
            <span className="w-0.5 h-2.5 bg-white rounded-sm"></span>
          </div>

          {/* Batería */}
          <div className="flex items-center gap-0.5">
            <div className="w-5 h-3 border border-white rounded-sm relative">
              <div className="absolute inset-px bg-white rounded-xs"></div>
            </div>
            <div className="w-0.5 h-1.5 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>
    </>
  );
}
