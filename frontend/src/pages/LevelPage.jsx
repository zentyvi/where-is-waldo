import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getLevelById } from "../api/api";
import Loader from "../components/Loader";
import RecordsTable from "../components/RecordsTable";
import LevelImage from "../components/LevelImage";
import LevelHeader from "../components/LevelHeader";

function LevelPage() {
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [time, setTime] = useState(0.0);
  const [clicks, setClicks] = useState({ total: 0, correct: 0 });
  const [markers, setMarkers] = useState("");
  const { levelId } = useParams();

  // const notFound = characters.filter((c) => c.isFound === false);
  // const isFinished = notFound.length === 0;

  useEffect(() => {
    const main = async () => {
      try {
        const result = await getLevelById(levelId);
        setLevel(result);
        const newCharacters = [];
        const newMarkers = {};
        result.characters.forEach((c) => {
          const nc = {
            ...c,
            isFound: false,
          };
          newMarkers[c.id] = {
            x: 0,
            y: 0,
          };
          newCharacters.push(nc);
        });
        setCharacters(newCharacters);
        setMarkers(newMarkers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    main();
  }, [levelId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <LevelHeader
        level={level}
        time={time}
        setTime={setTime}
        clicks={clicks}
      />
      <LevelImage
        level={level}
        characters={characters}
        setCharacters={setCharacters}
        setClicks={setClicks}
        clicks={clicks}
        markers={markers}
        setMarkers={setMarkers}
      />
      <RecordsTable records={level.records} />
    </main>
  );
}

export default LevelPage;
