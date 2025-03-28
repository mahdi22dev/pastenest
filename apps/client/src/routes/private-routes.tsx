import { useAuth } from "@/providers/auth-guard";
import { Navigate, Outlet } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const PrivateRoutes = () => {
  const { isAuthenticated, protectedloading } = useAuth();

  // useEffect(() => {
  //   verfiyToken();
  // }, []);

  if (protectedloading) {
    return (
      <div>
        <BounceLoader size={70} color="#059669" />
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
