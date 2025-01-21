import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function ModeToggle() {
  type Theme = "dark" | "light";
  const { setTheme } = useTheme();
  const theme = localStorage.getItem("vite-ui-theme") as Theme;
  const [usertheme, setUsertheme] = useState<Theme>(theme);

  useEffect(() => {
    setUsertheme(theme ? theme : "dark");
  }, [theme]);

  return (
    <div className="bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/15">
      {usertheme == "dark" ? (
        <Sun
          size={30}
          className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:rotate-45"
          onClick={() => setTheme("light")}
        />
      ) : (
        <Moon
          size={35}
          className="ursor-pointer transition-transform duration-300 ease-in-out transform hover:rotate-45"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
}
