#!/usr/bin/env /bin/sh

# Terminate early on pipeline failure, since we use pipes below
set -e

HUGO_RELEASES=$(curl -sS -H 'Accept: application/json' \
    https://api.github.com/repos/gohugoio/hugo/releases
)
    
RELEASE_FILTER="(.[0] |
   (select(.draft == false) | select(.prerelease == false)).assets[] |
        select(.name | contains(\"extended\")) | select(.name | contains(\"Linux-64bit.tar.gz\"))
    ).browser_download_url"

# Retrieve the latest stable, extended release version of from GitHub
HUGO_DOWNLOAD_URL=$(jq -r "$RELEASE_FILTER" <<< $HUGO_RELEASES)

# Make a directory at $HOME/bin to contain downloaded binaries
mkdir -p $HOME/bin

# Download the Hugo binary and extract the tar.gz archive $HOME/bin
curl -sSL $HUGO_DOWNLOAD_URL | tar -xzf - -C $HOME/bin