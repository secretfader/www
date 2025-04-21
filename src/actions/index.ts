import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const audienceId = "b5840c4f-4aa9-4c90-820e-6e283bb342a9";
const from =
  import.meta.env.RESEND_FROM || `Nicholas Young <hello@secretfader.com>`;

const emailRegistration = defineAction({
  accept: "form",
  input: z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string(),
    callback: z.string().optional(),
  }),
  handler: async ({ firstName, lastName, email, callback }) => {
    const resendClient = new Resend(import.meta.env.RESEND_API_KEY);

    // Register the user for an email list, and optionally,
    // send the DaVinci Resolve HDR Guide.
    const contact = await resendClient.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      audienceId,
    });

    if (callback === "sendResolveHDRGuide") {
    }
  },
});

export const server = {};
