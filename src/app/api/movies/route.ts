import { NextResponse } from "next/server";
import { MovieRepository } from "@/lib/repositories/movie.repository";
import { buildPosterUrl, fetchMovieById, fetchTrailerUrl } from "@/lib/tmdb";
// import { requireUser } from "@/lib/auth"; // Uncomment to protect POST

function extractTmdbId(raw: unknown): string | null {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;

  // If it's just digits, assume it's already an ID
  if (/^\d+$/.test(value)) return value;

  try {
    const url = new URL(value);
    // Typical TMDB movie URL formats:
    // https://www.themoviedb.org/movie/603-the-matrix
    // https://www.themoviedb.org/movie/603
    const segments = url.pathname.split("/").filter(Boolean);
    const movieIndex = segments.findIndex((seg) => seg === "movie");
    if (movieIndex !== -1 && segments[movieIndex + 1]) {
      const idPart = segments[movieIndex + 1];
      const idMatch = idPart.match(/^(\d+)/);
      if (idMatch) return idMatch[1];
    }
  } catch {
    // not a URL, fall through
  }

  return null;
}

export async function GET() {
  try {
    const movies = await MovieRepository.getAll();
    return NextResponse.json(movies);
  } catch (err) {
    console.error("GET /api/movies error", err);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // const { userId } = await requireUser();
    const body = await request.json();
    const { tmdbInput } = body ?? {};
    const tmdbId = extractTmdbId(tmdbInput);

    if (!tmdbId) {
      return NextResponse.json(
        { error: "Provide a valid TMDB movie ID or URL" },
        { status: 400 }
      );
    }

    const tmdbMovie = await fetchMovieById(tmdbId);
    if (!tmdbMovie) {
      return NextResponse.json(
        { error: "Could not fetch movie details from TMDB" },
        { status: 502 }
      );
    }

    const title = tmdbMovie.title;
    const description = tmdbMovie.overview ?? "";
    const genre = (tmdbMovie.genres && tmdbMovie.genres.length > 0)
      ? tmdbMovie.genres.map((g) => g.name).join(", ")
      : "Unknown";

    const posterUrl = tmdbMovie.poster_path
      ? buildPosterUrl(tmdbMovie.poster_path)
      : null;

    let trailerUrl: string | null = null;
    try {
      trailerUrl = await fetchTrailerUrl(tmdbMovie.id);
    } catch (tmdbErr) {
      console.error("TMDB trailer fetch failed", tmdbErr);
    }

    const movie = await MovieRepository.create({
      tmdbId,
      title,
      description,
      genre,
      posterUrl,
      trailerUrl,
    });
    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    console.error("POST /api/movies error", err);
    return NextResponse.json({ error: "Failed to create movie" }, { status: 500 });
  }
}
