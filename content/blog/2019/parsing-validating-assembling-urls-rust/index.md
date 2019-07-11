+++
authors = ["Nicholas Young"]
category = ["rust", "hacking"]
date = "2019-01-08T13:46:23Z"
draft = false
layout = "post"
slug = "parsing-validating-assembling-urls-rust"
summary = "Why you should care about type-safe concepts instead of assembling string fragments.\n"
title = "Parsing, Validating, and Assembling URLs in Rust"

+++

These days, we hardly think about URLs. Popular content management tools
[default to so-called "pretty" slugs][default-pretty], and even here, on
secretfader.com, I [remove stop-words][stop-words] to ensure the tidiest, most
SEO-friendly URLs possible.

It would be easy to forget the struggles that led to best
practices of today's web. However, to my generation of
internet hackers, URLs riddled with ampersands and question
marks were entirely normal. In those days, assuming URLs would
be comprised of hyphenated alphanumeric characters was
obviously unsafe; instead, we learned the [official standard
for parsing and constructing URLs][url-standard].

The world of software engineering is full of topics that become unexpectedly
complex as you move deeper, and URLs are one of them. I don't claim to remember
the entire specification, but I'll mention that simply concatenating strings
is, at least, a frustrating method for constructing paths in your application
or library. At worst, it can make your application insecure.

Recently, I was pleased to discover Rust's [URL crate][url-crate], which makes
parsing, validating, and formatting URLs (and their components), a simple, if
not enjoyable task.

## Understanding URLs

Let's begin with a common task. Suppose we're developing a library that provides
a human-friendly interface to HTTP APIs. In our example case (and in the library
I'm currently developing), our primary interface, `APIClient`, can be
instantiated by providing a string reference containing the protocol, host, and
optionally, a port:

{{< highlight rust >}}
struct APIClient {
  host: Url,
}

impl APIClient {
  pub fn new(host: &str) -> Result<Self, Error> {
    APIClient {
      host: Url::parse(host)?,
    }
  }
}
{{< /highlight >}}

This implementation is relatively simple, and yet begs us to question: [how does
our library know the string reference provided is a legitimate
URL?][playground-parse] Look closely, and you'll notice we're now processing
the `host` parameter through [`Url::parse`][url-crate], which [will return
`Err`][playground-error] if provided with an invalid URL.

Consumers of our library can now initialize `APIClient` with code that looks
something like this:

{{< highlight rust >}}
let client = APIClient::new("https://example.com:8080")?;
{{< /highlight >}}

Considering the sample code above, if we were to provide an invalid host
specification (for instance, [omitting the protocol][playground-error] or
forgetting to separate the hostname and port number with a colon),
`APIClient::new` would return an `Err`.

In one line of code, we've dramatically improved the experience for API
consumers, much more so than if we'd attempted to store the incoming string
reference as is was.

Were this the end of our example, I'd consider the improvements for library
consumers a success. Still, I'm compelled to ask whether we can extend
conveniences to us as the library author. How does validating proper URL
structure help ensure correctness as we add functionality?

Take a look at the hypothetical method `post`. Despite being mostly
fake, this sample implementation illustrates a hurdle that most HTTP-related
libraries will need to overcome: assembling paths and variables into a request
before they're sent to the HTTP endpoint.

{{< highlight rust >}}
impl APIClient {
  fn post(self, path: &str, vars: Option<&Vars>)
    -> Result<Value, Error>
  {
    let url = self.host.join(path)?;
    let res = self.client
      .post(url)
      .body(vars)
      .send()?;
    Ok(res)
  }
}
{{< /highlight >}}

Because `self.host` (the base URL our library consumed earlier during
initialization) is an instance of [`Url`][url-crate] rather than a `String` or
reference, we're able to easily append URL components using the
[`join`][url-crate-join] method. If a provided fragment is invalid, the caller
will receive `Err`. (One brief programming note: `self.client` is merely an
implementation detail and can be safely ignored. I modeled the call chain after
the popular HTTP client, [reqwest][reqwest], though.)

## Explore For Yourself

I've only scratched the surface of APIs provided by the [URL
crate][url-crate]. I urge you to explore for yourself, as it
makes working with this web standard a bit easier.

Until we have a replacement that improves on the URL
standard, web technologists will have a continual need to
parse, validate, and reassemble URLs from their components. I expect this
crate will remain a staple of my web-facing projects for a long while.

If you want to suggest a crate I should write about, I'm
listening on [Twitter][twitter] and [Mastodon][mastodon]. Keep rusting.

---

Special thanks to my friend [J Haigh](https://twitter.com/DebugSteven) for
proofreading assistance on this post.

[playground-parse]:
https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=62d44913be331834cf1829ea507953f5
[playground-error]:
https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=66476252c8ec17e59b26da911b30253d
[stop-words]: https://en.wikipedia.org/wiki/Stop_words
[default-pretty]: https://en.wikipedia.org/wiki/Clean_URL
[url-standard]: https://www.w3.org/TR/url/
[qs]: https://en.wikipedia.org/wiki/Query_string
[reqwest]: https://docs.rs/reqwest/
[url-crate]: https://docs.rs/url/
[url-crate-join]: https://docs.rs/url/1.7.2/url/struct.Url.html#method.join
[twitter]: https://twitter.com/secretfader
[mastodon]: https://mastodon.social/@secretfader
