import React from "react";
import ReactDOM from "react-dom";
// Some third-party bundles may reference `process` in the browser.
// Provide a small safe shim to avoid `ReferenceError: process is not defined`.
if (typeof process === "undefined") {
  // eslint-disable-next-line no-undef
  window.process = { env: {} };
}
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
