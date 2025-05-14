export function slugify(input: string) {
  input = input.replace(/^\s+|\s+$/g, ""); // trim whitespace
  input = input.toLowerCase(); // convert to lowercase
  input = input
    .replace(/[^a-z0-9 -]/g, "") // remove non alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-");

  return input;
}
