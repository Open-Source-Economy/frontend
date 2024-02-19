import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Swap from "./pages/swap/Swap";
import React from "react";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/swap/:owner/:repository",
      element: <Swap />,
    },
  ]);

  return <RouterProvider router={router} />;
};
