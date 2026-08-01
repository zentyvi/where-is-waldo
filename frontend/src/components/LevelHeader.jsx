import { useEffect } from "react";
import style from "../styles/components/LevelHeader.module.css";

function LevelHeader({ level, time, setTime, clicks, isRunning }) {
  useEffect(() => {
    const intervalId = isRunning
      ? setInterval(() => {
          setTime((t) => t + 0.1);
        }, 100)
      : 0;

    return () => clearInterval(intervalId);
  }, [setTime, isRunning]);

  const accuracy = Math.round((clicks.correct / clicks.total) * 100) || 100;

  const stats = [
    { title: "Time", content: `${time.toFixed(1)}s` },
    { title: "Wrong clicks", content: clicks.total - clicks.correct },
    { title: "Total clicks", content: clicks.total },
    { title: "Accuracy", content: `${accuracy}%` },
  ];

  return (
    <header className={style["level-header"]}>
      <div className={style["title-wrapper"]}>
        <h2 className={style.title}>
          {level.name}
          <span className={`difficulty ${level.difficulty.toLowerCase()}`}>
            {level.difficulty}
          </span>
        </h2>
      </div>
      <div className={style["stats-wrapper"]}>
        <div className={style["stats-inner"]}>
          {stats.map((s) => (
            <div className={style["stat-box"]} key={s.title}>
              <span className={style["stat__title"]}>{s.title}</span>
              <strong className={style["stat__body"]}>{s.content}</strong>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default LevelHeader;
