import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { MovieRepository } from "@/lib/repositories/movie.repository";
import CreateMovieForm from "@/app/movies/CreateMovieForm";
import { FavoriteMoviesClient } from "@/app/movies/FavoriteMoviesClient";
import { LayoutShell } from "@/app/components/LayoutShell";

export const runtime = "nodejs";

export default async function MoviesPage() {
  const session = await getServerSession(authOptions);
  let movies: any[] = [];
  try {
    movies = await MovieRepository.getAll();
  } catch (err) {
    console.error("Failed to load movies", err);
  }

  const spotlightCards = [
    {
      title: "Tonight's Picks",
      description: "A tight mix of crowd-pleasers to jump right into.",
      tag: "Curated",
    },
    {
      title: "Hidden Gems",
      description: "Under‑the‑radar titles perfect for deep dives.",
      tag: "Discovery",
    },
    {
      title: "Comfort Rewatches",
      description: "Feel‑good favorites you can play in the background.",
      tag: "Cozy",
    },
  ];

  const recommended = [
    "Slow‑burn dramas for late nights",
    "High‑energy action for watch parties",
    "Smart sci‑fi with big ideas",
    "Light comedies for background viewing",
  ];

  return (
    <LayoutShell>
      <main className="bg-black text-zinc-50">
        <section className="mx-auto max-w-5xl px-4 pt-10 pb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-400">
                Library
              </p>
              <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">
                Browse movies
              </h1>
              <p className="mt-2 max-w-xl text-sm text-zinc-400">
                A minimal, fast catalog designed for testing auth, favorites,
                and recommendation logic. No real streaming — just clean data.
              </p>
            </div>

            {!session && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-zinc-200 shadow-lg shadow-black/40">
                <p className="mb-2 font-medium">
                  You're browsing as guest.
                </p>
                <p className="mb-3 text-[11px] text-zinc-400">
                  Sign in to favorite titles and keep your picks in sync.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/login"
                    className="inline-flex rounded-full bg-white px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-black hover:bg-zinc-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-100 hover:border-white hover:bg-white/10"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {spotlightCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900 to-zinc-950 p-4 text-sm shadow-lg shadow-black/40 transition hover:border-white/30 hover:-translate-y-0.5"
              >
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {card.tag}
                </p>
                <h2 className="text-base font-semibold text-zinc-50">
                  {card.title}
                </h2>
                <p className="mt-2 text-xs text-zinc-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl space-y-10 px-4 pb-16">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Your sandbox
            </h2>
            <p className="text-xs text-zinc-500">
              Add a few movies to experiment with auth, favorites and
              recommendations. Everything stays local to your account.
            </p>
            <CreateMovieForm />
          </div>

          <div className="space-y-4">
            {movies.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No movies yet. Seed a few entries using Prisma or your admin
                tools, then refresh this page.
              </p>
            ) : (
              <>
                <FavoriteMoviesClient
                  movies={movies}
                  isAuthenticated={!!session}
                />
                {!session && (
                  <p className="text-xs text-zinc-500">
                    Favorite and comment actions are disabled until you sign
                    in.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Recommended starting points
            </h2>
            <p className="mt-2 text-xs text-zinc-500">
              Use these prompts as inspiration when you add movies — they make
              it easy to fake a real catalog while you test flows.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {recommended.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-zinc-950/60 p-3 text-xs text-zinc-300 shadow-md shadow-black/40"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </LayoutShell>
  );
}
