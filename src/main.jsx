import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
