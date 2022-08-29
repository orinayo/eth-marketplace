/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: [
      "images-na.ssl-images-amazon.com",
      "thrangra.sirv.com",
      "images.ctfassets.net",
      "images.manning.com"
    ]
  }
}

module.exports = nextConfig
