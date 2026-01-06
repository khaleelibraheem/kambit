import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Logo from "../shared/logo";
import { usePathname } from "next/navigation";

const footerLinks = {
  trade: [
    { name: "Buy & Sell Crypto", href: "/trade" },
    { name: "Market Prices", href: "/prices" },
    { name: "Naira Wallet", href: "/dashboard/wallet" },
    { name: "Liquidity Solutions", href: "/business" },
  ],
  company: [
    { name: "About Kambit", href: "/about" },
    { name: "Security", href: "/security" },
    { name: "Compliance", href: "/compliance" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Trading Policy", href: "/trading-policy" },
    { name: "AML/KYC", href: "/compliance" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on auth and admin pages
  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-[12px] transition-colors duration-300">
      <div className="container px-4 mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="inline-block mb-6">
              <Logo />
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md leading-relaxed">
              Kambit is Nigeria&apos;s leading platform for instant crypto-to-Naira 
              settlements. Trade BTC, USDT, ETH, and SOL securely with 
              competitive market rates and institutional-grade protection.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all shadow-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-5 uppercase tracking-widest text-[11px]">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 dark:text-slate-500 font-medium">
              © {new Date().getFullYear()} Kambit. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/privacy"
                className="text-slate-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-slate-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-slate-500 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}