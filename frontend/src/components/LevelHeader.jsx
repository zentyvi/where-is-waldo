import { useEffect } from "react";

function LevelHeader({ level, time, setTime, clicks }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((t) => t + 0.1);
    }, 100);

    return () => clearInterval(intervalId);
  }, [setTime]);

  const accuracy = Math.round((clicks.correct / clicks.total) * 100) || 100;

  return (
    <header>
      <div>
        <h2>
          {level.name} | <span>{level.difficulty}</span>
        </h2>
      </div>
      <div>
        <span>Time</span>
        <strong>{time.toFixed(1)}s</strong>
      </div>
      <div>
        <span>Wrong clicks</span>
        <strong>{clicks.total - clicks.correct}</strong>
      </div>
      <div>
        <span>Total clicks</span>
        <strong>{clicks.total}</strong>
      </div>
      <div>
        <span>Accuracy</span>
        <strong>{accuracy}%</strong>
      </div>
    </header>
  );
}

export default LevelHeader;
