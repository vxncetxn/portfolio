import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [
    react(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
  vite: {
    plugins: [{ ...threeMinifier(), enforce: "pre" }],
    ssr: {
      external: [
        "@preact/signals-core",
        "@preact/signals-react",
        "react",
        "react-dom",
        "@types/react",
        "@types/react-dom",
      ],
    },
  },
});
