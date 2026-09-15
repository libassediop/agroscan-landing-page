// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://agro-scan.com",
  // URLs avec slash final : identiques aux URLs canoniques servies par Cloudflare Pages
  trailingSlash: "always",
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  build: {
    // CSS inliné dans le HTML : pas de requête bloquante au premier affichage
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
