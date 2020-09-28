#!/usr/bin/env bash
set -e

# Retrieve the latest release from Hugo GitHub's API
HUGO_URL=$(curl -sS https://api.github.com/repos/gohugoio/hugo/releases | jq -r ".[0].assets[] | select(.name | test(\"extended\")) | select(.name | test(\"Linux-64bit.tar.gz\")) | .browser_download_url")

# Setup local binary directory
mkdir -p $HOME/bin

# Install Hugo
curl -sSL $HUGO_URL | tar -xzf - -C $HOME/bin

# Install npm dependencies
npm ci
