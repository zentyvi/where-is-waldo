import { Link } from "react-router";
import CharacterPortrait from "./CharacterPortrait";

function LevelCard({ level }) {
  return (
    <article>
      <Link to={`/levels/${level.id}`}>
        <div>
          <img src={level.imageUrl} alt="Level preview" />
        </div>
        <div>
          <div>
            <h2>{level.name}</h2> <span>{level.difficulty}</span>
          </div>
        </div>
        <div>
          {level.characters.map((c) => (
            <CharacterPortrait key={c.id} character={c} />
          ))}
        </div>
      </Link>
    </article>
  );
}

export default LevelCard;
