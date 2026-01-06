"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/register", label: "Sign up" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link href="/home" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-[0.25em] uppercase text-zinc-300">
            Showspree
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-xs sm:text-sm">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1 transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "text-zinc-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
