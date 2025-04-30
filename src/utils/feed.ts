import { getCollection } from "astro:content";
import { encode } from "html-entities";
import { basename } from "path";
import humanize from "humanize-list";

//
// Helpers and Custom Utilities
//
export const getPodcasts = () => getCollection("podcasts");
export const getArchivedPodcasts = () => getCollection("podcast-archives");

export async function getPodcast(options, data) {
  //const query = basename(ctx.originPathname).slice(0, -4);
  const results = ((await data) || []).map((p) => ({
    site: new URL(`${options.base}/${basename(p.id)}`, options.site),
    ...p,
  }));

  const podcast = results.find((p) => basename(p.id) === options.query);
  if (podcast) {
    podcast.entries = await getCollection(options.query);
  }

  return podcast;
}

export function buildCustomData({
  id,
  site,
  title,
  authors,
  categories,
  explicit,
  duration,
  complete,
}) {
  let customData = ``;
  if (id) {
    customData += `<image>${imageUrl(basename(id))}</image>`;
    customData += `<itunes:image href="${imageUrl(basename(id))}"/>`;
  }

  if (authors && authors.length > 0) {
    customData += `<itunes:author>${humanize(authors)}</itunes:author>`;
  }

  for (const category of categories || []) {
    customData += `<itunes:category text="${encode(category)}"/>`;
  }

  if (explicit) {
    customData += `<itunes:explicit>True</itunes:explicit>`;
  } else {
    customData += `<itunes:explicit>False</itunes:explicit>`;
  }

  if (duration) {
    customData += `<itunes:duration>${duration}</itunes:duration>`;
  }

  if (complete) {
    customData += `<itunes:complete>Yes</itunes:complete>`;
  }

  if (site) {
    customData += `<atom:link href="${site}" rel="self" type="application/rss+xml"/>`;
  }

  return customData;
}

function imageUrl(relativePath) {
  return ["https://content.secretfader.com", `images/${relativePath}.jpg`].join(
    "/",
  );
}

export function entriesToRSSItems(entries, format, defaults) {
  entries = entries || [];

  return entries.sort(byNumber).map(({ data, rendered }) => {
    const { url, contentType, length } = mediaURL(
      {
        ...defaults.media,
        ...data.media,
      },
      format,
    );

    let prefix;
    if (defaults.prefix) {
      prefix = defaults.prefix + defaults.site.pathname;
    } else {
      prefix = defaults.site.pathname;
    }

    const link = new URL(
      `${prefix}/${data.episodeRef || data.number}`,
      defaults.site.origin,
    ).href;

    const enclosure = {
      url,
      length,
      type: contentType,
    };

    return {
      title: data.title,
      description: data.description,
      pubDate: data.pubDate,
      link,
      content: rendered.html,
      customData: buildCustomData({ ...data }),
      enclosure,
    };
  });
}

export function xmlns() {
  return {
    itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
    atom: "http://www.w3.org/2005/Atom",
  };
}

function mediaURL(media, format) {
  const asset = media.assets.find((a) => a.filename.endsWith(format));
  const prefixPath = new URL(media.host).pathname;
  const url = new URL(`${prefixPath}/${asset.filename}`, media.host);

  return {
    url: rewriteURLForPodtrac(url.href),
    ...asset,
  };
}

function byNumber(prev, next) {
  if (next.data.number > prev.data.number) {
    return 1;
  }

  return -1;
}

function rewriteURLForPodtrac(url) {
  const ext = url.endsWith("mp4") ? "mp4" : "mp3";

  if (import.meta.env.PROD) {
    url = url.replace("https://", "");
    url = url.replace("http://", "");
    url = `https://dts.podtrac.com/redirect.${ext}/${url}`;
  }

  return url;
}
