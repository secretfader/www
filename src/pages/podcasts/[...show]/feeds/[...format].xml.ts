import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { encode } from "html-entities";
import humanize from "humanize-list";
import { buildMediaURL } from "../../../../data";

export function getStaticPaths() {
  return [
    {
      params: { show: "craft-and-process", format: "video" },
    },
    {
      params: { show: "craft-and-process", format: "audio" },
    },
    {
      params: { show: "dispatch", format: "audio" },
    },
    {
      params: { show: "inside-the-machine", format: "audio" },
    },
  ];
}

export async function GET(ctx) {
  const podcasts = await getCollection("podcasts");
  const episodes = await getCollection("episodes");

  const {
    id,
    data: {
      title,
      description,
      media,
      categories,
      explicit,
      complete,
      authors,
    },
  } = podcasts.find((p) => p.id === ctx.params.show);

  const entries = episodes
    .filter((e) => e.filePath && e.filePath.split("/").includes(id))
    .sort((a, b) => b.data.number - a.data.number);

  return rss({
    title:
      ctx.params.format.toLowerCase() === "video" ? `${title} - Video` : title,
    description,
    site: new URL(`/podcasts/${ctx.params.show}`, ctx.site),
    customData: customData({
      id,
      categories,
      explicit,
      complete,
      authors,
    }),
    xmlns: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
      atom: "http://www.w3.org/2005/Atom",
    },
    items: entriesToRSSItems(entries, {
      podcast: id,
      format: ctx.params.format,
      media,
    }),
  });
}

const entriesToRSSItems = (entries, options) =>
  entries.map(({ data, rendered }) => {
    const { url, contentType, length } = mediaURL(
      { ...options.media, ...data.media },
      options.format,
    );

    return {
      title: data.title,
      description: data.description,
      pubDate: data.pubDate || data.date,
      link: `/podcasts/${options.podcast}/${data.slug || data.number}`,
      content: rendered.html,
      customData: customData(data),
      enclosure: {
        url,
        type: contentType,
        length,
      },
    };
  });

const customData = ({
  id,
  language,
  site,
  authors,
  categories,
  explicit,
  duration,
  complete,
}) => {
  let customData = ``;

  if (id) {
    customData += `<image>${assetURL(id)}</image>`;
    customData += `<itunes:image href="${assetURL(id)}"/>`;
  }

  if (language) {
    customData += `<language>${language}</language>`;
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
};

const assetURL = (relativePath) =>
  ["https://content.secretfader.com", `images/${relativePath}.jpg`].join("/");

const mediaURL = (media, format) => {
  if (format === "video") {
    format = "mp4";
  } else {
    format = "mp3";
  }

  console.log(media);
  const asset = media.assets.find((a) => a.filename.endsWith(format));
  const url = buildMediaURL(media.host, asset);

  return {
    url: rewriteURLForPodtrac(url.toString()),
    ...asset,
  };
};

const rewriteURLForPodtrac = (url) => {
  const ext = url.endsWith("mp4") ? "mp4" : "mp3";

  if (import.meta.env.PROD) {
    url = url.replace("https://", "");
    url = url.replace("http://", "");
    url = `https://dts.podtrac.com/redirect.${ext}/${url}`;
  }

  return url;
};
