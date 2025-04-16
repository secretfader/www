// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: process.env.CF_PAGES_URL || "https://secretfader.com",
  integrations: [tailwind(), sitemap()],
});
