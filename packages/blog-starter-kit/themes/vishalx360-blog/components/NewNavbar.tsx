import LOGOIMAGE from "@/../public/images/icons/icon-72.png";
import AVATARIMAGE from "@/../public/images/vishal.png";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { cn } from "../lib/utils";
import Link from "next/link";

export const basePath = process.env.NEXT_PUBLIC_PORTFOLIO_URL || "";

const Items = [
  { title: "Experience", link: "/#experiencesection" },
  { title: "Projects", link: "/#projectssection" },
  { title: "Skills", link: "/#skillsection" },
  { title: "Achievements", link: "/#achievementsection" },
  { title: "Recommendations", link: "/#recommendationsection" },
  { title: "Blog", link: "/", alwaysActive: true, isTransparent: true },
  { title: "Contact", link: "/#contactsection", },
  { title: "Resume", link: "/resume.pdf", isExternal: true },
];

const linkMap = {
  "herosection": "vishalx360",
  "experiencesection": "Experience",
  "projectssection": "Projects",
  "skillsection": "Skills",
  "achievementsection": "Achievements",
  "recommendationsection": "Recommendations",
  "blogsection": "Blog",
  "contactsection": "Contact",
};

function Navbar({ activeSection }: { activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen((prev) => !prev);
  }
  const isActive = "#herosection" === `#${activeSection}`;

  return (
    <>
      <nav className="
    fixed flex items-center justify-between 
    gap-5 top-4  p-2 z-50 w-[92vw] md:w-fit left-1/2 transform -translate-x-1/2
    bg-brand-light/50 backdrop-blur-2xl
    rounded-full shadow-xl">
        <div className="w-10 h-10 relative">
          <Link className="" href={basePath + "/#herosection"}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, }}
                className="" >
                <Image
                  width={50}
                  height={50}
                  placeholder="blur"
                  src={AVATARIMAGE}
                  className={cn("z-20 absolute block border-2 rounded-full border-transparent hover:border-white/80 transition-colors duration-200", isActive && "border-white/60")}
                  alt="Vishalx360 Logo"
                />
              </motion.div>
            </AnimatePresence>
            <Image
              width={40}
              height={40}
              placeholder="blur"
              src={LOGOIMAGE}
              className={cn("z-10  block border-2 rounded-full border-transparent hover:border-white/80 transition-colors duration-200", isActive && "border-white/60")}
              alt="Vishalx360 Logo"
            />
          </Link>
        </div>
        <DesktopLinks activeSection={activeSection} />
        <a href={`#${activeSection}`} className="md:hidden font-bold uppercase text-sm text-white/95  whitespace-nowrap">{linkMap[activeSection]}</a>
        <button
          onClick={toggle}
          aria-label="Open Menu"
          className="p-2 md:hidden text-white/80 hover:text-white transition-colors duration-200"
        >
          <FiMenu className="text-[20px]" />
        </button>
        <AnimatePresence>
          {isOpen &&
            <MobileLinks isOpen={isOpen} toggle={toggle} activeSection={activeSection} />
          }
        </AnimatePresence>
      </nav>
    </>

  );
}
function MobileLinks({ isOpen, toggle, activeSection }: { isOpen: boolean, toggle: () => void, activeSection: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      exit={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-[70px] left-0 right-0 z-50 bg-brand-light shadow-xl backdrop-blur-2xl rounded-xl p-4 md:hidden"
    >
      <div className="flex flex-col items-start justify-center gap-5">
        {Items.map((item) => {
          const externalProps = item.isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

          const isActive = `/#${activeSection}` === item.link || item.alwaysActive;

          return (
            <div onClick={toggle} className="whitespace-nowrap" key={item.title}>
              <a
                href={item.isTransparent ? item.link : basePath + item.link}
                {...externalProps}
                className={cn("text-white text-sm font-semibold uppercase hover:text-accent transition-colors duration-200", isActive && "text-accent")}
              >
                {item.title}
              </a>
              {isActive && <motion.div layoutId="mob-nav-indicator" className="w-full h-0.5 bg-white rounded-full" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  )
}
function DesktopLinks({ activeSection }: { activeSection: string }) {
  return (
    <div className="hidden px-2 md:flex items-center justify-center gap-5">
      {Items.map((item) => {
        const externalProps = item.isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {};

        const isActive = `/#${activeSection}` === item.link || item.alwaysActive;

        return (
          <div className="whitespace-nowrap" key={item.title}>
            <a
              href={item.isTransparent ? item.link : basePath + item.link}
              {...externalProps}
              className={cn("text-white text-sm font-semibold uppercase hover:text-accent transition-colors duration-200")}
            >
              {item.title}
            </a>
            {isActive && <motion.div layoutId="nav-indicator" className="w-full h-0.5 bg-white/60 rounded-full" />}
          </div>
        );
      })}
    </div>
  )
}

export default Navbar;
