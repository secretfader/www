+++
authors = ["Nicholas Young"]
categories = ["Journal", "Linux", "Fedora-Linux"]
date = "2020-07-03T00:00:00Z"
draft = false
layout = "post"
title = "Creating the Ultimate Mobile Workstation with Fedora Linux"
illustrationDescription = "Neofetch displays statistics on my 2018 Lenovo ThinkPad X1 Carbon after a day of work. Background image courtesy of Unsplash."
summary = "In 2020, Linux users aren't hurting for choice. Ubuntu, Linux Mint, and Arch are all fine options. Why did I choose Fedora Linux as the base operating system for my ultimate mobile workstation?"
+++

In 2020, Linux users aren't hurting for choice. Two of the largest
distributions, Debian and Ubuntu, both cater to anyone who requires long-term
stability and wide hardware support. Opposite these goals, Arch strives to
deliver the absolute latest software to an audience of mostly engineers. In
between, you'll find a handful of distributions like Void, Nix, and Linux Mint
all serving unique audiences with exacting tastes.

Anyone decently familiar with the Linux ecosystem, either now or in the past,
will note there is one major distribution I've left out of the above
discussion: Fedora. While the project is sponsored by Red Hat, Fedora isn't an
open source clone of Enterprise Linux. Instead, it serves as a proving ground
for future technologies and is currently smoothing out bumps in implementations
of both [Wayland][wayland-fedora] (a display server intended to someday replace
Xorg) and [PipeWire][pipewire-fedora] (a unified audio processing and playout
framework).

## Why Fedora

I've chosen Fedora as the base for my Ultimate Mobile Workstation for a number
of reasons.

While the distribution isn't technically "rolling", frequent kernel updates
provide a similar, if not more stable, experience. Additionally, it ships
a nearly-unmodified GNOME desktop environment, uses [one of the most
intelligent package managers][dnf-fedora], is part of [Lenovo's officially
supported operating systems roadmap][lenovo-fedora], provides an excellent
installer, and receives major updates on a reasonable semiannual cadence.

While configurating and operating Arch systems gives a thrill, the pragmatic
administrator sitting on my shoulder continually whispers that Fedora has
everything I need and very few things I don't. Plus, installing from the
[everything ISO][fedora-everything] (branded for "experts only") provides
ample opportunities for customization.

Looking towards the immediate future, Fedora 33 aims to begin shipping Btrfs
("Butter FS"), a [kernel-provided copy-on-write filesystem][fedora-btrfs]
that has been under [heavy use at Facebook][facebook-btrfs], where it
received patches to enhance both performance and stability.

I recommend booting from a USB drive and following the installer guide for a Custom Installation, which concludes at a text login prompt.

## Installing Base Packages

[wayland-fedora]: https://docs.fedoraproject.org/en-US/fedora/rawhide/system-administrators-guide/Wayland/
[pipewire-fedora]: https://blogs.gnome.org/uraeus/category/pipewire/
[dnf-fedora]: https://fedoraproject.org/wiki/DNF
[lenovo-fedora]: https://fedoramagazine.org/coming-soon-fedora-on-lenovo-laptops/
[fedora-everything]: https://alt.fedoraproject.org/
[fedora-btrfs]: https://fedoraproject.org/wiki/Changes/BtrfsWithFullSystemSnapshots
[facebook-btrfs]: https://facebookmicrosites.github.io/btrfs/docs/btrfs-facebook.html
