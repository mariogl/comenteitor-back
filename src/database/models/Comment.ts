import mongoose from "mongoose";
import { IComment } from "../../types/interfaces";
const { model, Schema } = mongoose;

const CommentSchema = new Schema<IComment>({
  commentUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Comment = model<IComment>("Comment", CommentSchema, "comments");

export default Comment;
