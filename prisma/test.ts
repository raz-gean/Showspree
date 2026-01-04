import { prisma } from "@/lib/db";

async function main() {
  await prisma.movie.createMany({
    data: [
      { title: "Inception", description: "Mind-bending thriller", genre: "Sci-Fi" },
      { title: "The Godfather", description: "Crime drama classic", genre: "Crime" },
      { title: "Spirited Away", description: "Magical adventure", genre: "Animation" },
    ],
  });
}

main()
  .then(() => console.log("Seeded movies"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
