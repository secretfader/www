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

export const channelId = "UCRg-cd0XZe9FMVr_3DKGXEw";

/// Get metadata about the supplied YouTube channel
export async function getChannel() {
  const res = await yt.channels.list({
    auth,
    part: "contentDetails",
    id: channelId,
  });

  if (res.data.pageInfo.totalResults == 1) {
    return res.data.items[0];
  } else {
    return [];
  }
}

/// Load recent videos from a provided channel
export async function getRecentVideos(channelId, maxResults) {
  let results = [];

  let nextPageToken = 1;
  let prevPageToken = 0;
  while (results.length < maxResults) {
    let totalResults = maxResults - results.length;

    const res = await yt.search.list({
      auth,
      channelId,
      maxResults: totalResults,
      nextPageToken,
      prevPageToken,
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

      results.concat(filtered);
      nextPageToken++;
      if (prevPageToken <= 1) {
        prevPageToken--;
      }
    }
  }

  return results;
}
