import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { Issue, Issues } from "./pages";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Issues />,
    },
    {
      path: "/:ownerParam/:repoParam/issues/:numberParam",
      element: <Issue />,
    },
    // {
    //   path: "/",
    //   element: <Home />,
    // },
    // {
    //   path: "/invest",
    //   element: <Invest />,
    // },.
    // {
    //   path: "/issues",
    //   element: <Issues />,
    // },
    // {
    //   path: "/:owner/:repo/issues/:number",
    //   element: <Issue />,
    // },
    // {
    //   path: "/swap/:owner/:repository",
    //   element: <Swap/>,
    // },
    // {
    //   path: "/auth",
    //   element: <Authenticate />,
    // },
  ]);

  return <RouterProvider router={router} />;
};
