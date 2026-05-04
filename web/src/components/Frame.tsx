import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirstFrame } from "../pages/FirstFrame";

export default function MobileFrame() {
  const navigate = useNavigate();

  const [appOpen, setAppOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const openApp = () => {
    setAppOpen(true);
    setShowLogin(false);
  };

  const resetPhone = () => {
    setAppOpen(false);
    setShowLogin(false);
    navigate("/");
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3308/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      });

      const data = await res.json();

      console.log("LOGIN:", data);

      if (res.ok) {
        navigate("/app"); // ✔ entra a la app real
      } else {
        alert(data.message || "Error en login");
      }
    } catch (error) {
      console.error(error);
      alert("Error de servidor");
    }
  };

  return (
    <div
      className="fixed w-full sm:relative flex sm:items-center justify-center sm:min-h-screen sm:p-4 bg-no-repeat bg-cover bg-bottom"
      style={{ backgroundImage: "url('body.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xs pointer-events-none" />

      <div className="relative w-full sm:max-w-75 h-screen md:h-150 max-h-162.5 sm:rounded-[3rem] sm:border-8 shadow-2xl overflow-hidden">

        <div className="w-full h-full overflow-hidden sm:border bg-[#1c1d2b]">
          <NotiBar />

          {!appOpen ? (
            <FirstFrame onAppClick={openApp} />
          ) : !showLogin ? (
            <div className="w-full h-full flex items-center justify-center bg-black/30">
              <div className="bg-white p-5 rounded-xl shadow-xl w-64 text-center">
                <h1 className="text-lg font-bold mb-3">Login</h1>

                <input
                  className="w-full border-2 border-[#E61415] p-2 mb-2 rounded"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />

                <input
                  className="w-full border-2 border-[#E61415] p-2 mb-3 rounded"
                  type="password"
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />

                <button
                  onClick={handleLogin}
                  className="w-full bg-[#E61415] text-white py-2 rounded"
                >
                  Entrar
                </button>

                <button
                  onClick={resetPhone}
                  className="w-full mt-2 text-sm text-gray-500"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              APP CARGADA
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotiBar() {
  const date = new Date();

  return (
    <div className="w-full h-8 px-6 flex items-center justify-between text-[11px] text-white bg-[#25263A]">
      <span>
        {date.getHours()}:{String(date.getMinutes()).padStart(2, "0")}
      </span>
    </div>
  );
}