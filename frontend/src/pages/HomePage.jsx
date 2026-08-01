import { useEffect, useState } from "react";
import { getLevels } from "../api/api";
import Loader from "../components/Loader";
import LevelCard from "../components/LevelCard";
import style from "../styles/pages/HomePage.module.css";

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
    <main className="main">
      <div className={style["levels-grid"]}>
        {levels.map((l) => (
          <LevelCard key={l.id} level={l} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
