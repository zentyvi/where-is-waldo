import { Link } from "react-router";
import style from "../styles/pages/ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={style["error-page"]}>
      <div className={style["card"]}>
        <h1 className={style["title"]}>An error has occurred</h1>
        <Link to={"/"} className="btn btn--red">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
