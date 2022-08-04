import "../../loadEnv.js";
import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";

const debug = Debug("commenteitor-api:middlewares:errors");

const generalError = (
  error: Error,
  req: Request,
  res: Response<{ msg: string }>,
  next: NextFunction
) => {
  debug(chalk.red(error.message));
  res.status(500).json({ msg: "error" });
};

export default generalError;
