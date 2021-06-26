#!/usr/bin/env /bin/sh

# Terminate early on pipeline failure, since we use pipes below
set -e

KERNEL="$(uname -s)"
BIT="$(getconf LONG_BIT)"

if [[ $BIT != "64" ]]; then
    echo "Only 64-bit architectures are supported"
    exit 1
fi

LATEST_VERSION="select(.draft == false) | select(.prerelease == false) .assets[]"

LINUX_GNU="select(.name | contains(\"${KERNEL,,}-gnu\"))"

LATEST_HUGO="$LATEST_VERSION |
        select(.name | contains(\"extended\")) |
        select(.name | contains(\"$KERNEL-"$BIT"bit.tar.gz\"))"

LATEST_SD="$LATEST_VERSION |
    select(.name | contains(\"linux-gnu\"))"

HUGO_RELEASES=$(curl -sS -H 'Accept: application/json' \
    https://api.github.com/repos/gohugoio/hugo/releases
)

SD_RELEASES=$(curl -sS -H 'Accept: application/json' \
    https://api.github.com/repos/chmln/sd/releases
)

# Retrieve the latest stable, extended release version of Hugo from GitHub
HUGO_DOWNLOAD_URL=$(printf "%s" "$HUGO_RELEASES" | jq -r "(.[0] | $LATEST_HUGO).browser_download_url")

# Retrieve the latest stable version of `sd` from GitHub
SD_DOWNLOAD_URL=$(printf "%s" "$SD_RELEASES" | jq -r "(.[0] | $LATEST_SD).browser_download_url")

# Make a directory at $HOME/bin to contain downloaded binaries
mkdir -p $HOME/bin

# Download the Hugo binary and extract the tar.gz archive $HOME/bin
curl -sSL $HUGO_DOWNLOAD_URL | tar -xzf - -C $HOME/bin
curl -sSL $SD_DOWNLOAD_URL -o $HOME/bin/sd

# Install npm dependencies (in CI mode)
npm ci