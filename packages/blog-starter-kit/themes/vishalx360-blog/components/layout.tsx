import { PagesProgressBar } from 'next-nprogress-bar';
import BGElements from './BGElements';
import Navbar from './NewNavbar';
import ScrollToTopButton from './ScrollToTopButton';
import { Analytics } from './analytics';
import { Footer } from './footer';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			<div className="min-h-screen  text-white bg-[#051d19]">
				<PagesProgressBar height="2px" color="#00a88a" options={{ showSpinner: false }} shallowRouting />
				<Navbar activeSection='blogsection' />
				<main className='z-10'>
					{children}
				</main>
				<BGElements />
				<ScrollToTopButton />
				<Footer />
			</div>
			<Analytics />
			<Integrations />
		</>
	);
};
