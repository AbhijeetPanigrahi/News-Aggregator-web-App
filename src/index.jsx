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
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
