import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const extension = context.originPathname.slice(-3);

  if (extension && extension.toLowerCase() === "xml" && import.meta.env.DEV) {
    response.headers.set("X-Content-Type-Options", "nosniff");
  }

  return new Response(await response.text(), {
    status: 200,
    headers: response.headers,
  });
});
