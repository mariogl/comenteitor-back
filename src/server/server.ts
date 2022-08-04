import express from "express";
import cors from "cors";
import morgan from "morgan";
import generalError from "./middlewares/errors.js";
import commentsRouter from "./routers/comments.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/comments", commentsRouter);

app.use(generalError);

export default app;
