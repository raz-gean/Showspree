"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeSectionProps = {
  children: ReactNode;
  className?: string;
};

function FadeSection({ children, className = "" }: FadeSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`section-fade ${visible ? "section-fade-visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export default function HomePage() {
  const showcaseMovies = [
    {
      title: "Hobs & Shaw",
      src: "/images/action.jpg",
      description: "Brixton Lorr is a cybernetically enhanced soldier who possesses superhuman strength",
    },
    {
      title: "Tron",
      src: "/images/sci-fi.jpg",
      description: "am (Garrett Hedlund), the son of famous video-game developer Kevin Flynn (Jeff Bridges), has been haunted for a long time by his father's mysterious disappearance.",
    },
    {
      title: "The Notebook",
      src: "/images/romance.jpg",
      description: "In the 1940s South Carolina, mill worker Noah Calhoun (Ryan Gosling) and rich girl Allie (Rachel McAdams) are desperately in love. But her parents don't approve.",
    },
    {
      title: "Comedy Island",
      src: "/images/comedy.jpg",
      description: "Seven comedians, actors and social media celebrities get washed upon the shores of a mysterious island.",
    },
  ];

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center overflow-hidden text-center text-zinc-50 bg-black">
      {/* HERO */}
      <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center landing-gradient animate-fade-in">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_10%_0,rgba(255,255,255,0.3)_0,transparent_55%),radial-gradient(circle_at_90%_100%,rgba(255,255,255,0.15)_0,transparent_55%)]" />
        <div className="max-w-3xl px-6 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-200/80 backdrop-blur-md mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Streaming, reimagined
          </div>

          <h1 className="title-glow text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-slate-50 select-none">
            Showspree
          </h1>

          <p className="mx-auto max-w-xl text-sm sm:text-base md:text-lg text-zinc-300/90 leading-relaxed">
            A minimal, fast movie hub where your next favorite film finds you.
            Built for clean design today, and smart recommendations tomorrow.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/movies"
              className="group relative overflow-hidden rounded-full border border-white/10 bg-white text-black px-6 py-2.5 text-sm font-semibold tracking-wide shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="relative z-10">Start browsing</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-black/10 via-black/30 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100" />
            </Link>

            <Link
              href="/register"
              className="group rounded-full border border-white/20 bg-black/60 px-5 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-black/80 hover:text-white"
            >
              <span className="relative inline-flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 group-hover:text-zinc-200">
                  New here?
                </span>
                <span className="h-px w-6 bg-zinc-500/70 group-hover:w-10 group-hover:bg-white transition-all" />
                <span className="text-sm font-semibold">Create account</span>
              </span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-[11px] text-zinc-500/80">
            <span className="h-px w-10 bg-zinc-700/70" />
            <span className="uppercase tracking-[0.25em]">Action - Mystery - Thrill</span>
            <span className="h-px w-10 bg-zinc-700/70" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FadeSection className="relative z-10 flex min-h-screen w-full items-center justify-center text-left bg-zinc-900">
        <div className="w-full max-w-5xl px-6 py-16 md:py-24 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4 max-w-md">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase text-zinc-400">
              Why Showspree
            </h2>
            <p className="text-3xl md:text-4xl font-medium leading-snug text-zinc-50">
              A calm, focused movie space without the clutter.
            </p>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Showspree is built to be fast, minimal and smart. No endless
              menus, no chaos 40 just sharp picks tuned for what you love
              to watch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="border border-zinc-800 bg-black/50 px-4 py-5 rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
                Precision
              </p>
              <p className="font-medium mb-1">Signal over noise</p>
              <p className="text-xs text-zinc-400">
                Clean layouts and focused lists keep your next movie
                one glance away.
              </p>
            </div>

            <div className="border border-zinc-800 bg-black/50 px-4 py-5 rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
                Smart Core
              </p>
              <p className="font-medium mb-1">Ready for AI recs</p>
              <p className="text-xs text-zinc-400">
                Designed from day one to plug into advanced
                recommendation microservices.
              </p>
            </div>

            <div className="border border-zinc-800 bg-black/50 px-4 py-5 rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
                Always Light
              </p>
              <p className="font-medium mb-1">Minimal & fast</p>
              <p className="text-xs text-zinc-400">
                A lean interface, optimized for speed on both desktop
                and mobile.
              </p>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* JOIN US / SHOWCASE SECTION */}
      <FadeSection className="relative z-10 flex min-h-screen w-full items-stretch justify-center text-left bg-zinc-950">
        <div className="w-full max-w-5xl px-6 py-16 md:py-24 flex flex-col justify-between gap-10">
          <div className="space-y-4 max-w-md">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase text-zinc-400">
              Join us
            </h2>
            <p className="text-3xl md:text-4xl font-medium leading-snug text-zinc-50">
              Amazing movies, curated for your late nights.
            </p>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              From cult classics to fresh drops 40 build a watchlist that
              actually feels like yours.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/movies"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.9)]"
              >
                Watch now
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4">
            {showcaseMovies.map((movie) => (
              <div
                key={movie.title}
                className="group relative h-55 sm:h-65 md:h-80 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition-all duration-300 ease-out sm:flex-1"
              >
                <div className="relative h-full w-full transition-all duration-300 ease-out">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(255,255,255,0.25)_0,transparent_55%),radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.18)_0,transparent_55%)] opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div
                      className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-80 group-hover:opacity-100 transform transition duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${movie.src})` }}
                    />
                    {/* Darken more on hover for readability */}
                    <div className="absolute inset-0 bg-black/60 sm:bg-black/70 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Centered description on hover */}
                    <div className="absolute inset-0 flex items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm sm:text-base md:text-lg text-zinc-100 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {movie.description}
                      </p>
                    </div>

                    {/* Title pinned to bottom, stays visible */}
                    <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-1">
                        Title
                      </p>
                      <p className="text-sm font-semibold text-zinc-50 truncate">
                        {movie.title}
                      </p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* DOWNLOAD APP SECTION */}
      <FadeSection className="relative z-10 flex min-h-[60vh] w-full items-center justify-center bg-black">
        <div className="w-full max-w-5xl px-6 py-16 md:py-20 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-left">
          <div className="space-y-4 max-w-md">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase text-zinc-400">
              Watch on your phone
            </h2>
            <p className="text-3xl md:text-4xl font-medium leading-snug text-zinc-50">
              Showspree, one thumb away.
            </p>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Pick up where you left off, queue late-night favorites and keep
              your watchlist synced across devices with the Showspree mobile app.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white text-black px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.9)]">
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-black/70">
                    Download on the
                  </span>
                  <span className="text-sm">App Store</span>
                </span>
              </button>

              <button className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-zinc-900">
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                    Get it on
                  </span>
                  <span className="text-sm">Google Play</span>
                </span>
              </button>
            </div>
          </div>

          <div className="w-full max-w-xs md:max-w-sm rounded-3xl border border-zinc-800 bg-linear-to-b from-zinc-900/70 to-black/80 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.9)]">
            <div className="aspect-9/19 w-full relative rounded-2xl border border-zinc-700 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/sci-fi.jpg)" }}
              />

              {/* Strong dark overlay for readability */}
              <div className="absolute inset-0 bg-black/70" />

              <div className="relative h-full w-full bg-[radial-gradient(circle_at_20%_0,rgba(255,255,255,0.12)_0,transparent_55%),radial-gradient(circle_at_80%_100%,rgba(0,0,0,0.9)_0,transparent_55%)] flex flex-col justify-between">
                <div className="p-4 flex items-start justify-between text-[11px] text-zinc-200">
                  <span className="uppercase tracking-[0.22em] text-zinc-100">Showspree</span>
                  <span className="text-zinc-300">9:41</span>
                </div>
                <div className="px-4 pb-5 space-y-3 text-left">
                  <p className="text-xs text-zinc-300 uppercase tracking-[0.22em]">
                    Continue watching
                  </p>
                  <p className="text-sm font-semibold text-zinc-50">
                    Tron b7 32 min left
                  </p>
                  <div className="mt-2 h-1 w-32 rounded-full bg-zinc-700/80">
                    <div className="h-full w-20 rounded-full bg-zinc-50" />
                  </div>
                  <p className="mt-4 text-[11px] text-zinc-200">
                    Tron is waiting on your phone. Install the Showspree app
                    and keep your nights in sync.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-5xl px-6 border-t border-zinc-900 pt-6 pb-4 text-[11px] text-zinc-500 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-black">
        <div className="flex items-center gap-2 text-left">
          <span className="font-semibold tracking-[0.25em] uppercase text-zinc-400">
            Showspree
          </span>
          <span className="h-px w-6 bg-zinc-700" />
          <span>Minimal movie hub</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-start sm:justify-end">
          <span className="text-zinc-500/80">
            Gean T. Raz
          </span>
          <span className="hidden h-3 w-px bg-zinc-800 sm:inline-block" />
          <span className="text-zinc-500/80">geanraz0721@gmail.com</span>
          <span className="hidden h-3 w-px bg-zinc-800 sm:inline-block" />
          <span className="text-zinc-500/80">raz-gean</span>
        </div>
      </footer>
    </main>
  );
}
