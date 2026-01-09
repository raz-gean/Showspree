"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  description: string;
  genre: string;
  createdAt: string | Date;
};

type FavoritesResponse = { movieId: string }[];

type Props = {
  movies: Movie[];
  isAuthenticated: boolean;
};

export function FavoriteMoviesClient({ movies, isAuthenticated }: Props) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    async function loadFavorites() {
      try {
        const res = await fetch("/api/favorites", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const data: FavoritesResponse = await res.json();
        if (!cancelled) {
          setFavoriteIds(new Set(data.map((f) => f.movieId)));
        }
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  function toggleFavorite(movieId: string) {
    if (!isAuthenticated) return;

    startTransition(async () => {
      const isFav = favoriteIds.has(movieId);
      try {
        const res = await fetch("/api/favorites", {
          method: isFav ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieId }),
        });
        if (!res.ok) return;

        setFavoriteIds((prev) => {
          const next = new Set(prev);
          if (isFav) next.delete(movieId);
          else next.add(movieId);
          return next;
        });
      } catch (err) {
        console.error("Failed to toggle favorite", err);
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => {
        const isFav = favoriteIds.has(movie.id);

        return (
          <article
            key={movie.id}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-colors hover:border-zinc-400/60"
          >
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                {movie.genre}
              </p>
              <h2 className="text-lg font-semibold text-zinc-50 line-clamp-2">
                {movie.title}
              </h2>
              <p className="text-xs text-zinc-400 line-clamp-3">
                {movie.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-xs">
              <Link
                href={`/movies/${movie.id}`}
                className="rounded-full border border-white/20 px-3 py-1 font-medium uppercase tracking-[0.2em] text-zinc-100 hover:border-white hover:bg-white hover:text-black"
              >
                Details
              </Link>

              <button
                type="button"
                disabled={!isAuthenticated || isPending}
                onClick={() => toggleFavorite(movie.id)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  isFav
                    ? "bg-white text-black"
                    : "border border-zinc-700 text-zinc-300 hover:border-white hover:text-white"
                }`}
              >
                <span>{isFav ? "Favorited" : "Favorite"}</span>
              </button>
              <button
                type="button"
                disabled={!isAuthenticated}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] border border-zinc-700 text-zinc-300 disabled:cursor-not-allowed disabled:opacity-60"
                title={isAuthenticated ? "Comments coming soon" : "Sign in to comment"}
              >
                Comment
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
