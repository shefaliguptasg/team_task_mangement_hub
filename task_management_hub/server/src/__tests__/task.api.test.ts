import request from "supertest";
import app from "../app.js";

describe("Task API", () => {
  it("returns a JSON response for GET /api/tasks", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.any(Array),
      })
    );
  });

  it("creates a task with valid payload", async () => {
    const payload = {
      title: "API test task",
      priority: "HIGH",
      status: "TODO",
    };

    const response = await request(app).post("/api/tasks").send(payload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject(payload);
    expect(response.body.data.id).toBeTruthy();

    await request(app)
      .delete(`/api/tasks/${response.body.data.id}`)
      .set("x-delete-secret", "ADMIN_SECRET");
  });

  it("returns 400 when payload validation fails", async () => {
    const response = await request(app).post("/api/tasks").send({
      description: "Missing title",
      priority: "LOW",
      status: "TODO",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed");
  });

  it("blocks delete requests without the correct secret", async () => {
    const createResponse = await request(app).post("/api/tasks").send({
      title: "Delete auth test",
      priority: "LOW",
      status: "TODO",
    });

    expect(createResponse.status).toBe(201);
    const { id } = createResponse.body.data;

    const deleteResponse = await request(app).delete(`/api/tasks/${id}`);

    expect(deleteResponse.status).toBe(403);
    expect(deleteResponse.body.success).toBe(false);

    await request(app)
      .delete(`/api/tasks/${id}`)
      .set("x-delete-secret", "ADMIN_SECRET");
  });
});
