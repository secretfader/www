// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import alpine from "@astrojs/alpinejs";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@tailwindcss/vite";

const site = import.meta.env.CF_PAGES_URL || "https://secretfader.com";

// https://astro.build/config
export default defineConfig({
  site,
  vite: { plugins: [tailwind()] },
  integrations: [sitemap(), alpine()],
  adapter: cloudflare(),
});
