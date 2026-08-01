import { Router } from "express";
import levelsController from "../controllers/levelsController.js";

const levelsRoute = Router();

levelsRoute.get("/", levelsController.levelsGet);
levelsRoute.get("/:levelId", levelsController.levelById);
levelsRoute.post("/:levelId", levelsController.checkAnswerPost);
levelsRoute.post("/:levelId/records", levelsController.levelRecordsPost);

export default levelsRoute;
