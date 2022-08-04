import express from "express";
import morgan from "morgan";
import commentsRouter from "./routers/comments.js";

const app = express();

app.use(morgan("dev"));

app.use("/comments", commentsRouter);

export default app;
