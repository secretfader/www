import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const audienceId = "b5840c4f-4aa9-4c90-820e-6e283bb342a9";

const input = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

const handler = async ({ firstName, lastName, email }, ctx) => {
  const response = await resend.contacts.create({
    audienceId,
    firstName,
    lastName,
    email,
  });

  if (!response.data) {
    throw new ActionError({
      message: "Submission error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  return {
    ok: true,
    message: "Thank you, we will be in touch soon.",
  };
};

export const action = defineAction({
  input,
  handler,
});
