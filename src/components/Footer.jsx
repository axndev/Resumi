import React from 'react'
import { useLocation } from 'react-router-dom';
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Send,
} from 'lucide-react'
import Logo from './Logo'

const links = [
  {
    group: 'Product',
    items: ['Features', 'Customers', 'Help', 'About'],
  },
  {
    group: 'Company',
    items: ['About', 'Careers', 'Blog', 'Press', 'Contact'],
  },
]

export default function Footer() {
  const location = useLocation();
  const maxWidthClass = location.pathname === '/' ? 'max-w-6xl' : 'max-w-7xl';
  return (
    <footer className="relative bg-gradient-to-r from-white via-[#B3BCF9]/90 to-white">
      {/* divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--primary)/40 to-transparent" />

      {/* MIDDLE */}
      <div className={`${maxWidthClass} mx-auto px-6 pt-20 md:pb-30 pb-15`}>
        <div className="grid gap-12 md:grid-cols-3">
          {/* BRAND + SOCIAL */}
          <div className="space-y-5 ">
            <div>
              <Logo />
              <p className="mt-2 max-w-xs text-sm text-gray-700 mt-3">
                No design skills needed, just powerful tool to create resumes recruiters actually notice.
              </p>
            </div>

            <div className="flex gap-4 text-gray-700">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="transition hover:text-black"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-8 ">
            {links.map((section) => (
              <div key={section.group} className="space-y-3">
                <h4 className="font-medium text-gray-900">
                  {section.group}
                </h4>

                {section.items.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="block text-gray-700 transition text-[13px] hover:text-black"
                  >
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* NEWSLETTER (replaced Legal) */}
          <form className="space-y-2" action="https://formspree.io/f/xpqanvvn"
            method="POST">
            <div>
              <label className="block font-semibold text-gray-900">
                Contact us
              </label>
              <p className="text-[13px] text-gray-600 mt-2">
                Have a question or feedback? We’d love to hear from you.
              </p>
            </div>

            <div className="relative mt-3">
              <textarea
                rows={3}
                required
                name="message"
                placeholder="Write your message…"
                className="w-full resize-none rounded-lg border border-gray-200 bg-white/60 px-3 py-2 pr-12 text-[13px] text-gray-900 outline-none transition focus:border-(--primary)/20 focus:ring-2 focus:ring-(--primary)/20"
              />

              <button
                type="submit"
                aria-label="Send message"
                className="absolute right-2 cursor-pointer bottom-0 -translate-y-1/2 flex h-8 px-3 gap-2 items-center justify-center rounded-md bg-(--primary) text-white transition hover:opacity-90 active:scale-95"
              >
                <span className='text-xs'>Submit</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* BOTTOM */}

      <div className=" relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--primary)/40 to-transparent" />
        <div className={`${maxWidthClass} mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm`}>
          <span className="text-gray-700">
            © {new Date().getFullYear()} Resumi. All rights reserved.
          </span>

          {/* LEGAL LINKS */}
          <div className="flex flex-wrap gap-4 text-gray-700">
            {['License', 'Privacy', 'Cookies', 'Security'].map((item) => (
              <a
                key={item}
                href="#"
                className="transition hover:text-black"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
