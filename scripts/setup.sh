#!/usr/bin/env /bin/sh

# Terminate early on pipeline failure, since we use pipes below
set -e

JSON="Accept: application/json"
GITHUB="https://api.github.com/repos"
KERNEL="$(uname -s)"
BIT="$(getconf LONG_BIT)"
LATEST_VERSION="select(.draft == false) | select(.prerelease == false) .assets[]"
OS="$(uname -s)"

LATEST_HUGO="$LATEST_VERSION |
select(.name | contains(\"extended\")) |
select(.name | contains(\"$KERNEL-${BIT}bit.tar.gz\"))"

case "$OS" in 
    Linux*) "$PWD/scripts/install-linux.sh"
    Darwin*) "$PWD/scripts/install-macos.sh"
esac

HUGO_RELEASES=$(curl -sS -H "$JSON" "$GITHUB/gohugoio/hugo/releases")

# Retrieve the latest stable, extended release version of Hugo from GitHub
HUGO_DOWNLOAD_URL=$(printf "%s" "$HUGO_RELEASES" | jq -r "(.[0] | $LATEST_HUGO).browser_download_url")

# Make a directory at $HOME/bin to contain downloaded binaries
mkdir -p "$HOME/bin"

# Download the Hugo binary and extract the tar.gz archive $HOME/bin
curl -sSL "$HUGO_DOWNLOAD_URL" | tar -xzf - -C "$HOME/bin"

# Install npm dependencies (in CI mode)
npm ci