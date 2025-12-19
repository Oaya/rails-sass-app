import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "reactjs-popup/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";

import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
