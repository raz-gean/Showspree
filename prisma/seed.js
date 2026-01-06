const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const movies = [
    {
      title: "Inception",
      description:
        "A skilled thief who steals corporate secrets through dream-sharing technology is given a chance to erase his past by planting an idea in a target's subconscious.",
      genre: "Sci-Fi",
    },
    {
      title: "Interstellar",
      description:
        "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      genre: "Sci-Fi",
    },
    {
      title: "La La Land",
      description:
        "An aspiring actress and a jazz musician fall in love while pursuing their dreams in Los Angeles.",
      genre: "Romance",
    },
    {
      title: "Gone Girl",
      description:
        "A man's wife disappears on their fifth wedding anniversary, and he becomes the prime suspect.",
      genre: "Thriller",
    },
    {
      title: "Spirited Away",
      description:
        "A young girl becomes trapped in a strange and magical world of spirits, witches and creatures.",
      genre: "Animation",
    },
    {
      title: "Mad Max: Fury Road",
      description:
        "In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a tyrant and his army.",
      genre: "Action",
    },
  ];

  await prisma.movie.createMany({
    data: movies,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
