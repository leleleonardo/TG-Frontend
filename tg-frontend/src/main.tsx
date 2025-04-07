import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { NextUIProvider } from "@nextui-org/react";
import Index from "./pages/login/index"; // ou App, dependendo do seu projeto
import "./index.css"; // com Tailwind, se estiver usando

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Index />
    </NextUIProvider>
  </React.StrictMode>
);
