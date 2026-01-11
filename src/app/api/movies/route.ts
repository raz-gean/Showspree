import { NextResponse } from "next/server";
import { MovieRepository } from "@/lib/repositories/movie.repository";
import {
  searchMovieByTitle,
  buildPosterUrl,
  fetchTrailerUrl,
} from "@/lib/tmdb";
// import { requireUser } from "@/lib/auth"; // Uncomment to protect POST

function normalizePosterUrl(raw: unknown): string | null {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;

  // If it's already an absolute URL, trust it as-is
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  // Treat as TMDB poster_path; ensure it starts with a slash
  const path = value.startsWith("/") ? value : `/${value}`;
  return buildPosterUrl(path);
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
    const { title, description, genre, posterUrl, trailerUrl } = body ?? {};
    if (!title || !genre) {
      return NextResponse.json({ error: "title and genre are required" }, { status: 400 });
    }
    let finalPosterUrl = normalizePosterUrl(posterUrl);
    let finalTrailerUrl = trailerUrl ? String(trailerUrl) : null;

    // If no URLs provided, try to auto-populate from TMDB using the title
    if (!finalPosterUrl || !finalTrailerUrl) {
      try {
        const tmdbMovie = await searchMovieByTitle(String(title));
        if (tmdbMovie) {
          if (!finalPosterUrl) {
            finalPosterUrl = buildPosterUrl(tmdbMovie.poster_path);
          }
          if (!finalTrailerUrl) {
            const trailer = await fetchTrailerUrl(tmdbMovie.id);
            if (trailer) finalTrailerUrl = trailer;
          }
        }
      } catch (tmdbErr) {
        console.error("TMDB enrichment failed", tmdbErr);
      }
    }

    const movie = await MovieRepository.create({
      title: String(title),
      description: String(description ?? ""),
      genre: String(genre),
      posterUrl: finalPosterUrl,
      trailerUrl: finalTrailerUrl,
    });
    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    console.error("POST /api/movies error", err);
    return NextResponse.json({ error: "Failed to create movie" }, { status: 500 });
  }
}
