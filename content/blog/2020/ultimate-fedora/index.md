+++
authors = ["Nicholas Young"]
categories = ["Journal", "Linux", "Fedora-Linux"]
date = "2020-07-03T00:00:00Z"
draft = false
layout = "post"
title = "Creating the Ultimate Mobile Workstation with Fedora Linux"
slug = "ultimate-mobile-workstation-fedora-linux"
illustrationDescription = "Neofetch displays statistics on my 2018 Lenovo ThinkPad X1 Carbon after a day of work. Background image courtesy of Unsplash."
summary = "In 2020, Linux users have plenty of distributions to choose from. Why did I specifically choose Fedora as the base operating system for my ultimate mobile workstation?"
+++

In 2020, Linux users are no longer suffering from lack of choice. Two of the
largest distributions, Debian and Ubuntu, both cater to anyone who requires
long-term stability and wide hardware support. Opposite these goals, Arch
strives to deliver the absolute latest software to an audience of mostly
engineers. In between, you'll find at least [seven different flavors of Ubuntu][ubuntu-flavors]
alongside a handful of separate distributions like Void, NixOS, KDE Neon, openSUSE, and
Linux Mint all serving unique audiences with exacting tastes.

Anyone decently familiar with the Linux ecosystem, either now or in the past,
will note there is one major distribution I've left out of the above
discussion: Fedora. While the project is sponsored by Red Hat, Fedora isn't
an open source clone of [Enterprise Linux][rhel]. Instead, it serves as
a proving ground for future technologies and is currently resolving
concerns in implementations of both [Wayland][wayland-fedora] (a
display server intended to someday replace Xorg) and
[PipeWire][pipewire-fedora] (a unified audio processing and playout
framework).

## Why Fedora

I've chosen Fedora 32 as the base for my Ultimate Mobile Workstation for
a number of reasons.

While the distribution isn't technically "[rolling][rolling-release]",
frequent kernel updates provide a similar, if not more stable, experience.
Additionally, it ships a nearly-unmodified GNOME desktop environment, uses
[one of the most intelligent package managers][dnf-fedora], is part of
[Lenovo's officially supported operating systems roadmap][lenovo-fedora],
provides an excellent installer, and receives major updates on a reasonable
semiannual cadence.

While configurating and operating Arch systems gives a thrill, the pragmatic
administrator sitting on my shoulder continually whispers that Fedora has
everything I need and very few things I don't. Plus, installing from the
[everything ISO][fedora-everything] (branded for "experts only") provides
ample opportunities for customization. Looking towards the immediate future,
Fedora 33 proposes to begin shipping Btrfs ("Butter FS"), a [kernel-provided
copy-on-write filesystem][fedora-btrfs] that has been under [heavy load at
Facebook][facebook-btrfs], where it received patches to enhance both
performance and stability.

I recommend booting from a USB drive and following the installer guide for a Custom Installation, which concludes at a text login prompt.

## Installing Base Packages

Once signed in, most users will want to install a desktop environment. For the purposes of this article, I chose GNOME because of its minimalism and ease of installation.

```
sudo dnf groupinstall "GNOME"
sudo systemctl enable gdm.service
sudo systemctl set-default graphical.target
sudo systemctl start gdm.service
```

Once you've successfully executed the commands above, expect to see a graphical login manager, a much friendlier interface to anyone not familiar with the command line.



[ubuntu-flavors]: https://ubuntu.com/download/flavours
[rhel]: https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux
[wayland-fedora]: https://docs.fedoraproject.org/en-US/fedora/rawhide/system-administrators-guide/Wayland/
[pipewire-fedora]: https://blogs.gnome.org/uraeus/category/pipewire/
[rolling-release]: https://www.zdnet.com/article/linux-distributions-rolling-releases-versus-point-releases-which-should-you-choose/
[dnf-fedora]: https://fedoraproject.org/wiki/DNF
[lenovo-fedora]: https://fedoramagazine.org/coming-soon-fedora-on-lenovo-laptops/
[fedora-everything]: https://alt.fedoraproject.org/
[fedora-btrfs]: https://fedoraproject.org/wiki/Changes/BtrfsWithFullSystemSnapshots
[facebook-btrfs]: https://facebookmicrosites.github.io/btrfs/docs/btrfs-facebook.html
