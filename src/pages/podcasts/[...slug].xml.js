import { join } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

import {
  podcastCollectionFromContext,
  findPodcast,
  findEpisodes,
  buildCustomData,
  fetchPodcastImage,
  textToSlug,
  episodesToRSSItems,
} from "../../../utils/feed";

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
    data: {
      title,
      authors,
      artwork: artworkFile,
      category,
      subcategory,
      complete,
    },
    body: description,
  } = podcast;

  const artwork = await fetchPodcastImage(artworkFile);
  const customData = buildCustomData({
    title,
    authors,
    category,
    subcategory,
    complete,
  });

  return await rss({
    title,
    description,
    xmlns: { itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd" },
    customData,
    site: join(ctx.site.toString(), `/podcasts/${textToSlug(title)}`),
    items: episodesToRSSItems(podcast, episodes),
  });
}
