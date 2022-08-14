import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDB from "../../database";
import Comment from "../../database/models/Comment";
import app from "../server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await connectDB(uri);
});

beforeEach(async () => {
  await Comment.create({ commentUrl: "patata" });
  await Comment.create({ commentUrl: "frita" });
});

afterEach(async () => {
  await Comment.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a GET /comments endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should return a response and a 200 status", async () => {
      const { body } = await request(app).get("/comments").expect(200);

      expect(body.comments).toHaveLength(2);
      expect(body.comments[0]).toHaveProperty("commentUrl", "patata");
      expect(body.comments[1]).toHaveProperty("commentUrl", "frita");
    });
  });
});

describe("Given a POST /comments/new-comment endpoint", () => {
  describe("When it receives a request with a comment", () => {
    test("Then it should return a response with the new comment and status 201", async () => {
      const { body } = await request(app)
        .post("/comments/new-comment")
        .send({ commentUrl: "boniato" })
        .expect(201);

      expect(body).toHaveProperty("comment");
      expect(body.comment).toHaveProperty("id");
      expect(body.comment).toHaveProperty("commentUrl", "boniato");
    });
  });
});
