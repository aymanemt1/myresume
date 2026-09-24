
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { LangueProvider } from "./Context/LangueContext";
import { App } from "./Master/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LangueProvider>
      <App />
    </LangueProvider>
  </React.StrictMode>
);

