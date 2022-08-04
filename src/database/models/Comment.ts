import mongoose from "mongoose";
const { model, Schema } = mongoose;

const CommentSchema = new Schema({
  repoUrl: String,
  commentUrl: String,
});

const Comment = model("Comment", CommentSchema, "comments");

export default Comment;
