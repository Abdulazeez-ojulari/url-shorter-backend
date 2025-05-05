import request from "supertest";
import app from "../../app";
import dbCon from "../db/mongoconnection";
import mongoose from "mongoose";

beforeAll(() => {
  dbCon();
});

afterAll(async () => {
  await mongoose.connection.close();
});


let shortCode = "";
const originalUrl = "https://example.com/some-long-url";

describe("URL Shortening Service", () => {

  it("should encode a valid URL and return a short code", async () => {

    const response = await request(app)
      .post("/api/encode")
      .send({ longUrl: originalUrl });

    expect(response.status).toBe(201);
    shortCode = response.body.data.shortCode;
    expect(typeof shortCode).toBe("string");
    expect(shortCode.length).toBeGreaterThan(0);
    expect(response.body.data.longUrl).toBe(originalUrl);
  });

  it("should return 400 for invalid encode requests", async () => {
    const res = await request(app).post("/api/encode").send({ url: "" });
    expect(res.status).toBe(400);
    // expect(res.body).toHaveProperty("error");
  });

  it("should decode and redirect to the original URL", async () => {
    const res = await request(app).get(`/api/${shortCode}`).redirects(0);
    expect(res.headers.location).toBe(originalUrl);
  });

  it("should return 404 for non-existent short code", async () => {
    const res = await request(app).get("/api/nonexistent123").redirects(0);
    expect(res.status).toBe(404);
  });
});
