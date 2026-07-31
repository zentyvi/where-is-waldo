import { useState } from "react";
import { checkAnswer } from "../api/api";

function LevelImage({
  characters,
  setCharacters,
  level,
  setClicks,
  clicks,
  markers,
  setMarkers,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cordinates, setCordinates] = useState({});

  const notFound = characters.filter((c) => c.isFound === false);
  const isFinished = notFound.length === 0;

  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);

    setMenuOpen(true);
    setCordinates({ x, y });
  };

  const handleMenuClick = async (e) => {
    setMenuOpen(false);

    try {
      const characterId = e.currentTarget.value;
      const result = await checkAnswer(level.id, characterId, cordinates);
      const newClicks = { ...clicks };
      newClicks.total += 1;

      if (result) {
        newClicks.correct += 1;
        const newCharacters = [];
        characters.forEach((c) => {
          const nc = {
            ...c,
          };
          if (c.id == characterId) {
            nc.isFound = true;
          }
          newCharacters.push(nc);
        });
        setMarkers({ ...markers, [characterId]: cordinates });
        setCharacters(newCharacters);
      }
      setClicks(newClicks);
    } catch (err) {
      console.error(err);
    }
  };

  const contexMenu = (
    <div
      style={{
        position: "absolute",
        top: `${cordinates.y}%`,
        left: `${cordinates.x}%`,
      }}
    >
      {notFound.map((c) => {
        return (
          <button onClick={handleMenuClick} value={c.id} key={c.id}>
            <img src={c.imageUrl} alt={c.name} width={32} />
            {c.name}
          </button>
        );
      })}
    </div>
  );

  return (
    <section>
      <div style={{ position: "relative", width: "min-content" }}>
        {characters.map((c) => (
          <div
            className={`marker marker--${c.name.toLowerCase()}`}
            key={c.id}
            style={{
              position: "absolute",
              top: `${markers[c.id].y}%`,
              left: `${markers[c.id].x}%`,
              width: "40px",
              height: "40px",
              backgroundColor: "red",
            }}
          ></div>
        ))}
        {menuOpen && !isFinished && contexMenu}
        <img
          src={level.imageUrl}
          alt="Level's image"
          onClick={handleImageClick}
        />
      </div>
    </section>
  );
}

export default LevelImage;
