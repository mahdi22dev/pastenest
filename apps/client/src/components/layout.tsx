import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
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
