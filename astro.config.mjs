// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const site = process.env.CF_PAGES
  ? process.env.CF_PAGES_URL
  : "https://secretfader.com/";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [tailwind()],
});
