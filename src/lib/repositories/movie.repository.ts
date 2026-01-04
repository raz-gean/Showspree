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

  async create(data: { title: string; description: string; genre: string }) {
    return prisma.movie.create({
      data,
    });
  },
};
