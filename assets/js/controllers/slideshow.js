// Copyright 2020 Nicholas Young. All rights reserved.

import { Controller } from 'stimulus';

export class Slideshow extends Controller {
  static targets = ['slide'];

  initialize() {
    this.present();
  }

  present() {
    this.slideTargets.forEach((element, index) => {
      element.classList.toggle('slide-current', index === this.index);
    });
  }

  next() {
    if (this.index < this.count) {
      this.index++;
    }
  }

  previous() {
    if (this.index > 0) {
      this.index--;
    }
  }

  get index() {
    if (this.data.has('index')) {
      return parseInt(this.data.get('index'));
    }

    return 0
  }

  set index(value) {
    this.data.set('index', value);
    this.present();
  }

  get count() {
    return this.slideTargets.length - 1;
  }
}
