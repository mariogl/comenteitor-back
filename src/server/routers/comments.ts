import { Router } from "express";
import { getComments, newComment } from "../controllers/comments.js";

const commentsRouter = Router();

commentsRouter.get("/", getComments);
commentsRouter.post("/new-comment", newComment);

export default commentsRouter;
