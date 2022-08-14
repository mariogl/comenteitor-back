import { Request, Response } from "express";
import Comment from "../../database/models/Comment";
import { IComment } from "../../types/interfaces";
import { deleteComment, getComments, newComment } from "./comments";

jest.mock("../../database/models/Comment", () => ({
  find: jest.fn(),
  create: jest.fn(),
}));

const res: Partial<Response> = {
  json: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
};
const next = jest.fn();
const req: Partial<Request> = {};

describe("Given a getComments controller", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call method response.json with a list of comments", async () => {
      const comments: IComment[] = [
        {
          commentUrl: "comment-url",
          date: new Date(),
        },
      ];
      Comment.find = jest.fn().mockResolvedValue(comments);

      await getComments(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ comments });
    });
  });
});

describe("Given a newComment controller", () => {
  describe("When it's invoked with a request with a new comment and a response", () => {
    test("Then it should call method response.json with the new comment", async () => {
      const commentToCreate: IComment = {
        commentUrl: "url-comment",
        date: new Date(),
      };
      const expectedStatus = 201;

      const req = {
        body: commentToCreate,
      } as Partial<Request>;
      const next = jest.fn();

      Comment.create = jest.fn().mockResolvedValue({
        id: "new",
        ...commentToCreate,
      });

      await newComment(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});

describe("Given a deleteComment controller", () => {
  describe("When it's invoked with a request with id 'todelete' and a response", () => {
    test("Then it should call json with the deleted comment", async () => {
      const deletedComment: IComment = {
        commentUrl: "deleted",
        date: new Date(),
      };

      const req: Partial<Request> = {
        params: {
          id: "todelete",
        },
      };
      Comment.findByIdAndDelete = jest.fn().mockResolvedValue(deletedComment);

      await deleteComment(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ comment: deletedComment });
    });
  });
});
