import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "spa-dev-fallback",
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          if (
            request.method === "GET" &&
            request.url &&
            !request.url.includes(".") &&
            !request.url.startsWith("/@") &&
            !request.url.startsWith("/src")
          ) {
            request.url = "/index.html";
          }
          next();
        });
      },
    },
  ],
});
