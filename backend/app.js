import express from "express";
import "dotenv/config";
import cors from "cors";

import levelsRoute from "./routes/levelsRoute.js";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/levels", levelsRoute);
