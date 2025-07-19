/**
 * @jest-environment node
 */

import apiErrorHandler from "@/app/utils/apiErrorHandler";

describe("apiErrorHandler", () => {
  it("should return a Response object", () => {
    const response = apiErrorHandler("test");
    expect(response).toBeInstanceOf(Response);
  });
  it("should return status 400 if no status provided as an argument", () => {
    const response = apiErrorHandler("test");
    expect(response.status).toBe(400);
  });
  it("should include error message provided as its first argument", async () => {
    const response = apiErrorHandler("test");
    const data = await response.json();
    expect(data.error).toBe("test");
  });
  it("should reflect status provided as its second argument", () => {
    const response = apiErrorHandler("test", 500);
    expect(response.status).toBe(500);
  });
});
