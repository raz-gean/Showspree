import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { MovieService } from "@/lib/services/movie.service";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs"; // Very important for Prisma

export async function GET() {
  const session = await getServerSession(authOptions)

  if(!session){
    return NextResponse.json(
      {error: "unauthorized" },
      {status: 401}
    );
  }

  const movies = await MovieService.listMovies();
  return NextResponse.json(movies);
}

// Optional POST for adding movies (testing/demo)
export async function POST(req: Request) {
  const body = await req.json();
  const movie = await MovieService.addMovie(
    body.title,
    body.description,
    body.genre
  );
  return NextResponse.json(movie);
}
