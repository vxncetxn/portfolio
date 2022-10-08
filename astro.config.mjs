import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
// import analyze from "rollup-plugin-analyzer";
import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
  vite: {
    ssr: {
      noExternal: [],
    },
    plugins: [{ ...threeMinifier(), enforce: "pre" }, visualizer()],
    worker: {
      plugins: [{ ...threeMinifier(), enforce: "pre" }],
    },
  },
});
