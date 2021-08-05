#!/usr/bin/env /bin/sh

# Terminate early on pipeline failure, since we use pipes below
set -e

JSON="Accept: application/json"
GITHUB="https://api.github.com/repos"
LATEST_VERSION="select(.draft == false) | select(.prerelease == false) .assets[]"
BIT="$(getconf LONG_BIT)"
OS="$(uname -s)"

case "$OS" in 
    Linux*)
        "$PWD/scripts/install-linux.sh"
    ;;
    Darwin*)
        "$PWD/scripts/install-macos.sh"
        OS="macOS"
    ;;
esac

LATEST_HUGO="$LATEST_VERSION |
    select(.name | contains(\"extended\")) |
    select(.name | contains(\"$OS-${BIT}bit.tar.gz\"))"

HUGO_RELEASES=$(curl -sS -H "$JSON" "$GITHUB/gohugoio/hugo/releases")

# Retrieve the latest stable, extended release version of Hugo from GitHub
HUGO_DOWNLOAD_URL=$(printf "%s" "$HUGO_RELEASES" | jq -r "(.[0] | $LATEST_HUGO).browser_download_url")

# Make a directory at $HOME/bin to contain downloaded binaries
mkdir -p "$HOME/bin"

# Download the Hugo binary and extract the tar.gz archive $HOME/bin
curl -sSL "$HUGO_DOWNLOAD_URL" | tar -xzf - -C "$HOME/bin"

# Install npm dependencies (in CI mode)
npm ci