import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "src/content/posts/**/*.md" }),
});

const podcasts = defineCollection({
  loader: glob({ pattern: "src/content/podcasts/**/index.md" }),
});

const dispatchPodcast = defineCollection({
  loader: glob({
    pattern: "src/content/podcasts/dispatch/episodes/*.md",
  }),
});

const insideTheMachinePodcast = defineCollection({
  loader: glob({
    pattern: "src/content/podcasts/inside-the-machine/episodes/*.md",
  }),
});

export const collections = {
  podcasts,
  dispatch: dispatchPodcast,
  "inside-the-machine": insideTheMachinePodcast,
};
