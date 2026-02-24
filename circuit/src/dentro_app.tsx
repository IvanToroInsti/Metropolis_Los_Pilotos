import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MobileFrame from "./components/Frame";

import "./index.css";
import { Inici } from "./components/Inici";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MobileFrame>
      <Inici/>
    </MobileFrame>
  </StrictMode>,
);

