const ANALYTICS_BASE_URL = 'https://hn-ping2.hashnode.com';
const ADVANCED_ANALYTICS_BASE_URL = 'https://stats.hashnode.com';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL;

const getBasePath = () => {
	if (BASE_URL && BASE_URL.indexOf('/') !== -1) {
		return BASE_URL.substring(BASE_URL.indexOf('/'));
	}
	return undefined;
};

/**
 * @type {import('next').NextConfig}
 */
const config = {
	transpilePackages: ['@starter-kit/utils'],
	basePath: getBasePath(),
	experimental: {
		scrollRestoration: true,
	},
	// ignore build errors
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/ping/data-event',
				destination: `${ANALYTICS_BASE_URL}/api/data-event`,
			},
			{
				source: '/ping/view',
				destination: `${ANALYTICS_BASE_URL}/api/view`,
			},
			{
				source: '/api/collect',
				destination: `${ADVANCED_ANALYTICS_BASE_URL}/api/collect`,
			},
		];
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: `${PORTFOLIO_URL}/blog`, // Matched parameters can be used in the destination
				permanent: true,
			},
			{
				source: '/:slug*',
				destination: `${PORTFOLIO_URL}/blog/:slug*`, // Matched parameters can be used in the destination
				permanent: true,
			},
		];
	},
};

module.exports = config;
