/**
 * @jest-environment node
 */

import reqChecker from "@/app/utils/reqChecker";

describe("reqChecker", () => {
  it("should return requested data if no error occurs", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: "London",
        unit: "metric",
      }),
    });

    const result = await reqChecker(request, 2);
    expect(result).toBeDefined();
  });
  it("should throw an error if request was not POST", async () => {
    const request = new Request("http://localhost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      await reqChecker(request, 2);
      fail("reqChecker isn't throwing an error when request was not POST");
    } catch (e) {
      e instanceof Error && expect(e.message).toBe("Invalid request");
    }
  });
  it("should throw an error if there is no body in request", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      await reqChecker(request, 2);
      fail(
        "reqChecker isn't throwing an error when there is no body in request",
      );
    } catch (e) {
      e instanceof Error && expect(e.message).toBe("Invalid request");
    }
  });
  it("should throw an error if unit was not provided", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: "London",
      }),
    });

    try {
      await reqChecker(request, 2);
      fail("reqChecker isn't throwing an error when unit was not provided");
    } catch (e) {
      e instanceof Error &&
        expect(e.message).toBe(
          "Invalid unit. Must be standard, metric, imperial",
        );
    }
  });
  it("should throw an error when there are too many parameters", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: "London",
        unit: "metric",
        extra: "extra",
      }),
    });

    try {
      await reqChecker(request, 2);
      fail(
        "reqChecker isn't throwing an error when there are too many parameters",
      );
    } catch (e) {
      e instanceof Error && expect(e.message).toBe("Too many parameters");
    }
  });
});
