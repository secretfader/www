// Copyright 2020 Nicholas Young. All rights reserved.

import Turbolinks from 'turbolinks';
import { Application } from 'stimulus';

import { Contact } from './controllers/contact';
import { Slideshow } from './controllers/slideshow';
import { Audio } from './controllers/audio-player';
import { setupThemeSelector } from './theme';

Turbolinks.start();

const app = Application.start();
app.register('contact', Contact);
app.register('slideshow', Slideshow);
app.register('audio-player', Audio);

setupThemeSelector();
