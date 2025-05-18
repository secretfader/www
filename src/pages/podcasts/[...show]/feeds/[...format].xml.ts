import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

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
    data: { title, description, media },
  } = podcasts.find((p) => p.id === ctx.params.show);

  const entries = episodes
    .filter((e) => e.filePath && e.filePath.split("/").includes(id))
    .sort((a, b) => b.data.number - a.data.number);

  return rss({
    title,
    description,
    site: new URL(`/podcasts/${ctx.params.show}`, ctx.site),
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
      enclosure: {
        url,
        type: contentType,
        length,
      },
    };
  });

const mediaURL = (media, format) => {
  if (format === "video") {
    format = "mp4";
  } else {
    format = "mp3";
  }

  const asset = media.assets.find((a) => a.filename.endsWith(format));
  const prefixPath = new URL(media.host).pathname;
  const url = new URL(`${prefixPath}/${asset.filename}`, media.host);

  return {
    url: rewriteURLForPodtrac(url.href),
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
