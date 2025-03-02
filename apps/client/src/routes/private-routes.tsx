import { useAuth } from "@/providers/auth-guard";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const PrivateRoutes = () => {
  const { isAuthenticated, protectedloading, verfiyToken } = useAuth();

  useEffect(() => {
    verfiyToken();
  }, []);

  if (protectedloading) {
    return (
      <div>
        <BounceLoader size={70} color="#e390eb" />
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/signin?next=" + location.pathname} />
  );
};
export default PrivateRoutes;
