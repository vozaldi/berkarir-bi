import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pejuang.berkarirasn.id',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'berkarir-bi.vercel.app',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'lms.pekade.my.id',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'asn.pekade.my.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    // implementation: 'sass-embedded',
    silenceDeprecations: [
      'legacy-js-api', 'import', 'mixed-decls', 'color-functions', 'global-builtin'
    ],
  },
};

export default nextConfig;
