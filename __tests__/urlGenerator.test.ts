/**
 * @jest-environment node
 */

import urlGenerator from "@/app/utils/urlGenerator";
import { Weather } from "@/app/utils/getWeather";

describe("urlGenerator", () => {
  it("should throw an error if no city or coords provided", async () => {
    const request: Weather = {
      unit: "metric",
    };

    try {
      const result = urlGenerator(request);
      fail("urlGenerator didn't throw an error");
    } catch (e) {
      e instanceof Error && expect(e.message).toBe("Invalid request");
    }
  });
  it("should return url", () => {
    const request: Weather = {
      unit: "metric",
      city: "London",
    };

    expect(typeof urlGenerator(request)).toBe("string");
  });
  it("should return different urls for different requests", () => {
    const requestCity: Weather = {
      unit: "metric",
      city: "London",
    };
    const requestCoords: Weather = {
      unit: "metric",
      coords: {
        lat: 51.5074,
        lon: 0.1278,
      },
    };
    expect(urlGenerator(requestCity)).not.toEqual(urlGenerator(requestCoords));
  });
  it("should return different urls for different units", () => {
    const request: Weather = {
      unit: "metric",
      city: "London",
    };
    const requestImperial: Weather = {
      unit: "imperial",
      city: "London",
    };
    expect(urlGenerator(request)).not.toEqual(urlGenerator(requestImperial));
  });
});
