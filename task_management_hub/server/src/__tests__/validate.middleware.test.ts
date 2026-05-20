import { jest } from "@jest/globals";
import { validate } from "../middleware/validate.middleware.js";
import { TaskSchema } from "../schemas/task.schema.js";

const createResponse = () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  return { status, json };
};

describe("validate middleware", () => {
  it("calls next when the request body is valid", () => {
    const req = { body: { title: "Valid", priority: "MEDIUM", status: "TODO" } } as any;
    const res = createResponse() as any;
    const next = jest.fn();

    validate(TaskSchema)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.body).toEqual({
      title: "Valid",
      priority: "MEDIUM",
      status: "TODO",
    });
  });

  it("returns 400 when the request body is invalid", () => {
    const req = { body: { priority: "LOW" } } as any;
    const res = createResponse() as any;
    const next = jest.fn();

    validate(TaskSchema)(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Validation failed",
      })
    );
  });
});
