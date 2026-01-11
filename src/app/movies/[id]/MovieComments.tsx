"use client";

import { useState, FormEvent } from "react";

type Props = {
  movieTitle: string;
};

export function MovieComments({ movieTitle }: Props) {
  const [comments, setComments] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a comment before submitting.");
      return;
    }
    setComments((prev) => [trimmed, ...prev]);
    setValue("");
    setError(null);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-xs text-zinc-200">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
          Comments
        </h2>
        <p className="text-[11px] text-zinc-500">
          Leave notes about <span className="font-medium text-zinc-200">{movieTitle}</span>.
          This is a demo-only comment box and doesnt persist to the database yet.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder="Share a quick thought about this movie..."
          className="w-full resize-none rounded border border-zinc-700 bg-black/40 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-400 focus:outline-none"
        />
        {error && <p className="text-[11px] text-red-400">{error}</p>}
        <button
          type="submit"
          className="rounded bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black hover:bg-zinc-200"
        >
          Post comment
        </button>
      </form>

      {comments.length > 0 && (
        <ul className="space-y-2 pt-2 border-t border-zinc-800">
          {comments.map((c, idx) => (
            <li
              key={idx}
              className="rounded border border-zinc-800 bg-black/40 px-3 py-2 text-[11px] text-zinc-200"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
