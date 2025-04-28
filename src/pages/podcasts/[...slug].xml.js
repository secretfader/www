import { join } from "path";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

//
// Astro APIs
//
export async function getStaticPaths() {
  return (await getPodcasts()).map((p) => ({
    params: { slug: textToSlug(p.data.title) },
    props: p,
  }));
}

export async function GET(ctx) {
  return await rss({
    title: "",
    description: "",
    xmlns: { itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd" },
    customData: "",
    site: ctx.site,
    items: [],
  });
}
