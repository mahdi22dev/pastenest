import { RouterProvider } from "react-router-dom";
import routers from "../routes/routes";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./auth-guard";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";

function Providers() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />{" "}
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routers} />{" "}
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default Providers;
