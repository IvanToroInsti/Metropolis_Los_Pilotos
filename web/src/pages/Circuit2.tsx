export function Circuit2() {
  return (
    <div className="bg-[#0b0d14] min-h-screen text-white font-sans flex flex-col">
      {/* HEADER CON IMAGEN TEXTURIZADA */}
      <div className="relative w-full h-48 overflow-hidden flex items-end p-6">
        {/* Imagen de fondo (pianos del circuito) */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.circuitcat.com/wp-content/uploads/2017/11/638573847_1320435280129699_2118023988776460689_n-8.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] to-transparent" />

        {/* Título Principal */}
        <div className="relative z-10">
          <div className="h-8 w-32 bg-white/90 -skew-x-[12deg] italic" />
        </div>
      </div>

      {/* LISTADO DE MENÚ */}
      <div className="flex flex-col px-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>
  );
}

const MenuItem = () => (
  <div className="w-full h-16 border-b border-white/10 flex items-center justify-between group active:bg-white/5 transition-colors">
    <div className="flex items-center gap-4">
      {/* Placeholder: Icono */}
      <div className="w-6 h-6 rounded-md border-2 border-white/20 flex items-center justify-center">
        <div className="w-2 h-2 bg-white/20 rounded-full" />
      </div>

      {/* Placeholder: Texto del item */}
      <div className="h-3 w-32 bg-white/10 rounded-full" />
    </div>

    {/* Flecha lateral (Chevron) */}
    <div className="w-5 h-5 flex items-center justify-center">
      <div className="w-2 h-2 border-t-2 border-r-2 border-white/40 rotate-45" />
    </div>
  </div>
);
