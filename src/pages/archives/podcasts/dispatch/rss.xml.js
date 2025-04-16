import path from "path";
import truncateHTML from "truncate-html";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const collectionToRSSItems = async (posts) =>
  Promise.all(
    posts.sort(byNumber).map(async (post) => {
      const assets = post.data.assets || [];
      return {
        title: post.data.title,
        pubDate: post.data.date,
        link: `/archives/podcasts/dispatch/${post.data.number}`,
        description: post.data.description,
        content: post.data.body,
      };
    }),
  );

function byNumber(prev, next) {
  if (next.data.number > prev.data.number) {
    return 1;
  }

  return -1;
}

export async function GET(ctx) {
  const collection = await getCollection("dispatch");
  const items = await collectionToRSSItems(collection);

  const rsx = await rss({
    title: "Dispatch",
    description:
      "Conversations from the intersection of art, culture, and commerce.",
    site: "https://secretfader.com",
    customData: `<language>en-us</language>`,
    items,
  });

  return rsx;
}
