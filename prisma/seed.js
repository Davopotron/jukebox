const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const seed = async () => {
    // A loop must be used because `prisma.user.createMany` fails here
    for (let i = 0; i < 3; i++) { 
      // For each user, create an array of 5 playlists
      const playlist = [];
      for (let j = 0; j < 5; j++) {
        playlist.push({
          name: `Playlist ${i}${j}`,
          description: `Playlist for Paul`
        });
      }
  
      // Create a single user with nested playlists
      await prisma.user.create({
        data: {
          username: `Person ${i + 1}`,
          playlists: {
          create: playlist,
          },
        },
      });
    }
  };

  seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });