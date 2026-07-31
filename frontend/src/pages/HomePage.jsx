import { useEffect, useState } from "react";
import { getLevels } from "../api/api";
import Loader from "../components/Loader";
import LevelCard from "../components/LevelCard";

function HomePage() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = async () => {
      try {
        const levels = await getLevels();
        setLevels(levels);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    main();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      {levels.map((l) => (
        <LevelCard key={l.id} level={l} />
      ))}
    </main>
  );
}

export default HomePage;
