+++
date = "2019-04-18T00:00:00Z"
description = "Evaluating Tide, Rust's latest community-driven web framework."
draft = true
outputs = []
title = "Rising with the Tide"
+++

# Rising with the Tide

Evaluating Rust's latest community-driven web framework

{{% note %}}
From telemetry systems running on microcontrollers to HTTP APIs, Rust is
a suitable tool for use at nearly every level of your stack. However, Rust is
also a young language and still evolving at a rapid clip. This means, as a
community, we still have much to learn.

In this talk, I'll cover the basics of Tide, a new web framework developed by
the Rust 2018 Network Services Working Group, and provide a few reasons you may want
to investigate it.
{{% /note %}}

---

# `whoami`

{{% note %}}
Let's begin with an introduction, shall we?
{{% /note %}}

---

## Nicholas Young

# ♿ 🦀 🌊

{{% note %}}
I'm Nicholas Young. I spend most of my time advocating for accessibility; that
is when I'm not hacking on or teaching Rust. I'm also an active member of the
Rust Network Service Working Group.
{{% /note %}}

---

{{<imgresize src="co-gold-rust.png" width="x200" class="no-outline" >}}

## Colorado Gold Rust

https://cogoldrust.com

CFP is open now: https://cfp.cogoldrust.com

{{% note %}}
Additionally, I'm a co-organizer of Colorado Gold Rust, a Rustlang conference
coming to Denver in September. Early bird tickets are available, and our CFP is
open now.
{{% /note %}}

---

https://www.secretfader.com/slides/rising-with-tide/

{{% note %}}
Before I proceed further, please don't feel pressed to take notes. This talk is
an informal tour of Tide and the ecosystem that surrounds it. And, of course,
my slides are available at this URL.

If you want to chat about what I've presented, I'll be avaiable to answer
questions afterwards.
{{% /note %}}

---

<ul>
  <li class="fragment">
    Enhancing accessibility of working group discussions
  </li>
  <li class="fragment">
    Clarifying application development patterns
  </li>
  <li class="fragment">
    Providing real-world examples to drive framework progress
  </li>
</ul>

{{% note %}}
Still, I have ambitious goals for this presentation. In order to succeed at any
of them, I'll need your help. Tonight, I've chosen to focus on three key points:

**Enhancing accessibility**

For those of us with jobs that don't intersect with open source, it can be difficult
to attend meetings. My hope is that presenting lessons I've learned while interfacing
with the working group will increase participation.

**Clarifying development patterns**

It's no secret that Rust has plenty of web frameworks: Iron, Actix, Tower Web, and Gotham
(where I helped out a bit) each have code bases with unique priorities and
levels of maturity. Tide takes inspiration from prior art in the Rust ecosystem
and attempts to develop best practices while influencing development efforts on the
language itself.

**Providing real-world examples**

If I've done my job correctly, you will leave this talk inspired to contribute,
and equipped with proper tools. There is still much to be done in the Tide
ecosystem and we need support from the wider community.
{{% /note %}}

---

## What is Tide?

<ul>
  <li class="fragment">
    Tide is a modular framework for building web applications
  </li>
  <li class="fragment">
    It's a product from the web foundations team, part of the Rust 2018 Network
    Services Working Group (<code>WG-Net</code>)
  </li>
  <li class="fragment">
    Offers first-class support for <code>async/await</code> syntax (and
    upcoming <code>std::futures</code> support in <code>rustc</code>).
  </li>
</ul>


{{% note %}}
First, though, what is Tide?

Tide is a modular framework for building web applications. "Modular" being the
critical word in that sentence, because at this stage, we're still experimenting
with how Rust web frameworks should be designed.

