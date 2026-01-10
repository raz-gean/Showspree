"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  id: string;
  title: string;
  genre: string;
  description?: string | null;
};

export default function CreateMovieForm() {
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMovies() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/movies");
      if (!res.ok) throw new Error("Failed to load movies");
      const data = await res.json();
      setMovies(data);
    } catch (err: any) {
      setError(err.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  function resetForm() {
    setTitle("");
    setGenre("");
    setDescription("");
    setEditingId(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title || !genre) {
      setError("Title and genre are required.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { title, genre, description };

      const res = await fetch(
        editingId ? `/api/movies/${editingId}` : "/api/movies",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save movie");
      }

      resetForm();
      await loadMovies();
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete movie");
      }

      if (editingId === id) {
        resetForm();
      }

      await loadMovies();
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(movie: Movie) {
    setEditingId(movie.id);
    setTitle(movie.title);
    setGenre(movie.genre);
    setDescription(movie.description ?? "");
  }

  return (
    <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
        Manage movies
      </h3>

      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      {/* CREATE / UPDATE FORM */}
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full resize-none rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? editingId
                ? "Updating..."
                : "Saving..."
              : editingId
              ? "Update movie"
              : "Add movie"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {/* READ / DELETE / EDIT LIST */}
      <div className="mt-5 border-t border-zinc-800 pt-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Existing movies
        </h4>

        {loading ? (
          <p className="text-xs text-zinc-500">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-xs text-zinc-500">No movies yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-950 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-zinc-100">{movie.title}</p>
                  <p className="text-xs text-zinc-500">
                    {movie.genre}
                    {movie.description
                      ? ` · ${movie.description.slice(0, 80)}${
                          movie.description.length > 80 ? "..." : ""
                        }`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(movie)}
                    className="rounded border border-zinc-600 px-2 py-1 text-xs text-zinc-200 hover:border-zinc-400"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(movie.id)}
                    className="rounded border border-red-700 px-2 py-1 text-xs text-red-300 hover:border-red-500"
                    disabled={submitting}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
