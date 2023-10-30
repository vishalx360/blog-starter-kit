import { AppProps } from 'next/app';
import '../styles/index.css';

import { Poppins } from "next/font/google";
const poppins = Poppins({
	weight: ["400", "500", "600",],
	display: "fallback",
	subsets: ["latin"]
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className={poppins.className}>
			<Component {...pageProps} />
		</div>
	)
}
