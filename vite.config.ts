import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Static build for GitHub Pages: every page is prerendered to plain HTML in
// dist/client. There is no server runtime, database or sign-in.
export default defineConfig({
  server: { host: "0.0.0.0", port: 8080, strictPort: true },
  preview: { host: "127.0.0.1", port: 8081, strictPort: true },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoSubfolderIndex: true,
        failOnError: true,
      },
      pages: [{ path: "/" }, { path: "/de/" }],
    }),
    viteReact(),
  ],
});
