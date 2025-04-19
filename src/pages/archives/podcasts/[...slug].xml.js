import { basename, join } from "path";
import { getCollection } from "astro:content";
import { getImage } from "astro:assets";
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
    data: { title, artwork: artworkFile },
    body: description,
  } = podcast;

  const artwork = await fetchPodcastImage(artworkFile);

  let customData = `<image>${pathFromContext(ctx, artwork.src)}</image>`;
  customData += `<itunes:image>${pathFromContext(ctx, artwork.src)}</itunes:image>`;

  return await rss({
    title,
    description,
    xmlns: { itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd" },
    customData,
    site: pathFromContext(ctx, `/archives/podcasts/${textToSlug(title)}`),
    items: episodesToRSSItems(podcast, episodes),
  });
}

//
// Helpers and Custom Utilities
//
function podcastCollectionFromContext(ctx) {
  return basename(ctx.originPathname).slice(0, -4);
}

function pathFromContext(ctx, relativePath) {
  return join(ctx.site.toString(), relativePath);
}

async function findPodcast(slug) {
  return (await getCollection("podcasts")).find(
    ({ data: { title } }) => textToSlug(title) === slug,
  );
}

async function findEpisodes(podcast) {
  return await getCollection(podcast);
}

async function fetchPodcastImage(src) {
  return await getImage({ src, width: 3000, height: 3000, format: "jpg" });
}

function episodesToRSSItems(podcast, episodes) {
  return (episodes || [])
    .sort(byNumber)
    .map(
      ({
        data: { title, number, date: pubDate, description, assets },
        rendered,
      }) => {
        const link = `/archives/podcasts/${textToSlug(podcast.data.title)}/${number}`;
        const { length, url, format } = mediaUrl(podcast, assets);

        return {
          title,
          pubDate,
          description,
          link,
          content: rendered.html,
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
