// Copyright 2020 Nicholas Young. All rights reserved.

import { Controller } from 'stimulus';
import { detectAudioCodecs } from '../media';

export class Audio extends Controller {
  static audio = document.createElement('audio');

  connect() {
    this.codecs = detectAudioCodecs();
  }

  canPlayType(format) {
    return this.codecs[format];
  }
}
