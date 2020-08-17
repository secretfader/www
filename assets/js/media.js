// Copyright 2020 Nicholas Young. All rights reserved.

export function detectAudioCodecs() {
  const audio = document.createElement('audio');
  const matrix = {
    opus: false,
    ogg: false,
    webm: false,
    mp3: false,
    aac: false,
  };

  if (audio) {
    const opus = audio.canPlayType('audio/ogg; codecs="opus"');
    matrix.opus = isSupported(opus);

    const ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');
    matrix.ogg = isSupported(ogg);

    const webm = audio.canPlayType('audio/webm; codecs="vorbis"');
    matrix.webm = isSupported(webm);

    const mp3 = audio.canPlayType('audio/mpeg');
    matrix.mp3 = isSupported(mp3);

    const aac = audio.canPlayType('audio/mp4; codecs="mp4a.40.02"');
    matrix.aac = isSupported(aac);

    audio.remove();
  }

  return matrix;
}

export function detectVideoCodecs() {
  const video = document.createElement('video');
  const matrix = {
    mp4: false,
    ogg: false,
    webm: false,
  };

  if (video) {
    const mp4 = video.canPlayType('video/mp4; codecs="mp4v.20.08"');
    matrix.mp4 = isSupported(mp4);

    const h264 = video.canPlayType('video/mp4; codecs="avc1.4201E, mp4a.40.02"');
    matrix.h264 = isSupported(h264);

    const ogg = video.canPlayType('video/ogg; codecs="theora"');
    matrix.ogg= isSupported(ogg);

    const webm = video.canPlayType('video/webm; codecs="vp8, vp9, vorbis"');
    matrix.webm = isSupported(webm);

    video.remove();
  }

  return matrix;
}

function isSupported(canPlayType) {
  if (canPlayType === '') {
    return false;
  }

  return true;
}
