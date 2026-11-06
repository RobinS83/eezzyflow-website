import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Next internals, metadata routes and files with an extension.
  matcher: ["/((?!_next|_vercel|.*\\..*|opengraph-image|icon|apple-icon).*)"],
};
