import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [react()],
  vite: {
    plugins: [{ ...threeMinifier(), enforce: "pre" }],
  },
});
