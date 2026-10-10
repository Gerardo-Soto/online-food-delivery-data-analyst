/*const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,

  basePath: isProd
    ? '/online-food-delivery-dashboard'
    : '',

  assetPrefix: isProd
    ? '/online-food-delivery-dashboard/'
    : '',

  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig*/

import type { NextConfig } from "next";

const repoName = "online-food-delivery-data-analyst";

const isGitHubActions =
  process.env.GITHUB_ACTIONS === "true";

const basePath = isGitHubActions
  ? `/${repoName}`
  : "";

const nextConfig: NextConfig = {
  output: "export",

  trailingSlash: true,

  basePath,

  assetPrefix: basePath,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;