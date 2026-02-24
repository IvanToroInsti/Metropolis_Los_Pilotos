import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MobileFrame from "./components/Frame";

import "./index.css";
import { Circuit } from "./components/Circuit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MobileFrame>
      <Circuit/>
    </MobileFrame>
  </StrictMode>,
);

