import prismaClient from "../lib/prisma.js";

async function levelsGet(req, res, next) {
  try {
    const levels = await prismaClient.level.findMany({
      include: {
        characters: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return res.status(200).json(levels);
  } catch (err) {
    next(err);
  }
}

async function levelById(req, res, next) {
  try {
    const { levelId } = req.params;
    const level = await prismaClient.level.findFirst({
      where: {
        id: parseInt(levelId),
      },
      include: {
        characters: {
          select: {
            id: true,
            imageUrl: true,
            name: true,
          },
        },
        records: {
          select: {
            id: true,
            time: true,
            player: {
              select: {
                name: true,
              },
            },
            createdAt: true,
          },
          orderBy: {
            time: "desc",
          },
        },
      },
    });

    if (!level) {
      return res.status(404).json({ message: "Level not found" });
    }

    return res.status(200).json(level);
  } catch (err) {
    next(err);
  }
}

async function checkAnswePost(req, res, next) {
  try {
    const { levelId } = req.params;
    const { characterId, cordinates } = req.body;

    const c = await prismaClient.level.findFirst({
      where: {
        id: parseInt(levelId),
      },
      select: {
        characters: {
          where: {
            id: parseInt(characterId),
          },
          select: {
            name: true,
            x1: true,
            x2: true,
            y1: true,
            y2: true,
          },
        },
      },
    });

    const cords = c.characters[0];

    if (!cords) {
      return res.status(404).json({ message: "Character not found" });
    }

    const x = parseFloat(cordinates.x);
    const y = parseFloat(cordinates.y);

    if (x >= cords.x1 && x <= cords.x2 && y >= cords.y1 && y <= cords.y2) {
      return res.status(200).json(true);
    }

    return res.status(200).json(false);
  } catch (err) {
    next(err);
  }
}

const levelsController = {
  levelsGet,
  levelById,
  checkAnswePost,
};

export default levelsController;
