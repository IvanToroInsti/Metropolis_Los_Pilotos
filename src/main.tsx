import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MobileFrame from "./components/Frame";

import "./index.css";
import { FirstFrame } from "./pages/FirstFrame";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Circuit } from "./pages/Circuit";
import { CircuitPage } from "./pages/CircuitPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MobileFrame>
        <Routes>
          <Route path="/" element={<FirstFrame />} />

          <Route element={<Circuit />}>
            <Route path="home" element={<>Home</>} />
            <Route path="eventos" element={<>Eventos</>} />
            <Route path="tickets" element={<>tickets</>} />
            <Route path="app" element={<>app</>} />
            <Route path="circuit" element={<CircuitPage />} />
            <Route path="cuenta" element={<>cuenta</>} />
          </Route>
        </Routes>
      </MobileFrame>
    </BrowserRouter>
  </StrictMode>,
);
