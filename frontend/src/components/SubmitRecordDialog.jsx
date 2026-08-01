import { useState } from "react";
import { useNavigate } from "react-router";
import { createRecord } from "../api/api";
import style from "../styles/components/SubmitRecordDialog.module.css";

function SubmitRecordDialog({ level, time, clicks }) {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [username, setUsername] = useState(localStorage.getItem("name") || "");
  const accuracy = Math.round((clicks.correct / clicks.total) * 100) || 100;
  const formatedTime = time.toFixed(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      time: formatedTime,
      username,
      email,
    };

    localStorage.setItem("email", email);
    localStorage.setItem("name", username);

    try {
      await createRecord(level.id, data);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { title: "Time", content: `${formatedTime}s` },
    { title: "Accuracy", content: `${accuracy}%` },
    { title: "Wrong clicks", content: clicks.total - clicks.correct },
  ];

  return (
    <div className={style["dialog-container"]}>
      <div className={style["dialog"]}>
        <div className={style["title-wrapper"]}>
          <h2 className={style["title"]}>{level.name} Completed!</h2>
        </div>
        <div className={style["stats"]}>
          {stats.map((s) => (
            <div className={style["stat-box"]} key={s.title}>
              <span className={style["stat-title"]}>{s.title}</span>
              <strong className={style["stat-body"]}>{s.content}</strong>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={style["form"]}>
          <div className={style["input-field"]}>
            <label className={style["label"]} htmlFor="username">
              Username
            </label>
            <input
              className={style["input"]}
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
              placeholder="John doe"
            />
          </div>
          <div className={style["input-field"]}>
            <label className={style["label"]} htmlFor="email">
              Email
            </label>
            <input
              className={style["input"]}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              placeholder="example@email.com"
            />
          </div>
          <div className={style["form__actions"]}>
            <button className={style["submit-button"]} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitRecordDialog;
