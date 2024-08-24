// eslint-disable-next-line import/extensions
await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["curie.pnnl.gov"], // Add other domains as needed
	},
};

export default nextConfig;
