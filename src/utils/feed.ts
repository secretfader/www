import { getCollection } from "astro:content";
import { getImage } from "astro:assets";
import { encode } from "html-entities";
import { basename, join } from "path";
import humanize from "humanize-list";

//
// Helpers and Custom Utilities
//
export function podcastCollectionFromContext(ctx) {
  return basename(ctx.originPathname).slice(0, -4);
}

export function buildCustomData({
  title,
  authors,
  category,
  subcategory,
  complete,
}) {
  let customData = `<image>${imageUrl(textToSlug(title))}</image>`;

  customData += `<itunes:author>${humanize(authors)}</itunes:author>`;
  customData += `<itunes:image href="${imageUrl(textToSlug(title))}"/>`;
  customData += `<itunes:category text="${encode(category)}"/>`;

  if (subcategory) {
    customData += `<itunes:category text="${encode(subcategory)}"/>`;
  }

  if (complete) {
    customData += `<itunes:complete>Yes</itunes:complete>`;
  }

  return customData;
}

export async function findPodcast(slug, collection) {
  return (await getCollection(collection)).find(
    ({ data: { title } }) => textToSlug(title) === slug,
  );
}

export async function findEpisodes(podcast) {
  return await getCollection(podcast);
}

export async function fetchPodcastImage(src) {
  return await getImage({ src, width: 3000, height: 3000, format: "jpg" });
}

export function episodesToRSSItems(podcast, episodes, format) {
  format = format || "mp3";
  episodes = episodes || [];

  return episodes.sort(byNumber).map(({ data, rendered }) => {
    const { url, contentType, length } = mediaUrl(
      { ...podcast.media, ...data.media },
      format,
    );

    return {
      title: data.title,
      description: data.description,
      link: "/podcasts/",
      content: rendered.html(),
    };
  });
}

export function textToSlug(text) {
  return text
    .trim()
    .replace(/[^A-Za-z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function mediaUrl(media, format) {
  const asset = media.assets.find((a) => a.filename.endsWith(format));
  return {
    url: [media.host, asset.filename].join("/"),
    ...asset,
  };
}

function byNumber(prev, next) {
  if (next.data.number > prev.data.number) {
    return 1;
  }

  return -1;
}

function imageUrl(relativePath) {
  return ["https://content.secretfader.com", `images/${relativePath}.jpg`].join(
    "/",
  );
}
