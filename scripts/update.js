import ky from "ky";
import matter from "front-matter";
import yaml from "js-yaml";
import fs from "fs";

const files = fs.readdirSync(
  "../src/content/podcasts/inside-the-machine/episodes",
);

async function main() {
  for (let file of files) {
    const fsx = await fs.promises.readFile(
      "../src/content/podcasts/inside-the-machine/episodes/" + file,
    );

    let fx = matter(fsx.toString());

    fx.attributes.assets = fx.attributes.assets.filter(
      (a) => a.format === "mp3",
    );

    let res = await ky.head(
      "https://dn721806.ca.archive.org/0/items/machinefm/" +
        fx.attributes.assets[0].filename,
    );
    fx.attributes.assets[0].length = parseInt(
      res.headers.get("content-length"),
    );

    let output = "";
    output += "---\n" + yaml.dump(fx.attributes) + "---\n" + fx.body;

    await fs.promises.writeFile(
      `./episodes/${fx.attributes.number}.md`,
      output,
    );
  }
}

main().then(console.log).catch(console.error);
