// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";

const site = process.env.CF_PAGES_URL || "https://secretfader.com";

// https://astro.build/config
export default defineConfig({
  site,
  vite: { plugins: [tailwind()] },
  redirects: {
    "/archives/podcasts/dispatch.xml": "/podcasts/dispatch/feeds/audio.xml",
    "/archives/podcasts/inside-the-machine.xml":
      "/podcasts/inside-the-machine/feeds/audio.xml",
  },
});
