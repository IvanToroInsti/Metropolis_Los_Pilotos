export function Cuenta() {
  return (
    <div className="bg-[#0b0d14] min-h-screen text-white font-sans flex flex-col">
      {/* HEADER: IMAGEN DE FONDO + AVATAR */}
      <div className="relative w-full h-80 flex flex-col items-center justify-center p-6 bg-[url('https://www.circuitcat.com/wp-content/uploads/2025/01/cad6b2a0c0dac3762ff098cb8b55e445-scaled.jpeg')] bg-cover bg-center">
        {/* Overlay oscuro para la imagen */}
        <div className="absolute inset-0 bg-black/40" />

        <div
          className="w-20 h-20 bg-contain bg-no-repeat bg-center z-10 mb-2"
          style={{ backgroundImage: "url('cuenta.png')" }}
        />

        {/* Placeholder: Nombre y Apellido */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="h-4 w-32 bg-white -skew-x-[12deg] italic" />
          <div className="h-3 w-48 bg-white/80 -skew-x-[12deg] italic" />
        </div>
      </div>

      {/* CONTENEDOR INFERIOR REDONDEADO */}
      <div className="flex-1 bg-[#161922] -mt-8 rounded-t-[32px] p-6 z-20 shadow-2xl">
        <div className="flex flex-col gap-2">
          <AccountItem />
          <AccountItem />

          {/* Item especial con badge "Próximamente" */}
          <div className="w-full h-20 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-md bg-white/10" />
              <div className="h-3 w-24 bg-white/10 rounded-full" />

              {/* Badge Rojo "Próximamente" */}
              <div className="bg-[#E61415] h-6 px-3 skew-x-[15deg] flex items-center justify-center ml-2">
                <div className="h-1.5 w-12 bg-white/40 -skew-x-[15deg] rounded-full" />
              </div>
            </div>
            <div className="w-2 h-2 border-t-2 border-r-2 border-white/40 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

const AccountItem = () => (
  <div className="w-full h-20 border-b border-white/10 flex items-center justify-between active:bg-white/5 transition-colors">
    <div className="flex items-center gap-4">
      {/* Icono izquierdo */}
      <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
        <div className="w-2 h-2 border border-white/20 rounded-sm" />
      </div>

      {/* Texto del item */}
      <div className="h-3 w-36 bg-white/20 rounded-full" />
    </div>

    {/* Flecha (Chevron) */}
    <div className="w-2 h-2 border-t-2 border-r-2 border-white/40 rotate-45 mr-2" />
  </div>
);
