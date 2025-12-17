import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronsRight, LayoutDashboard, Star } from 'lucide-react'
import { Link } from "react-router-dom"
import { useUser, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function HeroSection() {
  const companiesLogo = [
    { name: "Framer", logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg", },
    { name: "Huawei", logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg", },
    { name: "Instagram", logo: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg", },
    { name: "Microsoft", logo: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg", },
    { name: "Walmart", logo: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg", }
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
      <header className="fixed -top-3 z-50 w-full">
        <nav
          className={`mx-auto mt-2 transition-all border-gray-200 duration-300 ${isScrolled
            ? "max-w-5xl md:rounded-b-2xl border bg-white/70 backdrop-blur-lg shadow-md"
            : "max-w-6xl pt-2"
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
                    className="rounded-full bg-[var(--primary)] px-8 p-2.5 text-sm text-white transition hover:opacity-90"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="rounded-full border border-gray-400 px-8 p-2.5 text-sm transition hover:bg-gray-100"
                  >
                    Login
                  </Link>

                </>
              ) : (
                <div className="flex gap-5 items-center">
                  <Link
                    to="/app"
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
              {menuOpen ? (
                <X className="w-7" />
              ) : (
                <Menu className="w-7" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden border-t border-gray-200 bg-white px-6 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
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
                    to="/login"
                    className="w-full rounded-full border border-gray-200 py-2 text-sm transition hover:bg-gray-100 block text-center"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/sign-up"
                    className="w-full rounded-full bg-[var(--primary)] py-2 text-sm text-white transition hover:opacity-90 block text-center"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div>

                  <UserButton />
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div id="home" className="relative mt-23 mb-15 flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
        <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-(--primary) blur-[100px] opacity-30"></div>

        {/* Avatars + Stars */}
        <div className="flex items-center mt-24">
          <div className="flex -space-x-3 pr-3">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
          </div>

          <div>
            <div className="flex ">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className="fill-(--primary) stroke-none w-4"></Star>
              ))}
            </div>
            <p className="text-sm text-gray-700">
              Used by 10,000+ users
            </p>
          </div>
        </div>

        {/* Headline + CTA */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
          Land your dream job with <span className=" bg-gradient-to-r from-indigo-700 to-indigo-600 bg-clip-text text-transparent text-nowrap">AI-powered </span> resumes.
        </h1>

        <p className="max-w-md text-center text-base my-7">Create, edit and download professional resumes with AI-powered assistance.

        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 ">
          <Link to='/app' className="bg-(--primary) gap-1 hover:bg-(--primary)/90 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-indigo-400 flex items-center transition-colors">
            <span>Get started</span>
            <ArrowRight className="w-4" />
          </Link>
          <Link to="/app" className="flex items-center gap-1 border border-slate-400 hover:bg-indigo-50 transition rounded-full px-7 h-12 text-slate-700">
            <LayoutDashboard className="w-4" />
            <span>Dashboard</span>
          </Link>
        </div>

        <p className="py-6 text-slate-600 mt-14 mb-5">Trusting by leading brands, including</p>

        <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

          <div className="flex marquee-inner will-change-transform max-w-5xl mx-auto">
            {[...companiesLogo, ...companiesLogo].map((company, index) => (
              <img key={index} className="mx-11" src={company.logo} alt={company.name} />
            ))}
          </div>

          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </>
  )
}
