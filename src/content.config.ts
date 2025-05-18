import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const podcasts = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/podcasts" }),
});

const episodes = defineCollection({
  loader: glob({ pattern: "**/episodes/*.md", base: "./src/content/podcasts" }),
});

export const collections = {
  podcasts,
  episodes,
};
