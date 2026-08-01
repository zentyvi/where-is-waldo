import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getLevelById } from "../api/api";
import Loader from "../components/Loader";
import RecordsTable from "../components/RecordsTable";
import LevelImage from "../components/LevelImage";
import LevelHeader from "../components/LevelHeader";
import LevelStatusBar from "../components/LevelStatusBar";
import SubmitRecordDialog from "../components/SubmitRecordDialog";
import FocusLock from "react-focus-lock";

function LevelPage() {
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [time, setTime] = useState(0.0);
  const [isRunning, setIsRunning] = useState(true);
  const [clicks, setClicks] = useState({ total: 0, correct: 0 });
  const [markers, setMarkers] = useState("");
  const { levelId } = useParams();

  const isFinished = characters.filter((c) => c.isFound === false).length == 0;

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
            time: 0.0,
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
    <main className="main">
      {isFinished && (
        <FocusLock>
          <SubmitRecordDialog level={level} time={time} clicks={clicks} />
        </FocusLock>
      )}
      <LevelHeader
        level={level}
        time={time}
        setTime={setTime}
        clicks={clicks}
        isRunning={isRunning}
      />
      <LevelStatusBar characters={characters} />
      <LevelImage
        level={level}
        characters={characters}
        setCharacters={setCharacters}
        setClicks={setClicks}
        clicks={clicks}
        markers={markers}
        setMarkers={setMarkers}
        time={time}
        setIsRunning={setIsRunning}
      />
      <RecordsTable records={level.records} />
    </main>
  );
}

export default LevelPage;
