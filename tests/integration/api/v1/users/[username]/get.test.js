import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabse();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/users/[username] should return status 200", () => {
  describe("Anonymous user", () => {
    test("With exact case match'", async () => {
      await orchestrator.createUser({
        username: "sameCase",
        email: "same.case@example.com",
        password: "donghasahugedong",
      });

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/sameCase",
      );

      expect(response2.status).toBe(200);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "sameCase",
        email: "same.case@example.com",
        password: response2Body.password,
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });
      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.updated_at)).not.toBeNaN();
    });
    test("With case mismatch'", async () => {
      await orchestrator.createUser({
        username: "differentCase",
        email: "different.case@example.com",
        password: "donghasahugedong",
      });
      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/DifferentCase",
      );

      expect(response2.status).toBe(200);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "differentCase",
        email: "different.case@example.com",
        password: response2Body.password,
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });
      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.updated_at)).not.toBeNaN();
    });
    test("With nonexistant username", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/NonExistantUser",
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "User not found",
        action: "Please check if the username was typed correctly",
        statusCode: 404,
      });
    });
  });
});
