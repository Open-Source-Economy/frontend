import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import { Home, Swap } from "./pages";

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

  return (
    <div className="main">
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};
