import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MovieService } from "@/lib/services/movie.service";

export const runtime = "nodejs";

type MovieWithMedia = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  genre: string;
  posterUrl?: string | null;
  trailerUrl?: string | null;
};

export default async function MovieDetailPage(props: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const rawParams = props.params as any;
  const resolvedParams =
    rawParams && typeof rawParams.then === "function"
      ? await rawParams
      : rawParams;

  const id = resolvedParams?.id as string | undefined;

  if (!id) {
    notFound();
  }

  const movie: MovieWithMedia | null = await MovieService.getMovie(id);

  if (!movie) {
    notFound();
  }

  const similarAll = await MovieService.listMovies();
  const similar = similarAll
    .filter((m) => m.id !== movie.id && m.genre === movie.genre)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-black text-zinc-50">
      {/* Simple header + poster */}
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:py-12">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-xl sm:mx-0 sm:w-56">
          {movie.posterUrl ? (
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={400}
              height={600}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-80 items-center justify-center text-xs text-zinc-600">
              No poster available
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
            {movie.genre}
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {movie.title}
          </h1>
          <p className="max-w-xl text-sm text-zinc-300">{movie.description}</p>

          <p className="text-xs text-zinc-500">
            Added on {new Date(movie.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {movie.trailerUrl && (
              <a
                href={movie.trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black hover:bg-zinc-200"
              >
                Watch trailer
              </a>
            )}
            <Link
              href="/movies"
              className="inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200 hover:border-zinc-400"
            >
              Back to library
            </Link>
          </div>
        </div>
      </section>

      {/* Similar movies */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="border-t border-zinc-900 pt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Similar movies
          </h2>
          {similar.length === 0 ? (
            <p className="text-xs text-zinc-500">
              No similar movies yet. Add more titles in this genre to see
              suggestions here.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {similar.map((m) => (
                <Link
                  key={m.id}
                  href={`/movies/${m.id}`}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 text-xs text-zinc-200 hover:border-zinc-400"
                >
                  <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {m.genre}
                  </p>
                  <p className="line-clamp-2 text-sm font-semibold text-zinc-50">
                    {m.title}
                  </p>
                  <p className="mt-1 line-clamp-3 text-[11px] text-zinc-500">
                    {m.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
