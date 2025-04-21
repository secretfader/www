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

export async function findPodcast(slug) {
  return (await getCollection("podcasts")).find(
    ({ data: { title } }) => textToSlug(title) === slug,
  );
}

export async function findEpisodes(podcast) {
  return await getCollection(podcast);
}

export async function fetchPodcastImage(src) {
  return await getImage({ src, width: 3000, height: 3000, format: "jpg" });
}

export function episodesToRSSItems(podcast, episodes) {
  return (episodes || [])
    .sort(byNumber)
    .map(
      ({
        data: { title, number, date: pubDate, description, assets, explicit },
        rendered,
      }) => {
        const link = `/archives/podcasts/${textToSlug(podcast.data.title)}/${number}`;
        const { length, url, format } = mediaUrl(podcast, assets);

        let customData = "";
        if (explicit) {
          customData += `<itunes:explicit>yes</itunes:explicit>`;
        } else {
          customData += `<itunes:explicit>no</itunes:explicit>`;
        }

        return {
          title,
          pubDate,
          description,
          link,
          content: rendered.html,
          customData,
          enclosure: {
            url,
            length,
            type: format,
          },
        };
      },
    );
}

export function textToSlug(text) {
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

function imageUrl(relativePath) {
  return ["https://content.secretfader.com", `images/${relativePath}.jpg`].join(
    "/",
  );
}
