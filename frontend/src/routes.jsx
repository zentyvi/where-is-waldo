import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import LevelPage from "./pages/LevelPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/levels/:levelId", element: <LevelPage /> },
      { path: "/levels", element: <Navigate to={"/"} /> },
    ],
  },
]);

export default router;
