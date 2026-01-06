import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json([], { status: 200 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json([], { status: 200 });

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    select: { movieId: true },
  });

  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movieId } = await req.json();
  if (!movieId) {
    return NextResponse.json({ error: "movieId required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const favorite = await prisma.favorite.upsert({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId,
      },
    },
    create: {
      userId: user.id,
      movieId,
    },
    update: {},
  });

  return NextResponse.json(favorite, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movieId } = await req.json();
  if (!movieId) {
    return NextResponse.json({ error: "movieId required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.favorite.delete({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId,
      },
    },
  });

  return NextResponse.json({ success: true });
}
