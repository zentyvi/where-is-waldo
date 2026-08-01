import { Link } from "react-router";
import style from "../styles/components/LevelCard.module.css";

function LevelCard({ level }) {
  return (
    <article>
      <Link className={style["level-card"]} to={`/levels/${level.id}`}>
        <div className={style["card__image-wrapper"]}>
          <img
            className={style["card__image"]}
            src={level.imageUrl}
            alt="Level preview"
          />
        </div>
        <div className={style["card__body"]}>
          <div className={style["card__meta"]}>
            <div className={style["card__title-wrapper"]}>
              <h2 className={style.card__title}>{level.name}</h2>{" "}
              <span className={`difficulty ${level.difficulty.toLowerCase()}`}>
                {level.difficulty}
              </span>
            </div>
          </div>
          <div className={style.card__characters}>
            {level.characters.map((c) => (
              <div key={c.id} className={style["card__portrait"]}>
                <img src={c.imageUrl} alt={`${c.name}`} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default LevelCard;
