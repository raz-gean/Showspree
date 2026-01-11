const TMDB_API_BASE = "https://api.themoviedb.org/3";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

function getApiKey(): string | null {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    console.warn("TMDB_API_KEY is not set; skipping TMDB enrichment");
    return null;
  }
  return key;
}

export type TmdbMovieSearchResult = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
};

export async function searchMovieByTitle(
  title: string
): Promise<TmdbMovieSearchResult | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const url = new URL("/search/movie", TMDB_API_BASE);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("query", title);
  url.searchParams.set("include_adult", "false");

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error("TMDB search failed", await res.text());
    return null;
  }

  const data = (await res.json()) as { results: TmdbMovieSearchResult[] };
  if (!data.results?.length) return null;

  return data.results[0];
}

export function buildPosterUrl(posterPath: string | null): string | null {
  if (!posterPath) return null;
  // w500 is a good default size for posters
  return `${TMDB_IMAGE_BASE}/w500${posterPath}`;
}

export async function fetchTrailerUrl(
  tmdbId: number
): Promise<string | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const url = new URL(`/movie/${tmdbId}/videos`, TMDB_API_BASE);
  url.searchParams.set("api_key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error("TMDB videos fetch failed", await res.text());
    return null;
  }

  const data = (await res.json()) as {
    results: { key: string; site: string; type: string }[];
  };

  const trailer = data.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  if (!trailer) return null;

  return `https://www.youtube.com/watch?v=${trailer.key}`;
}
