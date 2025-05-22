import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

const input = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

const handler = async (input) => {
  console.log(input);
};

export const action = defineAction({
  input,
  handler,
});
