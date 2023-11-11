import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import New from "./pages/SubmitGPT";
import Directory from "./pages/Directory";
import Leaderboard from "./pages/Leaderboard";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Gpt from "./pages/Gpt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },

  {
    path: "/directory",
    element: <Directory />,
  },

  {
    path: "/gpts/:gpt",
    element: <Gpt />,
  },

  {
    path: "/submit",
    element: <New />,
  },

  {
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/log-in",
    element: <LogIn />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
