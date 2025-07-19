/**
 * @jest-environment node
 */
import { GET } from "./route";

describe("/api/hello", () => {
  it("should respond with a status 200", async () => {
    const response = GET();

    expect(response.status).toBe(200);
  });
  it("should respond with a message: Hello World!", async () => {
    const response = GET();
    const data = await response.json();

    expect(data.message).toBe("Hello World!");
  });
});
