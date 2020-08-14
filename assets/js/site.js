// Copyright 2020 Nicholas Young. All rights reserved.

import Turbolinks from 'turbolinks';
import { Application } from 'stimulus';

import { Contact } from './controllers/contact';
import { setupThemeSelector } from './theme.js';

Turbolinks.start();

const app = Application.start();
app.register('contact', Contact);

setupThemeSelector();
