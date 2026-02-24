import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MobileFrame from "./components/Frame";

import "./index.css";
import { FirstFrame } from "./components/FirstFrame";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MobileFrame>
      <FirstFrame />
    </MobileFrame>
  </StrictMode>,
);

