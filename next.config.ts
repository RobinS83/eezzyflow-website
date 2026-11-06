import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Fully static: `next build` writes plain HTML to out/, which any host can
// serve (Netlify now; nothing ties the site to one host). Security headers
// live in netlify.toml because a static export has no server to send them.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
