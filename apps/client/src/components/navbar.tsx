import { memo, useState } from "react";
import useDeviceType from "@/hooks/devicetype";
import { ModeToggle } from "./custom/mod-toggle";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useAuth } from "@/providers/auth-guard";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Navbar = memo(() => {
  const isMobile = useDeviceType();
  const { isAuthenticated } = useAuth();

  const logOut = async () => {
    try {
      const response = await fetch("/api/auth/logout");
      if (!response.ok) {
        toast({
          variant: "default",
          title: "Please Try again later",
          description: "internal server error at " + new Date().toISOString(),
        });
      }
    } catch (error) {
      toast({
        variant: "default",
        title: "Please Try again later",
        description: "internal server error at " + new Date().toISOString(),
      });
    }
  };
  return (
    <nav className=" h-16 w-full font">
      {isMobile == "mobile" ? (
        <MobileNavbar isAuthenticated={isAuthenticated} logOut={logOut} />
      ) : (
        <DesktopNavbar isAuthenticated={isAuthenticated} logOut={logOut} />
      )}
    </nav>
  );
});

const MobileNavbar = ({
  isAuthenticated,
  logOut,
}: {
  isAuthenticated: boolean;
  logOut: () => Promise<void>;
}) => {
  const [toggleNav, setToggleNav] = useState(false);
  const handleToggle = () => {
    setToggleNav(false);
  };
  return (
    <div
      className={`md:hidden py- flex justify-between items-center w-full h-full p-5 ${toggleNav && "bg-primary text-primary-foreground"}`}
    >
      <div className="flex items-center">
        <a href={"/"}>
          <img
            src={logo}
            alt="website logo"
            className="w-12 h-12" // Adjust the width and height as needed
          />
        </a>
      </div>

      <div className="flex gap-5 justify-between items-center">
        <AuthComponent
          isAuthenticated={isAuthenticated}
          toggleNav={toggleNav}
          logOut={logOut}
        />
        <ModeToggle />
        <div
          className="bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/15"
          onClick={() => setToggleNav(!toggleNav)}
        >
          <Menu size={35} className="cursor-pointer" />
        </div>
      </div>

      {toggleNav && (
        <ul className="border-t-2 flex justify-between flex-col items-center gap-4 border-slate-500 absolute top-16 left-0 w-full bg-primary p-5 shadow-lg">
          <SingleLink path="/" name="Home" handleToggle={handleToggle} />{" "}
          {/* <SingleLink
            path="/user/posts"
            name="Posts"
            handleToggle={handleToggle}
          /> */}
          <SingleLink
            path="/myposts"
            name="My Pasts"
            handleToggle={handleToggle}
          />
          <div
            className="mx-auto max-w-16 flex justify-center items-center bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/15"
            onClick={() => setToggleNav(!toggleNav)}
          >
            <X size={30} className="cursor-pointer" />
          </div>
        </ul>
      )}
    </div>
  );
};

const DesktopNavbar = ({
  isAuthenticated,
  logOut,
}: {
  isAuthenticated: boolean;
  logOut: () => Promise<void>;
}) => {
  return (
    <div className="hidden md:flex py-3 justify-between items-center px-5 max-w-7xl mx-auto border-gray-700 mb-10">
      <div className="flex items-center">
        <a href={"/"}>
          <img
            src={logo}
            alt="website logo"
            className="w-12 h-12" // Adjust the width and height as needed
          />
        </a>
      </div>

      <ul className="flex justify-between items-center gap-5">
        <SingleLink path="/" name="Create Paste" />{" "}
        {/* <SingleLink path="/user/posts" name="Top Pasts" /> */}
        <SingleLink path="/myposts" name="My Pasts" />
        <AuthComponent isAuthenticated={isAuthenticated} logOut={logOut} />
        <div className="flex gap-5 justify-between items-center">
          <ModeToggle />
        </div>{" "}
      </ul>
    </div>
  );
};
type HandleToggle = () => void;

const SingleLink = ({
  handleToggle,
  name,
  path,
  hardNavigation,
}: {
  handleToggle?: HandleToggle;
  name: string;
  path: string;
  hardNavigation?: boolean;
}) => {
  return hardNavigation ? (
    <a href={path}>
      <li
        onClick={handleToggle}
        className="bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/15"
      >
        {name}
      </li>
    </a>
  ) : (
    <Link to={path}>
      <li
        onClick={handleToggle}
        className="bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/15"
      >
        {name}
      </li>
    </Link>
  );
};

const AuthComponent = ({
  isAuthenticated,
  toggleNav,
  logOut,
}: {
  isAuthenticated: boolean;
  toggleNav?: boolean;
  logOut: () => Promise<void>;
}) => {
  return isAuthenticated ? (
    <a
      href={"/auth/signin"}
      className=" p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out "
    >
      <Button
        className="flex items-center justify-between gap-2"
        variant={"secondary"}
        onClick={logOut}
      >
        <CiLogout size={25} /> Sign Out
      </Button>
    </a>
  ) : (
    <a
      href={"/auth/signin"}
      className=" p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out "
    >
      <Button
        className="flex items-center justify-between gap-2"
        variant={`${toggleNav ? "secondary" : "default"}`}
      >
        <CiLogin size={25} /> Sign In
      </Button>
    </a>
  );
};
export default Navbar;
