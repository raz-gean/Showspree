import { NextResponse } from "next/server";
import { MovieRepository } from "@/lib/repositories/movie.repository";
// import { requireUser } from "@/lib/auth"; // Uncomment to protect POST

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
    const { title, description, genre } = body ?? {};
    if (!title || !genre) {
      return NextResponse.json({ error: "title and genre are required" }, { status: 400 });
    }
    const movie = await MovieRepository.create({
      title: String(title),
      description: String(description ?? ""),
      genre: String(genre),
    });
    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    console.error("POST /api/movies error", err);
    return NextResponse.json({ error: "Failed to create movie" }, { status: 500 });
  }
}
