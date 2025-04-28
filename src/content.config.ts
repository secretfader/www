import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "src/content/posts/**/*.md" }),
});

const podcasts = defineCollection({
  loader: glob({ pattern: "src/content/podcasts/**/index.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      artwork: image(),
      category: z.string(),
      subcategory: z.string(),
      authors: z.array(z.string()),
      complete: z.boolean(),
    }),
});

const podcastArchives = defineCollection({
  loader: glob({ pattern: "src/content/archives/podcasts/**/index.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      artwork: image(),
      category: z.string(),
      subcategory: z.string(),
      media: z.object({ host: z.string() }),
      authors: z.array(z.string()),
      complete: z.boolean(),
    }),
});

const dispatchPodcast = defineCollection({
  loader: glob({
    pattern: "src/content/archives/podcasts/dispatch/episodes/*.md",
  }),
});

const insideTheMachinePodcast = defineCollection({
  loader: glob({
    pattern: "src/content/archives/podcasts/inside-the-machine/episodes/*.md",
  }),
});

const craftAndProcessPodcast = defineCollection({
  loader: glob({
    pattern: "src/content/podcasts/craft-and-process/episodes/*.md",
  }),
  schema: z.object({
    title: z.string(),
    number: z.number(),
    episodeRef: z.string(),
    youtubeId: z.string(),
    media: z.object({
      host: z.string(),
      assets: z.array(
        z.object({
          contentType: z.string(),
          filename: z.string(),
        }),
      ),
    }),
  }),
});

export const collections = {
  podcasts,
  "podcast-archives": podcastArchives,
  dispatch: dispatchPodcast,
  "inside-the-machine": insideTheMachinePodcast,
  "craft-and-process": craftAndProcessPodcast,
};
