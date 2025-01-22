import { join } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const collectionToRSSItems = async (posts) =>
  posts.map((post) => ({
    title: post.data.title,
    pubDate: post.data.pubDate,
    link: join("posts/", post.slug),
  }));

export async function GET(ctx) {
  const collection = await getCollection("posts");
  return rss({
    title: "Nicholas Young | Posts",
    description: "Posts from Nicholas Young's Blog",
    site: ctx.site,
    items: await collectionToRSSItems(collection),
    customData: `<language>en-us</language>`,
  });
}
