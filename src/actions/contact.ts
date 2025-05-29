import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

const input = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

const handler = async ({ name, email, message }, ctx) => {
  const response = await fetch(ctx.locals.runtime.env.DISCORD_WEBHOOK, {
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
    throw new ActionError({
      message: response.statusText,
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  return {
    ok: true,
    message: "Thanks for submitting the form.",
  };
};

export const action = defineAction({
  input,
  handler,
});
