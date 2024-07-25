import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";

import { app } from "@/server";
import { prisma } from "@/data";
import { generateHashPassword } from "@/modules/users/services";

const api = app.listen();

describe("User routes", () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        email: "teste@email.com",
        password: generateHashPassword("12345678"),
        name: "teste",
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  it("Should login user by credentials", async () => {
    //prepare
    const email = "teste@email.com";
    const password = "12345678";
    const server = request(api);

    //execution
    const result = await server.get("/login").auth(email, password);

    //prepare
    expect(result.status).toBe(200);
    expect(result.body.token).toBeTruthy();
    expect(result.body.email).toBeTruthy();
    expect(result.body.name).toBeTruthy();
  });

  it("Should return error with wrong email", async () => {
    //prepare
    const email = "teste1@email.com";
    const password = "12345678";
    const server = request(api);

    //execution
    const result = await server.get("/login").auth(email, password);

    //prepare
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("Email/password is invalid");
  });

  it("Should return error with wrong password", async () => {
    //prepare
    const email = "teste@email.com";
    const password = "1234567";
    const server = request(api);

    //execution
    const result = await server.get("/login").auth(email, password);

    //prepare
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("Email/password is invalid [1]");
  });
});
