import ErrorPage from "@/error-page";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout";
import { About, Home } from "./Pages";
import Signin from "./Pages/signin";
import SignUp from "./Pages/signup";
import PrivateRoutes from "./PrivateRoutes";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
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
            element: <Home />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
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
]);

export default routers;
