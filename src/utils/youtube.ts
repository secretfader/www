import youtube from "@googleapis/youtube";

const auth = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const yt = youtube.youtube("v3");

/// Helper to exclude shorts from results
function snippetIsOkay(video) {
  if (
    video &&
    video.snippet &&
    video.snippet.description !== "" &&
    video.snippet.title.indexOf("#") === -1 &&
    video.id.kind === "youtube#video"
  ) {
    return true;
  }
}

/// Get metadata about the supplied YouTube channel
export async function getChannel() {
  const res = await yt.channels.list({
    auth,
    part: "contentDetails",
    id: "UCRg-cd0XZe9FMVr_3DKGXEw",
  });

  if (res.data.pageInfo.totalResults == 1) {
    return res.data.items[0];
  } else {
    return [];
  }
}

/// Load recent videos from a provided channel
export async function getRecentVideos(channelId, maxResults) {
  const res = await yt.search.list({
    auth,
    channelId,
    maxResults,
    part: "snippet",
    order: "date",
  });

  if (res.data.pageInfo.totalResults > 0) {
    const filtered = res.data.items.filter((video) => {
      if (snippetIsOkay(video)) {
        return true;
      } else {
        return false;
      }
    });
    return filtered;
  } else {
    return [];
  }
}
