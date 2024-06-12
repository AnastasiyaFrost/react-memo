import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { LeadersProvider } from "./context/Leaders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LeadersProvider>
      <RouterProvider router={router}></RouterProvider>
    </LeadersProvider>
  </React.StrictMode>,
);
