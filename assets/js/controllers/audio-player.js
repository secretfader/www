// Copyright 2020 Nicholas Young. All rights reserved.

import { Controller } from 'stimulus';
import { detectAudioCodecs } from '../media';

export class Audio extends Controller {
  static targets = []

  connect() {
    this.addEventListeners();
    this.codecs = detectAudioCodecs();
  }

  disconnect() {
    this.removeEventListeners();
  }

  canPlayType(format) {
    return this.codecs[format];
  }

  play(src) {
    console.log(src);
  }

  load(e) {
    e.preventDefault();
    this.play(e.target.href);
  }

  toggleVisibility(visibility) {
  }

  addEventListeners() {
    linkSelector.forEach(element => {
      element.addEventListener('click', this.load.bind(this)); 
    });
  }

  removeEventListeners() {
    linkSelector.forEach(element => {
      element.removeEventListener('click', this.load.bind(this));
    });
  }
}

const linkSelector = document.querySelectorAll('a.play');
