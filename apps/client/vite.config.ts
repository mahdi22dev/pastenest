import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({}) => {
  // const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: env.VITE_SERVER_PATH,
    //       changeOrigin: true,
    //     },
    //   },
    // },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
