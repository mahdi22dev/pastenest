import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { useEffect } from "react";
import { useAuth } from "@/providers/auth-guard";

const Layout = () => {
  const { setCurrentlocation } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setCurrentlocation(location);
  }, [location]);

  return (
    <div>
      <Navbar />
      <main className="min-h-[95vh] w-full flex justify-center items-center flex-col gap-10 font tracking-wide p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
