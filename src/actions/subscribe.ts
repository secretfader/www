import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY || "re_example");
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

  const lutsURL =
    "https://content.secretfader.com/luts/hdr-st-2084-sdr-rec-709-2025-05-27.zip";

  const message = `
    Hey, ${firstName},

    Nicholas, here. I have the LUTs I promised, in exchange for your subscription. Thanks for that, by the way.

    If you have any questions, just hit reply.

    ${lutsURL}
    `;

  await resend.emails.create({
    to: [email],
    from: `Nicholas Young <hi@secretfader.com>`,
    subject: `The LUTs You Requested`,
    text: message,
  });

  return {
    ok: true,
    message: "Thank you, we will be in touch soon.",
  };
};

export const action = defineAction({
  input,
  handler,
});
