import { Router } from "express";
import {
  deleteComment,
  getComments,
  newComment,
} from "../controllers/comments";

const commentsRouter = Router();

commentsRouter.get("/", getComments);
commentsRouter.post("/new-comment", newComment);
commentsRouter.delete("/:id", deleteComment);

export default commentsRouter;
