import { basename } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import {
  getPodcasts,
  getPodcast,
  buildCustomData,
  entriesToRSSItems,
} from "../../utils/feed";

//
// Astro APIs
//
export async function GET(ctx) {
  const {
    id,
    data: { title, authors, categories, media },
    body: description,
    site,
    entries,
  } = await getPodcast(ctx, getPodcasts());

  let format = "mp3";
  if (
    ctx.url &&
    ctx.url.searchParams &&
    ctx.url.searchParams.format === "video"
  ) {
    format = "mp4";
  }

  return await rss({
    title,
    description,
    site,
    xmlns: { itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd" },
    customData: buildCustomData({ id, title, authors, categories }),
    items: entriesToRSSItems(entries, format, { media, site }),
  });
}

export async function getStaticPaths() {
  return (await getPodcasts()).map((p) => ({
    params: { slug: basename(p.id) },
    props: p,
  }));
}