The project was developed by the web foundations team, part of the Rust 2018
Network Services Working Group. (As of this presentation, Tide is maintained
by a group of roughly six people, a number I'd like to see grow.)

And lastly, Tide offers first-class support for `async/await` syntax, which is based
off upcoming support for Futures in the standard library (and is being developed by other
members of the working group).
{{% /note %}}

---

<p class="fragment">
  Tide's ultimate goal is <b>not</b> to develop a web framework.
</p>

{{% note %}}
One of the hardest things to do as an open source developer is communicate
intent. That's why I want to mention upfront that Tide's goal is *not* to create
a web framework.

I realize this may surprise you, but while Tide is a working product as of now,
the team behind it has a slightly more expansive vision than just building yet
another web framework. I consider the working group, and it's output, as an
experiment in creating development patterns and libraries that while originally
intended for Tide, can be re-used by other tools that are closer to Rust's
mainstream.

In other words, creating a framework is a way of process, rather than the
destination.

This means Tide will likely influence the future versions of Warp, Tower Web,
Gotham, Rocket, and web frameworks that haven't been developed yet.
{{% /note %}}

---

## Components

{{% note %}}
I'm almost ready to show you some code, but first, let's briefly run though the
projects that underpin Tide, and why each of them was build.
{{% /note %}}

---

<img
src="https://raw.githubusercontent.com/rust-lang-nursery/futures-rs/gh-pages/assets/images/futures-rs-logo.svg?sanitize=true"
width="400px">

## <a href="https://github.com/rust-lang-nursery/futures-rs"><code>futures-rs</code></a>

Provides base async types needed not only for Tide, but Tokio and other network
runtimes.

{{% note %}}
We begin at the base of our stack. Without Rust's implementation of Futures,
none of this matters. Futures provides async-aware types that power every layer
in the stack above it.

The Futures team is working hard to stabilize their APIs for inclusion in
Rust's standard library.
{{% /note %}}

---

## <a href="https://github.com/rustasync/http-service"><code>http-service</code></a>

Types and traits providing an interface between low-level server
implementations and services that use them.

{{% note %}}
Earlier, I mentioned several Rust web frameworks that predate Tide.
http-service is an integration layer between low-level server implementations
and the services that use them. If we choose to pursue our goal of creating
a middleware standard that will function with many http frameworks,
http-service will become even more crucial than it already is.
{{% /note %}}

---

## <a href="https://github.com/rustasync/runtime"><code>runtime</code></a>

An example of what first-class async programming would look like if implemented
in the Rust stdlib.

{{% note %}}
Runtime is a new project from Yoshua Wyuts, with the goal of demonstrating what
first-class async support would look like, if implemented in the Rust standard
library, that you can use now with nightly!

It provides a clutter-free runtime layer, sitting on top of runtime
implementations and async types, allowing anyone to begin experimenting with
async programs in rust immediately.
{{% /note %}}


---

## <a href="https://github.com/rustasync/tide"><code>tide</code></a>

Comprised of several crates, Tide is a providing ground for developments in
<code>http-service</code> and <code>futures-rs</code>. The goal is to remain
modular while providing a nice "out of the box" experience for newcomers, and
enabling everyone to build performant async http services.

{{% note %}}
And finally, Tide. Tide is the proving ground for many of the technologies
I mentioned before, which provides the working group with many opportunities to
refine user experience, and ultimately provide a nice "out of the box"
experience for anyone who wants to write async http services.
{{% /note %}}

---

# Demo

{{% note %}}
Now that we've discussed *why* Tide was built and the project's overarching
goals, let's dive into the code and build a small app with Tide. I mean, that's
what you all came for, to see Rust examples that only build on nightly, right?
{{% /note %}}

---

## 🚧 Under Construction 🚧

CFPx is a prototype application for managing your conference's CFP, powered by
Tide and the Rust Async ecosystem:

https://github.com/secretfader/cfpx

{{% note %}}
While small demos are educational, I understand if some of you need a larger
application to explore. Fortunately, I've begun work on CFPx, an experimental
project that will someday handle your conference's CFP, and is powered by Tide
and the Rust Async ecosystem.

Due to `async/await` related changes in core, it currently does not build.
However, I plan to patch it up in the next few days, unless someone with a
spirit of adventure gets to the repo first.
{{% /note %}}

---

## Roadmap

<ul>
  <li class="fragment">
    Authentication
  </li>
  <li class="fragment">
    Session handling
  </li>
  <li class="fragment">
    URL generation
  </li>
  <li class="fragment">
    Serving static files
  </li>
</ul>

{{% note %}}
If you've looked at Tide's repository, you may discover the framework is
missing a few pieces. I'm giving this talk exactly three weeks into our first
development sprint, and the code I already presented is very fresh.

We've made quite a bit of progress in the past weeks, specifically towards
stabilizing the framework's core, but we would still like to deliver
middlewares for authentication and session handling; URL generation facilities;
and a handler implementation for serving static files before this sprint is
over on May 2nd.

Generally speaking, I think we'll accomplish all of our goals.
{{% /note %}}

---

## Further Reading

<a
href="https://dev.to/gruberb/explained-how-does-async-work-in-rust-46f8">Explained:
how does async work in Rust? - @gruberb</a>

<a href="https://rustasync.github.io/team/2018/12/13/async-update.html">Async in
Rust, Circa 2018 - @aturon</a>

{{% note %}}
Before I go, let me share a few links in case you want to read more.

The first link I want to share is a post from Bastain Gruber, a fellow member of
the Network Services Working Group, titled "Explained: how does async work in
Rust?" It's a relatively short-but-in-depth review of Rust's async tooling, but also discusses
supporting components that are needed to implement async programming regardless
of language.

The second article I'd like to mention is more of a historical read. "Async in Rust, Circa 2018" was written by the
web foundations team lead, Aaron Turon. It was published in December, 2018,
which means (from a technical perspective) the subject matter may be slightly out of date.
I suggest reading it if only for the explanation of how the community designed Rust's
implementation of `async/await`.
{{% /note %}}

---

## Join Us!

https://github.com/rustasync

#wg-net-www (in Discord)

{{% note %}}
If anything I've said tonight interests you, please consider joining the Network Services
Working Group. I can honestly say you'd be joining at a very exciting time, because the initial
API for <code>std::futures</code> is on track to be stabilized in Rust version 1.36, which (according
to the GitHub milestone) is due around June 4.

Tide's core is stabilizing. While I wouldn't deploy it in critical production
scenarios (just yet), you won't be fighting major changes within the framework
itself. If you have a hobby project or a product that can function in alpha or
beta for the next few months, I believe Tide is worth investigating. And there
are many opportunities to contribute!

The working group meets Thursdays at 10am Mountain Time on Discord. Even if you
don't feel like you can actively contribute, show up and bring any questions.
You're all welcome.
{{% /note %}}

---

## Nicholas Young

secretfader.com

@secretfader

hi@secretfader.com

{{% note %}}
That's all I have.

My online home is secretfader.com, where I write about Rust, JavaScript,
accessibility, gear, and more. I'm also @secretfader on Twitter, GitHub, and most
anywhere else.

Thanks for your time.
{{% /note %}}
