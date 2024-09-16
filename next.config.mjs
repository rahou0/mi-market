// eslint-disable-next-line import/extensions
await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ["mi-market-dev.23378f3a053665b54e78d946aefeb082.r2.cloudflarestorage.com"],
	},
};

export default nextConfig;
