import { NextResponse } from "next/server";
import { MovieRepository } from "@/lib/repositories/movie.repository";

type ParamsPromise = { params: Promise<{ id: string }> };

// GET /api/movies/:id - optional, but handy for debugging
export async function GET(_req: Request, context: ParamsPromise) {
  try {
    const { id } = await context.params;
    const movie = await MovieRepository.getById(id);
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (err) {
    console.error("GET /api/movies/[id] error", err);
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 }
    );
  }
}

// PUT /api/movies/:id - update movie
export async function PUT(request: Request, context: ParamsPromise) {
  try {
    const body = await request.json();
    const { title, description, genre, posterUrl, trailerUrl } = body ?? {};

    if (
      !title &&
      !genre &&
      typeof description === "undefined" &&
      typeof posterUrl === "undefined" &&
      typeof trailerUrl === "undefined"
    ) {
      return NextResponse.json(
        { error: "Nothing to update" },
        { status: 400 }
      );
    }

    const { id } = await context.params;

    const updated = await MovieRepository.update(id, {
      title,
      description,
      genre,
      posterUrl,
      trailerUrl,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/movies/[id] error", err);
    return NextResponse.json(
      { error: "Failed to update movie" },
      { status: 500 }
    );
  }
}

// DELETE /api/movies/:id - delete movie
export async function DELETE(_request: Request, context: ParamsPromise) {
  try {
    const { id } = await context.params;

    await MovieRepository.delete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/movies/[id] error", err);

    if (err?.code === "P2025") {
      // Prisma "record not found" error
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete movie" },
      { status: 500 }
    );
  }
}
