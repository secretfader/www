import { join } from "path";
import truncateHTML from "truncate-html";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const collectionToRSSItems = async (posts) =>
  Promise.all(
    posts.map(async (post) => {
      return {
        title: post.data.title,
        pubDate: post.data.date,
        link: join("posts/", post.slug),
      };
    }),
  );

export async function GET(ctx) {
  const collection = await getCollection("posts");
  const items = await collectionToRSSItems(collection);

  return rss({
    title: "Nicholas Young | Posts",
    description: "Posts from Nicholas Young's Blog",
    site: ctx.site,
    customData: `<language>en-us</language>`,
    items,
  });
}
