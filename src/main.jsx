import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
