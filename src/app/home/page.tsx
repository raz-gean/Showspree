import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { MovieService } from "@/lib/services/movie.service";
import { FavoriteMoviesClient } from "../movies/FavoriteMoviesClient";

export const runtime = "nodejs";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const movies = await MovieService.listMovies();

  const name = session.user?.name || session.user?.email || "there";

  return (
    <main className="min-h-screen bg-black text-zinc-50">
      {/* TOP WELCOME STRIP */}
      <section className="border-b border-zinc-900 bg-linear-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400">
              Home
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              Welcome back, {name}.
            </h1>
            <p className="max-w-xl text-sm text-zinc-300">
              This is your Showspree home base. From here you can jump back
              into movies, manage favorites, and eventually see smart
              recommendations tuned to your taste.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <Link
                href="/movies"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.9)]"
              >
                Browse movies
              </Link>

              <button className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-black/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-100 transition-colors hover:border-white hover:bg-zinc-900">
                Coming soon: picks for you
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-xs text-zinc-400 shadow-[0_18px_45px_rgba(0,0,0,0.9)] max-w-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-2">
              Session
            </p>
            {session ? (
              <ul className="space-y-1">
                <li>
                  <span className="text-zinc-500">Signed in as </span>
                  <span className="text-zinc-200">{session.user?.email}</span>
                </li>
                <li className="text-zinc-500">
                  Favorites, watch history and recommendations will live here.
                </li>
              </ul>
            ) : (
              <p>
                You are not signed in. Create an account or log in to save
                favorites and unlock personalized features.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* MOVIES PREVIEW */}
      <section className="mx-auto max-w-5xl px-4 py-10 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
              Quick picks
            </p>
            <h2 className="text-xl font-semibold text-zinc-50 sm:text-2xl">
              Explore the catalog
            </h2>
          </div>
          <Link
            href="/movies"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-100"
          >
            View all
          </Link>
        </div>

        {movies.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No movies yet. Seed a few entries using Prisma, then this area will
            fill with titles to explore.
          </p>
        ) : (
          <FavoriteMoviesClient
            movies={movies}
            isAuthenticated={!!session}
          />
        )}
      </section>
    </main>
  );
}
