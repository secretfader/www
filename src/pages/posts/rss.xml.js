import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(ctx) {
  const collection = await getCollection("posts");

  return rss({
    title: "Nicholas Young | Posts",
    description: "Posts from Nicholas Young's Blog",
    site: ctx.site,
    items: collection,
    customData: `<language>en-us</language>`,
  });
}
