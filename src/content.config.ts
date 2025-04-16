import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const dispatch = defineCollection({
  loader: glob({
    pattern: "src/content/podcasts/dispatch/*.md",
  }),
});

export const collections = { dispatch };
