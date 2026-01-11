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
        {/* Hero / landing section */}
        <section className="flex min-h-screen w-full items-center justify-center border-b border-white/10 bg-[radial-gradient(circle_at_top,#27272a,#020617_55%)] px-4">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 py-16 sm:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
              Welcome
            </p>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                Ready to browse movies?
              </h1>
              <p className="mt-3 max-w-xl text-sm text-zinc-400">
                Use this sandbox catalog to explore titles, test
                authentication, and play with favorites  no streaming,
                just clean data and posters.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#movies-library"
                className="inline-flex items-center rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200"
             >
                Browse library
              </Link>
              <span className="text-[11px] text-zinc-500">
                Or scroll to see curated picks, your sandbox, and more.
              </span>
            </div>
          </div>
        </section>

        <section
          id="movies-library"
          className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:py-16"
        >
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Popular Movies
            </h2>
            {movies.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No movies yet. Add a few titles in your sandbox below to start
                populating this section.
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

        {/* Contact / help section */}
        <section className="border-t border-white/10 bg-zinc-950/80 px-4 py-10 sm:py-12">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
                Need help?
              </h2>
              <p className="max-w-md text-xs text-zinc-500">
                Have questions about Showspree, setting up your movie sandbox,
                or connecting to your Neon database? Reach out and well help
                you get unstuck.
              </p>
            </div>
            <div className="space-y-2 text-xs text-zinc-300">
              <p className="font-semibold text-zinc-100">Contact the Showspree team</p>
              <p className="text-zinc-400">Email: support@showspree.dev (demo)</p>
              <p className="text-zinc-500">
                This is a demo app  update this section with your real
                contact details when you deploy.
              </p>
            </div>
          </div>
        </section>
      </main>
    </LayoutShell>
  );
}
