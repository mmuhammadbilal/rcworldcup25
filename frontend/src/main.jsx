// src/main.jsx
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext"; // ✅ lowercase context

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* ✅ Only ONE Router here */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
