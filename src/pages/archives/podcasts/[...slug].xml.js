import { basename } from "path";
import truncateHTML from "truncate-html";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const toSlug = (text) =>
  text
    .trim()
    .replace(/[^A-Za-z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

export async function getStaticPaths() {
  const podcasts = await getCollection("podcasts");
  return podcasts.map((p) => ({
    params: { slug: toSlug(p.data.title) },
    props: p,
  }));
}

const collectionToRSSItems = async (podcast, posts) =>
  Promise.all(
    posts.sort(byNumber).map(async (post) => {
      const assets = post.data.assets || [];
      return {
        title: post.data.title,
        pubDate: post.data.date,
        link: `/archives/podcasts/${toSlug(podcast.data.title)}/${post.data.number}`,
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

async function findPodcastBySlug(slug) {
  const podcast = (await getCollection("podcasts")).find(
    (p) => toSlug(p.data.title) === slug,
  );

  if (podcast) {
    return podcast;
  }

  return null;
}

export async function GET(ctx) {
  const collectionName = basename(ctx.originPathname).slice(0, -4);
  const podcast = await findPodcastBySlug(collectionName);

  const episodes = await getCollection(collectionName);
  const items = await collectionToRSSItems(podcast, episodes);

  const rsx = await rss({
    title: podcast.data.title,
    description: podcast.body,
    site: ctx.site,
    customData: `<language>en-us</language>`,
    items,
  });

  return rsx;
}
