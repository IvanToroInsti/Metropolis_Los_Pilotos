export function Events() {
  return (
    <div className="min-h-screen text-white font-sans flex flex-col pb-10">
      {/* SECCIÓN HERO (F1 EVENT) */}
      <div className="relative w-full h-[550px] flex flex-col items-center justify-start pt-12 px-6 bg-[url('https://www.circuitcat.com/wp-content/uploads/2025/06/2506012321_piastri_norris-scaled.jpg')] bg-cover bg-center mb-1">
        {/* Overlay para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0b0d14]" />

        {/* Placeholder: Título Superior "EVENTOS" */}
        <div className="relative z-10 w-32 h-6 bg-white/20 -skew-x-[15deg] mb-8" />

        {/* Divisor de Fechas Estilo Racing (12 jun - 14 jun) */}
        <div className="relative z-10 flex items-center justify-center w-full mb-10">
          <div className="h-px bg-white/30 flex-1" />
          <div className="flex items-center px-4 gap-4">
            {/* Decoración líneas diagonales */}
            <div className="flex gap-1 -skew-x-[20deg]">
              <div className="w-1 h-6 bg-white/40" />
              <div className="w-1 h-6 bg-white/40" />
            </div>
            {/* Fecha Placeholder */}
            <div className="flex gap-6 italic font-black">
              <div className="h-8 w-16 bg-white rounded-sm" />
              <div className="h-8 w-16 bg-white/80 rounded-sm" />
            </div>
            <div className="flex gap-1 -skew-x-[20deg]">
              <div className="w-1 h-6 bg-white/40" />
              <div className="w-1 h-6 bg-white/40" />
            </div>
          </div>
          <div className="h-px bg-white/30 flex-1" />
        </div>

        {/* Placeholder: Bloque de Texto Título Principal */}
        <div className="relative z-10 flex flex-col items-center gap-3 mb-12 w-full">
          <div className="h-8 w-[80%] bg-white -skew-x-[12deg]" />
          <div className="h-8 w-[70%] bg-white -skew-x-[12deg]" />
          <div className="h-8 w-[85%] bg-white -skew-x-[12deg]" />
          <div className="h-8 w-[60%] bg-white -skew-x-[12deg]" />
        </div>

        {/* Botón Rojo "Próximamente" (Inclinación hacia la derecha) */}
        <button className="relative z-10 bg-[#E61415] h-14 w-full -skew-x-[10deg] flex items-center justify-center shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)]">
          <div className="h-3 w-32 bg-white/30 rounded-full -skew-x-[15deg]" />
        </button>
      </div>

      {/* SECCIÓN EVENTOS POSTERIORES */}
      <div className="px-6 -mt-4">
        <div className="flex flex-col items-center mb-8">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent mb-4" />
          <div className="h-4 w-48 bg-white/10 rounded-full italic uppercase" />
        </div>

        {/* Tarjeta de Evento con Imagen Grande */}
        <div className="relative w-full rounded-xl overflow-hidden bg-[#161922]">
          {/* Badge de fecha en la esquina */}
          <div className="absolute top-0 left-0 z-20 flex">
            <div className="bg-[#E61415] h-10 w-16 -skew-x-[15deg] -ml-2 flex items-center justify-center">
              <div className="h-2 w-8 bg-white/40 skew-x-[15deg]" />
            </div>
            <div className="bg-[#8b1011] h-10 w-16 -skew-x-[15deg] -ml-2 flex items-center justify-center">
              <div className="h-2 w-8 bg-white/20 skew-x-[15deg]" />
            </div>
          </div>

          <div className="w-full h-48 bg-zinc-800 bg-[url('https://www.circuitcat.com/wp-content/uploads/2025/09/Circuit_MotoGP_EarlyBirds_SLIDER-WEB_1500x600.jpg')] bg-cover bg-center" />

          <div className="p-4 bg-gradient-to-b from-[#1a1d26] to-[#0b0d14]">
            <div className="h-4 w-3/4 bg-white/10 rounded-full mb-2" />
            <div className="h-3 w-1/2 bg-white/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
