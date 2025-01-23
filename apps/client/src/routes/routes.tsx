import ErrorPage from "@/error-page";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout";
import { About, Home } from "./Pages";
import Signin from "./Pages/auth-signin";
import SignUp from "./Pages/auth-signup";
import PrivateRoutes from "./private-routes";

import RedirectFromAuth from "./redirect-from-auth";
import Paste from "@/routes/Pages/preview-paste";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/:pastId",
        element: <Paste />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/user",
        element: <PrivateRoutes />,
        children: [
          {
            path: "/user/posts",
            element: <div>Posts</div>,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/auth",
        element: <RedirectFromAuth />,
        children: [
          {
            path: "/auth/signin",
            element: <Signin />,
          },
          {
            path: "/auth/signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);

export default routers;
