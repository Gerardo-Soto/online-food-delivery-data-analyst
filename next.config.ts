const isProd = process.env.NODE_ENV === 'production'

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

module.exports = nextConfig