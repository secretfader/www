// @ts-check
import { defineConfig } from "astro/config";
import alpine from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@tailwindcss/vite";

const site = import.meta.env.CF_PAGES_URL || "https://secretfader.com";

// https://astro.build/config
export default defineConfig({
  site,
  output: "server",
  integrations: [alpine(), sitemap()],
  vite: { plugins: [tailwind()] },
  redirects: {
    "/podcasts": "/podcasts/craft-and-process",
    "/archives/podcasts/dispatch.xml": "/podcasts/dispatch/feeds/audio.xml",
    "/archives/podcasts/inside-the-machine.xml":
      "/podcasts/inside-the-machine/feeds/audio.xml",
  },
  adapter: cloudflare(),
});
