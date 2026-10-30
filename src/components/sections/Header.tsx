import { useState } from "react";
import { motion } from "framer-motion";
import { useActiveSection, useScrolled } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";
import { MenuOverlay } from "@/components/sections/MenuOverlay";
import {
  InstagramIcon,
  YoutubeIcon,
  XIcon,
} from "@/components/ui/Icons";
import { NAV, SOCIALS } from "@/lib/content";

const NAV_IDS = NAV.links.map((l) => l.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);
  const activeId = useActiveSection(NAV_IDS);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-b border-white/15 bg-[rgba(2,91,134,0.28)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] lg:h-[76px] max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Desktop Nav Links */}
          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-[60px] text-[12px] capitalize">
              {NAV.links.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`link-underline transition-all duration-300 ${
                        isActive
                          ? "font-bold text-white opacity-100"
                          : "text-white opacity-70 hover:opacity-100"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Desktop Socials + Mobile Menu Trigger */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-[17px]">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={soc.name}
                  className="flex size-[38px] items-center justify-center rounded-full border border-white/29 text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:text-deep"
                >
                  {soc.name === "Instagram" && <InstagramIcon className="size-4" />}
                  {soc.name === "YouTube" && <YoutubeIcon className="size-4" />}
                  {soc.name === "X" && <XIcon className="size-4" />}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={NAV.mobileTrigger}
              className="group flex items-center gap-2.5 rounded-full border border-white/29 px-4 py-2 text-[12px] uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white/10 lg:hidden"
            >
              <span>{NAV.mobileTrigger}</span>
              <div className="flex flex-col gap-1 w-4">
                <span className="block h-px w-full bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-1/2" />
                <span className="block h-px w-2/3 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu Overlay Component */}
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
