import { Outlet } from "react-router";
import Header from "./components/Header";
import "./styles/index.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
