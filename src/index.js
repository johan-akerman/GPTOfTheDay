import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";

import Feed from "./pages/Feed";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rental from "./pages/Rental";
import New from "./pages/SubmitGPT";
import ReactGA from "react-ga";
import Directory from "./pages/Directory";

const trackingID = "G-76FM0PB6C2";
ReactGA.initialize(trackingID);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },

  {
    path: "/directory",
    element: <Directory />,
  },

  {
    path: "/lund/:rental",
    element: <Rental />,
  },

  {
    path: "/submit",
    element: <New />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  
    <RouterProvider router={router} />
  
);
