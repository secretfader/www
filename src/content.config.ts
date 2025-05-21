import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const podcasts = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/podcasts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean(),
      authors: z.array(z.string()),
      categories: z.array(z.string()),
      artwork: image(),
      language: z.string(),
      copyright: z.string(),
      complete: z.boolean().optional(),
      explicit: z.boolean().optional(),
      slug: z.string(),
    }),
});

const episodes = defineCollection({
  loader: glob({ pattern: "**/episodes/*.md", base: "./src/content/podcasts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    number: z.number(),
    youtubeId: z.string().optional(),
    pubDate: z.date().optional(),
    date: z.string().optional(),
    duration: z.string(),
    explicit: z.boolean(),
    media: z.object({
      host: z.string().optional(),
      assets: z.array(
        z.object({
          contentType: z.string(),
          filename: z.string(),
          length: z.number().optional(),
        }),
      ),
    }),
  }),
});

export const collections = {
  podcasts,
  episodes,
};
