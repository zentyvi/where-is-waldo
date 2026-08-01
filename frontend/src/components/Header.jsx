import { Link } from "react-router";
import style from "../styles/components/Header.module.css";

function Header() {
  return (
    <header className={style.header}>
      <div className={style["header-wrapper"]}>
        <div className={style.container}>
          <Link to={"/"} className={style["header__title-wrapper"]}>
            <img
              src="https://res.cloudinary.com/dbbpyppam/image/upload/v1785497563/waldoheader_ju54if.webp"
              alt=""
              width={256}
              className={style["header__image"]}
            />
            <h1 className={style["header__title"]}>
              <span className={style.blue}>Where's</span>{" "}
              <span className={style.red}>Waldo?</span>
            </h1>
          </Link>
        </div>
        <div className={style.container}>
          <Link to={"/"} className="btn btn--red">
            Back to Home
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
