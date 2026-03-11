import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MobileFrame from "./components/Frame";

import "./index.css";
import { FirstFrame } from "./pages/FirstFrame";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Circuit } from "./pages/Circuit";
import { CircuitPage } from "./pages/CircuitPage";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Entradas } from "./pages/Entradas";
import { Circuit2 } from "./pages/Circuit2";
import { Cuenta } from "./pages/Cuenta";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MobileFrame>
        <Routes>
          <Route path="/" element={<FirstFrame />} />

          <Route element={<Circuit />}>
            <Route path="home" element={<Home />} />
            <Route path="eventos" element={<Events />} />
            <Route path="tickets" element={<Entradas />} />
            <Route path="app" element={<CircuitPage />} />
            <Route path="circuit" element={<Circuit2 />} />
            <Route path="cuenta" element={<Cuenta />} />
          </Route>
        </Routes>
      </MobileFrame>
    </BrowserRouter>
  </StrictMode>,
);
