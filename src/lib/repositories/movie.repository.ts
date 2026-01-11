import { prisma } from "@/lib/db";

export const MovieRepository = {
  async getAll() {
    return prisma.movie.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: string) {
    return prisma.movie.findUnique({
      where: { id },
    });
  },

  async create(data: {
    tmdbId?: string | null;
    title: string;
    description: string;
    genre: string;
    posterUrl?: string | null;
    trailerUrl?: string | null;
  }) {
    return prisma.movie.create({
      data,
    });
  },

  async update(
    id: string,
    data: {
      title?: string;
      description?: string | null;
      genre?: string;
      posterUrl?: string | null;
      trailerUrl?: string | null;
    }
  ) {
    const { description, ...rest } = data;

    return prisma.movie.update({
      where: { id },
      data: {
        ...rest,
        ...(typeof description === "string" ? { description } : {}),
      },
    });
  },

  async delete(id: string) {
    return prisma.movie.delete({
      where: { id },
    });
  },
};
