import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { experimental_AstroContainer } from "astro/container";
import { Resend } from "resend";
import LutsTemplate from "../emails/LUTs.astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const audienceId = "b5840c4f-4aa9-4c90-820e-6e283bb342a9";

const input = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  afterAction: z.string().optional(),
});

const handler = async ({ firstName, lastName, email, afterAction }, ctx) => {
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

  if (afterAction && afterAction === "luts") {
    const container = await experimental_AstroContainer.create();

    const html = await container.renderToString(LutsTemplate, {
      props: { firstName },
    });

    const send = await resend.emails.send({
      from: `Nicholas Young <hi@secretfader.com>`,
      to: [email],
      subject: `Download your HDR to SDR LUTs`,
      html,
    });

    if (send.error) {
      throw new ActionError({
        message: "Send error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
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
