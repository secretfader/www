#!/usr/bin/env bash
set -e

# Retrieve the latest stable, extended release version from GitHub
DOWNLOAD_URL=$(curl --silent -H 'Accept: application/json' \
    https://api.github.com/repos/gohugoio/hugo/releases | \
    jq -r "(.[0] |
    (select(.draft == false) | select(.prerelease == false)).assets[] |
        select(.name | contains(\"extended\")) | select(.name | contains(\"Linux-64bit.tar.gz\"))
    ).browser_download_url"
)

# Make a directory at $HOME/bin to contain downloaded binaries
mkdir -p $HOME/bin

# Download the Hugo binary and extract the tar.gz archive $HOME/bin
curl -sSL $DOWNLOAD_URL | tar -xzf - -C $HOME/bin