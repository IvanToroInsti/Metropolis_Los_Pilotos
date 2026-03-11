import React from "react";

export function Home() {
  return (
    <div className="px-2">
      {/* MAIN CARD / HERO */}
      <div className="relative w-full bg-[#1a1d26] overflow-hidden flex flex-col justify-end p-6 rounded-lg">
        {/* Imagen de fondo simulada */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.circuitcat.com/wp-content/uploads/2025/06/2506012321_piastri_norris-scaled.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-transparent to-transparent" />

        {/* Placeholder: Badge Fecha (Arriba del título) */}
        <div className="relative z-10 flex mb-6">
          <div className="h-7 w-24 bg-white -skew-x-[18deg] flex items-center justify-center">
            <div className="h-2 w-14 bg-red-500/20 rounded-full skew-x-[18deg]" />
          </div>
          <div className="h-7 w-28 bg-[#2a2d3a] -skew-x-[18deg] -ml-2 flex items-center justify-center border-l border-black/20">
            <div className="h-2 w-16 bg-white/20 rounded-full skew-x-[18deg]" />
          </div>
        </div>

        {/* Placeholder: Título (Líneas gruesas inclinadas) */}
        <div className="relative z-10 flex flex-col gap-3 mb-10 italic">
          <div className="h-7 w-[85%] bg-white/90 -skew-x-[12deg]" />
          <div className="h-7 w-[70%] bg-white/90 -skew-x-[12deg]" />
          <div className="h-7 w-[90%] bg-white/90 -skew-x-[12deg]" />
        </div>

        {/* Botones de Acción */}
        <div className="relative z-10 flex flex-col gap-3 w-full">
          <button className="bg-[#4D5681] h-14 w-full -skew-x-[15deg] flex items-center justify-center shadow-lg">
            <div className="h-3 w-28 bg-white/20 rounded-full skew-x-[15deg]" />
          </button>
          <button className="bg-[#E61415] h-14 w-full -skew-x-[15deg] flex items-center justify-center shadow-lg">
            <div className="h-3 w-40 bg-white/30 rounded-full skew-x-[15deg]" />
          </button>
        </div>
      </div>

      {/* SECCIÓN LISTADO */}
      <div className="p-1 flex flex-col gap-2 mb-24 pt-2">
        <div className="flex justify-between items-center mb-2">
          <div className="h-5 w-32 bg-white/10 rounded-md italic" />
          <div className="h-4 w-16 bg-red-600/20 rounded-md" />
        </div>

        <EventPlaceholder />
        <EventPlaceholder />
        <EventPlaceholder />
      </div>
    </div>
  );
}

const EventPlaceholder = () => (
  <div className="w-full h-24 bg-[#161922] rounded-xl p-3 flex gap-4 items-center">
    <div className="w-20 h-full bg-black/40 rounded-lg shrink-0" />
    <div className="flex flex-col gap-3 w-full">
      <div className="h-3 w-3/4 bg-white/10 rounded-full" />
      <div className="h-3 w-1/2 bg-white/5 rounded-full" />
    </div>
  </div>
);
