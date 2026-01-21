import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronsRight,
  LayoutDashboard,
  LayoutTemplate,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import Logo from "../Logo";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function HeroSection() {
  const companiesLogo = [
    {
      name: "Framer",
      logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    },
    {
      name: "Huawei",
      logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    },
    {
      name: "Instagram",
      logo: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    },
    {
      name: "Microsoft",
      logo: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    },
    {
      name: "Walmart",
      logo: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn, user } = useUser(); // live user state

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <nav
          className={`mx-auto md:mt-2  max-w-6xl transition-all duration-300 ${
            isScrolled
              ? "md:rounded-xl md:border border-b border-slate-200 bg-white/80 backdrop-blur-lg shadow-lg"
              : "pt-2 border border-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 bg-white md:bg-transparent">
            {/* Logo */}
            <Logo />
            {/* Desktop Menu */}
            <ul className="hidden gap-8 text-sm  md:flex">
              {menuItems.map((item) => (
                <li key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className="text-slate-900 transition hover:text-[var(--primary)]"
                  >
                    {item.name}
                  </a>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[var(--primary)] transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            {/* Desktop Buttons */}
            <div className="hidden gap-3 md:flex items-center">
              {!isSignedIn ? (
                <>
                  <Link
                    to="/register"
                    className="rounded-full bg-[var(--primary)] px-7 py-2.5 text-sm text-white
             font-medium transition hover:opacity-90"
                  >
                    Get Started Free
                  </Link>

                  <Link
                    to="/login"
                    className="rounded-full px-6 py-2.5 text-sm text-slate-600
             hover:text-slate-900 transition"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div className="flex gap-5 items-center">
                  <Link
                    to={user ? `/app` : `/register`}
                    className="rounded-full bg-[var(--primary)] px-7 py-2 text-sm text-white transition hover:opacity-90"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-7" /> : <Menu className="w-7" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden border-t border-gray-200 bg-white px-6 transition-all duration-300 overflow-hidden ${
              menuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-5 pt-6">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block text-gray-600 hover:text-[var(--primary)] transition"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              {!isSignedIn ? (
                <>
                  <Link
                    to="/register"
                    className="w-full rounded-full bg-[var(--primary)] py-2.5 text-sm
             text-white transition hover:opacity-90 block text-center"
                  >
                    Get Started Free
                  </Link>

                  <Link
                    to="/login"
                    className="w-full rounded-full border border-gray-200 py-2.5 text-sm
             transition hover:bg-gray-100 block text-center"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div className="flex gap-5 items-center">
                  <Link
                    to={user ? `/app` : `/register`}
                    className="rounded-full w-full text-center bg-[var(--primary)] px-7 py-2.5 text-sm text-white transition hover:opacity-90"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <svg
        className="size-full absolute -z-1 inset-0 blur-[1px] opacity-100"
        width="1440"
        height="720"
        viewBox="0 0 1440 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="#E2E8F0" strokeOpacity=".7" d="M-15.227 702.342H1439.7" />
        <circle
          cx="711.819"
          cy="372.562"
          r="308.334"
          stroke="#E2E8F0"
          strokeOpacity=".7"
        />
        <circle
          cx="16.942"
          cy="20.834"
          r="308.334"
          stroke="#E2E8F0"
          strokeOpacity=".7"
        />
        <path
          stroke="#E2E8F0"
          strokeOpacity=".7"
          d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7"
        />
        <circle
          cx="782.595"
          cy="411.166"
          r="308.334"
          stroke="#E2E8F0"
          strokeOpacity=".7"
        />
      </svg>
      <div
        id="home"
        className="max-w-6xl m-auto relative mt-23  flex flex-col items-center justify-center text-sm px-4 text-black"
      >
        <div className=" mt-14 flex flex-wrap items-center justify-center p-1.5 rounded-full  border-slate-400 text-gray-500 text-xs">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="fill-(--primary) stroke-none w-4"
                  ></Star>
                ))}
            </div>
            <p className="text-sm text-gray-700">
              Trusted by 10,000+ job seekers
            </p>
          </div>
        </div>

        {/* Headline + CTA */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-3xl text-center mt-4 md:leading-[70px]">
          Make a <span className="highlightedText">Professional</span>{" "}
          <span className="highlightedText">Resume</span> in Minutes
        </h1>

        <p className="max-w-md text-center text-base my-7">
          Build, edit, and download professional resumes in minutes. AI-guided
          suggestions make sure your experience shines.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 ">
          <Link
            to={user ? `/app` : `/register`}
            className="flex items-center gap-2 bg-(--primary) hover:bg-(--primary)/90 text-white active:scale-95 rounded-md px-7 h-11"
          >
            <span>Build Resume</span>
            <ArrowRight className="w-4" />
          </Link>
          <button
            onClick={() => {
              document
                .getElementById("templates")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 border border-slate-300
             hover:bg-slate-100 transition text-slate-700 cursor-pointer
             rounded-md px-6 h-11"
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>See Templates</span>
          </button>
        </div>

        <div
          className="relative mt-12 w-full max-w-6xl rounded-xl
                border border-slate-200 bg-white
                shadow-xl overflow-hidden"
        >
          <img
            src="/images/builder-preview.jpg"
            className="w-full"
            alt="Resume Builder Preview"
          />
        </div>
      </div>
    </>
  );
}
