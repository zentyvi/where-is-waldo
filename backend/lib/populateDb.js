import "dotenv/config";
import prismaClient from "./prisma.js";

if (!process.env["DATABASE_URL"]) {
  console.log("Please provide your database url to the .env file");
  process.exit(1);
}

const CHAR_IMAGES = {
  waldo:
    "https://res.cloudinary.com/dbbpyppam/image/upload/v1785493866/waldo.webp",
  wizard:
    "https://res.cloudinary.com/dbbpyppam/image/upload/v1785493866/wizard.webp",
  odlaw:
    "https://res.cloudinary.com/dbbpyppam/image/upload/v1785493866/odlaw.webp",
  wenda:
    "https://res.cloudinary.com/dbbpyppam/image/upload/v1785494570/wenda_twwmqf.webp",
};

async function main() {
  console.log("Deleting old data...");
  await prismaClient.$transaction([
    prismaClient.record.deleteMany(),
    prismaClient.player.deleteMany(),
    prismaClient.character.deleteMany(),
    prismaClient.level.deleteMany(),
  ]);

  console.log("Seeding new data...");

  await prismaClient.level.create({
    data: {
      difficulty: "Easy",
      imageUrl:
        "https://res.cloudinary.com/dbbpyppam/image/upload/v1785493866/level1_uemqwf.webp",
      characters: {
        create: [
          {
            name: "Waldo",
            imageUrl: CHAR_IMAGES.waldo,
            x1: 51.9,
            x2: 53.8,
            y1: 47.1,
            y2: 52.1,
          },
          {
            name: "Wizard",
            imageUrl: CHAR_IMAGES.wizard,
            x1: 61.5,
            x2: 63.5,
            y1: 47.0,
            y2: 53.8,
          },
          {
            name: "Odlaw",
            imageUrl: CHAR_IMAGES.odlaw,
            x1: 23.6,
            x2: 25.0,
            y1: 47.5,
            y2: 54.5,
          },
        ],
      },
    },
  });

  await prismaClient.level.create({
    data: {
      difficulty: "Hard",
      imageUrl:
        "https://res.cloudinary.com/dbbpyppam/image/upload/v1785493867/level2_gzkbyw.webp",
      characters: {
        create: [
          {
            name: "Waldo",
            imageUrl: CHAR_IMAGES.waldo,
            x1: 40.0,
            x2: 40.6,
            y1: 61.7,
            y2: 64.6,
          },
          {
            name: "Wizard",
            imageUrl: CHAR_IMAGES.wizard,
            x1: 77.6,
            x2: 78.3,
            y1: 56.9,
            y2: 59.5,
          },
          {
            name: "Wenda",
            imageUrl: CHAR_IMAGES.wenda,
            x1: 29.0,
            x2: 29.6,
            y1: 51.1,
            y2: 53.4,
          },
          {
            name: "Odlaw",
            imageUrl: CHAR_IMAGES.odlaw,
            x1: 6.6,
            x2: 7.2,
            y1: 68.0,
            y2: 70.3,
          },
        ],
      },
    },
  });

  await prismaClient.level.create({
    data: {
      difficulty: "Medium",
      imageUrl:
        "https://res.cloudinary.com/dbbpyppam/image/upload/v1785493868/level3_n1jh9w.webp",
      characters: {
        create: [
          {
            name: "Waldo",
            imageUrl: CHAR_IMAGES.waldo,
            x1: 56.5,
            x2: 57.2,
            y1: 34.3,
            y2: 37.9,
          },
          {
            name: "Wizard",
            imageUrl: CHAR_IMAGES.wizard,
            x1: 84.0,
            x2: 85.7,
            y1: 83.2,
            y2: 88.5,
          },
          {
            name: "Wenda",
            imageUrl: CHAR_IMAGES.wenda,
            x1: 38.3,
            x2: 39.0,
            y1: 31.6,
            y2: 34.3,
          },
          {
            name: "Odlaw",
            imageUrl: CHAR_IMAGES.odlaw,
            x1: 39.7,
            x2: 40.4,
            y1: 59.1,
            y2: 61.8,
          },
        ],
      },
    },
  });

  console.log(
    "Database successfully populated with custom character coordinates!",
  );
}

main()
  .catch((e) => {
    console.error("Error populating database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
