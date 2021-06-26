# Secret Fader

![Current Build Status](https://github.com/secretfader/www/workflows/Build/badge.svg)
[![Made by Fader](https://img.shields.io/badge/made_by-Fader-purple.svg)](https://www.secretfader.com)

The digital home of engineer, educator, photographer, healthcare advocate, and athlete [Nicholas "Fader"
Young][dotcom].

## System Requirements

This repository is configured largely for personal contributions and reflects the work preferences of its author (although work is ongoing to change that). If you intend to contribute, here are a few guidelines that will ease the process.

### Environment

Before diving in, ensure the following tools are configured on your system:

- [Git][git-scm]
- [Git LFS][gif-lfs]
- [Node.js][nodejs] (version `14` or greater)
- [Hugo][hugo]

Once you have basic system dependencies installed, read over the scripts in [`scripts/`](scripts/) and CI workflow files in [`.github/workflows/`](.github/workflows/). For instance, [`scripts/setup.sh`](scripts/setup.sh) handles installing a supported version of [Hugo][hugo] (the static site generator) to `$HOME/bin`, where it can be run from scripts later in the build pipeline.

### Tooling and Processes

HTML, CSS, JavaScript, and Markdown files are formatted with [Prettier][prettier], shell code is formatted with [Beautysh][beautysh]. The JavaScript front-end (however rudimentary) is tested with [Jest][jest].

## Goals

- Provide an approachable introduction, with both personal and professional areas of focus
- Facilitate soft real-time connection via social channels
- Empower opportunities for advocacy and education
## License

(C) Copyright 2001-2021 Nicholas Young. All rights reserved.

HTML Markup, stylesheets, and configuration is released under the [Mozilla
Public License, version 2.0](LICENSE-MPL), and may be reused under its terms.

Artistic works published in this repository or on `secretfader.com`, including photography, illustration, and article text [may not be
republished or reused without explicit authorization.](LICENSE)

[dotcom]: https://www.secretfader.com
[git-scm]: https://git-scm.com
[git-lfs]: https://git-lfs.github.com
[nodejs]: https://github.com/nodejs/node
[hugo]: https://github.com/gohugoio/hugo
[prettier]: https://github.com/prettier/prettier
[beautysh]: https://github.com/lovesegfault/beautysh
[jest]: https://github.com/facebook/jest
