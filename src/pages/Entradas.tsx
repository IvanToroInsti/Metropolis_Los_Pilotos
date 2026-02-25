export function Entradas() {
  return (
    <div className="bg-[#0b0d14] min-h-screen text-white font-sans p-6 flex flex-col">
      {/* HEADER PLACEHOLDERS */}
      <div className="mt-12 flex flex-col gap-4">
        {/* Placeholder: TUS ENTRADAS */}
        <div className="h-8 w-full bg-white/90 -skew-x-[12deg] italic" />

        {/* Placeholder: Subtítulo (No tienes tickets...) */}
        <div className="h-4 w-full bg-white/20 rounded-full italic" />
      </div>

      {/* ÁREA CENTRAL (TEXTOS Y FLECHAS SIMULADAS) */}
      <div className="flex-1 mt-16 relative">
        {/* Placeholder: Texto superior derecha */}
        <div className="absolute right-0 top-10 flex flex-col items-end gap-2 w-48">
          <div className="h-3 w-full bg-white/10 rounded-full italic" />
          <div className="h-3 w-2/3 bg-white/10 rounded-full italic" />
        </div>

        {/* Placeholder: Texto inferior izquierda */}
        <div className="absolute left-0 bottom-24 flex flex-col gap-2 w-56">
          <div className="h-3 w-full bg-white/10 rounded-full italic" />
          <div className="h-3 w-3/4 bg-white/10 rounded-full italic" />
          <div className="h-3 w-1/2 bg-white/10 rounded-full italic" />
        </div>
      </div>

      {/* BOTONES DE ACCIÓN INFERIORES */}
      <div className="flex gap-2 items-end mb-10">
        {/* Botón Comprar Entradas */}
        <button className="flex-1 bg-[#E61415] h-16 -skew-x-[15deg] flex items-center justify-center shadow-lg relative overflow-hidden">
          <div className="h-3 w-32 bg-white/30 rounded-full skew-x-[15deg]" />
        </button>

        {/* Botón "+" lateral */}
        <button className="bg-[#4D5681] h-16 w-16 -skew-x-[15deg] flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 relative skew-x-[15deg]">
            <div className="absolute inset-0 m-auto w-full h-1 bg-white/50 rounded-full" />
            <div className="absolute inset-0 m-auto h-full w-1 bg-white/50 rounded-full" />
          </div>
        </button>
      </div>
    </div>
  );
}
