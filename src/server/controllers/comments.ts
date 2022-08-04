import { NextFunction, Request, Response } from "express";
import Comment from "../../database/models/Comment.js";

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find();

    res.json({
      comments,
    });
  } catch (error) {
    console.log("petó");
  }
};
