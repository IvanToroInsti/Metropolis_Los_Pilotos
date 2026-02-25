import React from "react";
import { useNavigate } from "react-router-dom";

interface Frame {
  children: React.ReactNode; // Cambiado a ReactNode para mayor flexibilidad
}

// este es el componente que carga el marco del IPHONE en children va el contenido, dentro de las etiquetas
export default function MobileFrame({ children }: Frame) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Cuerpo del teléfono */}
      <div className="relative w-full max-w-[300px] h-[600px] rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
        {/* Altavoz / Notch superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-700 rounded-full"></div>
        </div>
        {/* Botones Laterales (Volumen) */}
        <div className="absolute -left-[10px] top-24 w-[2px] h-12 bg-gray-600 rounded-l-md"></div>
        <div className="absolute -left-[10px] top-40 w-[2px] h-12 bg-gray-600 rounded-l-md"></div>
        {/* Botón de Encendido */}
        <div className="absolute -right-[10px] top-32 w-[2px] h-16 bg-gray-600 rounded-r-md"></div>
        {/* Pantalla (Contenido) */}
        <div className="w-full h-full overflow-hidden border">
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
          <div className="w-1/2 mx-auto h-1 bg-gray-300 rounded-full mb-1 duration-150 group-active:-translate-y-1"></div>
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
      <div className="absolute top-0 left-0 w-full h-8 px-6 flex items-center justify-between text-[11px] font-medium text-white z-20">
        {/* Hora */}
        <span className="tracking-tight">
          {date.getHours()}:{date.getMinutes()}
        </span>

        {/* Indicadores derecha */}
        <div className="flex items-center gap-1.5">
          {/* Señal */}
          <div className="flex items-end gap-[2px]">
            <span className="w-[2px] h-[4px] bg-white rounded-sm"></span>
            <span className="w-[2px] h-[6px] bg-white rounded-sm"></span>
            <span className="w-[2px] h-[8px] bg-white rounded-sm"></span>
            <span className="w-[2px] h-[10px] bg-white rounded-sm"></span>
          </div>

          {/* Batería */}
          <div className="flex items-center gap-[2px]">
            <div className="w-5 h-3 border border-white rounded-sm relative">
              <div className="absolute inset-[1px] bg-white rounded-[2px]"></div>
            </div>
            <div className="w-[2px] h-[6px] bg-white rounded-sm"></div>
          </div>
        </div>
      </div>
    </>
  );
}
