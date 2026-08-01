import style from "../styles/components/LevelStatusBar.module.css";

function LevelStatusBar({ characters }) {
  return (
    <div className={style["status-bar"]}>
      {characters.map((c) => {
        return (
          <div
            key={c.id}
            className={`${style["character-box"]} ${c.isFound ? style["found"] : ""}`}
          >
            <img src={c.imageUrl} alt={c.name} className={style["portrait"]} />
            <div>
              <span className={style["time"]}>{c.time}s</span>
              <div className={style["checkmark"]}>
                <i className="fa-solid fa-thumbs-up"></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LevelStatusBar;
