const api_url = "http://localhost:3000";

async function getLevels() {
  const response = await fetch(`${api_url}/levels`);

  if (!response.ok) {
    throw new Error("Error during fetching levels");
  }

  const levels = await response.json();
  return levels;
}

async function getLevelById(levelId) {
  const response = await fetch(`${api_url}/levels/${levelId}`);

  if (!response.ok) {
    throw new Error("Error during fetching level by id");
  }

  const level = await response.json();
  return level;
}

async function checkAnswer(levelId, characterId, cordinates) {
  const response = await fetch(`${api_url}/levels/${levelId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ characterId, cordinates }),
  });

  if (!response.ok) {
    throw new Error("Error during checking the answer");
  }

  const result = await response.json();
  return result;
}

export { getLevels, getLevelById, checkAnswer };
