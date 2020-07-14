#!/usr/bin/env bash
HUGO_ENV=production hugo
netlify deploy --prod
