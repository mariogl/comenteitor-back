import { Router } from "express";
import { getComments } from "../controllers/comments.js";

const commentsRouter = Router();

commentsRouter.get("/", getComments);

export default commentsRouter;
