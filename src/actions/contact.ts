import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

const webhook = import.meta.env.DISCORD_WEBHOOK;

const input = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

const handler = async ({ name, email, message }) => {
  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `${name} - ${email} - ${message}`,
      username: "Secret Fader Contact Form",
    }),
  });

  if (!response.ok) {
    throw new ActionError({ code: "INTERNAL_SERVER_ERROR" });
  }
};

export const action = defineAction({
  input,
  handler,
});
