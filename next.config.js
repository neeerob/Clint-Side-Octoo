// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = {
//   images: {
//     formats: ['image/avif', 'image/wepb'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'server-octoo-shop-production.up.railway.app',
//         port: '3000',
//       },
//     ],
//   },
//   nextConfig
// }


// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = {
//   ...nextConfig,
//   images: {
//     formats: ['image/avif', 'image/webp'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'server-octoo-shop-production.up.railway.app',
//         port: '3000',
//       },
//     ],
//   },
// }


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}


module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server-octoo-shop-production.up.railway.app',
        port: '3000',    
      },
    ],
  },
  nextConfig
}
