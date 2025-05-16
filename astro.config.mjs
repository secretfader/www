// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

const site = import.meta.env.CF_PAGES_URL || "https://secretfader.com";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap()],
  adapter: cloudflare(),
  vite: { plugins: [tailwind()] },
});
