import { NextFunction, Request, Response } from "express";
import Comment from "../../database/models/Comment.js";
import { IComment } from "../../types/interfaces.js";

export const getComments = async (
  req: Request,
  res: Response<{ comments: IComment[] }>,
  next: NextFunction
) => {
  try {
    const comments: IComment[] = await Comment.find();

    res.json({
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const newComment = async (
  req: Request,
  res: Response<{ comment: IComment }>,
  next: NextFunction
) => {
  try {
    const comment = req.body;
    const newComment: IComment = await Comment.create(comment);

    res.status(201).json({ comment: newComment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response<{ comment: IComment }>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedComment: IComment = await Comment.findByIdAndDelete(id);

    res.json({ comment: deletedComment });
  } catch (error) {
    next(error);
  }
};
