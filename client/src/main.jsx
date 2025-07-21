import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UrlProvider } from "./context/urlContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UrlProvider>
      <App />
    </UrlProvider>
  </BrowserRouter>
);
