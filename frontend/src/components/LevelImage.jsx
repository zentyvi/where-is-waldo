import { useState } from "react";
import { checkAnswer } from "../api/api";
import style from "../styles/components/LevelImage.module.css";

function LevelImage({
  characters,
  setCharacters,
  level,
  setClicks,
  clicks,
  markers,
  setMarkers,
  time,
  setIsRunning,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cordinates, setCordinates] = useState({});

  const notFound = characters.filter((c) => c.isFound === false);
  const isFinished = notFound.length == 0;

  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentsX = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const percentsY = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);

    setMenuOpen(true);
    setCordinates({
      pixels: {
        x,
        y,
      },
      percentcs: { x: percentsX, y: percentsY },
    });
  };

  const handleMenuClick = async (e) => {
    setMenuOpen(false);

    try {
      const characterId = e.currentTarget.value;
      const result = await checkAnswer(
        level.id,
        characterId,
        cordinates.percentcs,
      );
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
            nc.time = time.toFixed(1);
          }
          newCharacters.push(nc);
        });
        setMarkers({ ...markers, [characterId]: cordinates.pixels });
        setCharacters(newCharacters);

        const notFound = newCharacters.filter((c) => c.isFound === false);
        const isFinished = notFound.length == 0;

        if (isFinished) {
          setIsRunning(false);
        }
      }
      setClicks(newClicks);
    } catch (err) {
      console.error(err);
    }
  };

  const clickMenu = (
    <div
      className={`${style["click-menu"]} ${cordinates.percentcs?.y >= 80 && style["overflow-y"]} ${cordinates.percentcs?.x >= 80 && style["overflow-x"]}`}
      style={{
        display: "flex",
        top: `${cordinates.pixels?.y}px`,
        left: `${cordinates.pixels?.x}px`,
      }}
    >
      {notFound.map((c) => {
        return (
          <button
            onClick={handleMenuClick}
            value={c.id}
            key={c.id}
            className={style["click-menu__row"]}
          >
            <img src={c.imageUrl} alt={c.name} />
            {c.name}
          </button>
        );
      })}
    </div>
  );

  return (
    <section className={style["image-wrapper"]}>
      {characters.map((c) => (
        <div
          className={`${style["marker"]} ${style[`marker--${c.name.toLowerCase()}`]}`}
          key={c.id}
          style={{
            display: c.isFound ? "block" : "none",
            top: `${markers[c.id].y}px`,
            left: `${markers[c.id].x}px`,
          }}
        ></div>
      ))}
      {menuOpen && !isFinished && clickMenu}
      <img
        className={style["image"]}
        src={level.imageUrl}
        alt="Level's image"
        onClick={handleImageClick}
      />
    </section>
  );
}

export default LevelImage;
