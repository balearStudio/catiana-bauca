import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is deployed at the root of its own subdomain
// (<slug>.dev.balearstudio.com), never under a repo-name subpath,
// so `base` stays "/" for both the client and SSR builds.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
