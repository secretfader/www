#!/usr/bin/env /bin/sh

# Extend $PATH with $HOME/bin, using the npm binary path as a last option
PATH=$HOME/bin:$PATH:$(npm bin)
HUGO_ENVIRONMENT="${HUGO_ENVIRONMENT:=production}"

# Create built artifacts
hugo