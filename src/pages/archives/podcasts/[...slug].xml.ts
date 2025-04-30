import { basename } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import {
  getArchivedPodcasts,
  getPodcast,
  buildCustomData,
  xmlns,
  entriesToRSSItems,
} from "../../../utils/feed";

//
// Astro APIs
//
export async function GET(ctx) {
  const { slug } = ctx.params;

  const {
    id,
    data: { title, authors, categories, media, explicit },
    body: description,
    site,
    entries,
  } = await getPodcast(
    { site: ctx.site, base: `/archives/podcasts`, query: slug },
    getArchivedPodcasts(),
  );

  return await rss({
    title,
    description,
    site,
    xmlns: xmlns(),
    customData: buildCustomData({
      id,
      site,
      title,
      authors,
      categories,
      explicit,
    }),
    items: entriesToRSSItems(entries, "mp3", {
      media,
      site,
      //prefix: `/archives`,
    }),
  });
}

export async function getStaticPaths() {
  return (await getArchivedPodcasts()).map((p) => ({
    params: { slug: basename(p.id) },
    props: p,
  }));
}
