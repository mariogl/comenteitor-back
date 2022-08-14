import { NextFunction, Request, Response } from "express";
import generalError from "./errors";

describe("Given a generalError middleware", () => {
  describe("When it receives an error, a response, a request", () => {
    test("Then it should call json with an error and status with 500", () => {
      const expectedStatus = 500;

      const error = new Error();
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
      };
      const next: NextFunction = jest.fn();

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ msg: "error" });
    });
  });
});
