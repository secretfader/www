// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

const site = import.meta.env.CF_PAGES_URL || "https://secretfader.com";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [tailwind(), sitemap()],
  adapter: cloudflare(),
});