import { basename } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

//
// Astro APIs
//
export async function getStaticPaths() {
  const podcasts = await getCollection("podcasts");
  return podcasts.map((p) => ({
    params: { slug: textToSlug(p.data.title) },
    props: p,
  }));
}

export async function GET(ctx) {
  const collection = podcastCollectionFromContext(ctx);
  const podcast = await findPodcast(collection);
  const episodes = await findEpisodes(collection);

  const {
    data: { title },
    body: description,
  } = podcast;

  return await rss({
    title,
    description,
    site: `${ctx.site}/archives/podcasts/${textToSlug(title)}`,
    items: episodesToRSSItems(podcast, episodes),
  });
}

//
// Helpers and Custom Utilities
//
function podcastCollectionFromContext(ctx) {
  return basename(ctx.originPathname).slice(0, -4);
}

async function findPodcast(slug) {
  return (await getCollection("podcasts")).find(
    ({ data: { title } }) => textToSlug(title) === slug,
  );
}

async function findEpisodes(podcast) {
  return await getCollection(podcast);
}

function episodesToRSSItems(podcast, episodes) {
  return (episodes || [])
    .sort(byNumber)
    .map(
      ({
        data: {
          title,
          number,
          date: pubDate,
          body: content,
          description,
          assets,
        },
      }) => {
        const link = `/archives/podcasts/${textToSlug(podcast.data.title)}/${number}`;
        const { length, url, format } = mediaUrl(podcast, assets);

        return {
          title,
          pubDate,
          description,
          link,
          enclosure: {
            url,
            length,
            type: format,
          },
        };
      },
    );
}

function textToSlug(text) {
  return text
    .trim()
    .replace(/[^A-Za-z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function mediaUrl(podcast, assets) {
  const asset = assets.find((a) => a.format === "mp3");
  return {
    url: [podcast.data.media.host, asset.filename].join("/"),
    ...asset,
  };
}

function byNumber(prev, next) {
  if (next.data.number > prev.data.number) {
    return 1;
  }

  return -1;
}
