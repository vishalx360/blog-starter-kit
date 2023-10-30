// import { useAppContext } from './contexts/appContext';
import AVATARIMAGE from "@/../public/images/vishal.png";

import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { basePath } from "./NewNavbar";

export const Footer = () => {
	return (
		<>
			<div className="group grid place-items-center px-5 text-center py-10 w-full">
				<Link
					href={basePath}
					className={"flex items-center gap-5 text-gray-200 group-hover:text-accent"}
				>
					{/* <p className="text-sm">Author and Creator</p> */}

					<Image
						width={40}
						height={40}
						placeholder="blur"
						src={AVATARIMAGE}
						className={"z-20  block border-2 rounded-full border-transparent group-hover:border-white/80 transition-colors duration-200"}
						alt="Vishalx360 Logo"
					/>
					<p className="text-sm">Vishal Kumar</p>
					<FiExternalLink />
				</Link>
			</div>
			<div className="h-5 w-full bottom-0 bg-black/20 shadow-lg" />
		</>

	);
};
