import { join } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(ctx) {
  const collection = await getCollection("posts");

  return rss({
    title: "Nicholas Young | Posts",
    description: "Posts from Nicholas Young's Blog",
    site: join(ctx.site, "posts/"),
    items: [],
    customData: `<language>en-us</language>`,
  });
}
