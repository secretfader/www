// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: getSite(),
  integrations: [sitemap()],
  vite: { plugins: [tailwind()] },
  redirects: {
    "/archives/podcasts/dispatch.xml": "/podcasts/dispatch/feeds/audio.xml",
    "/archives/podcasts/inside-the-machine.xml":
      "/podcasts/inside-the-machine/feeds/audio.xml",
  },
  adapter: cloudflare(),
});

function getSite() {
  if (process.env.CUSTOM_DOMAIN) {
    return process.env.CUSTOM_DOMAIN;
  }

  return "https://secretfader.com";
}
