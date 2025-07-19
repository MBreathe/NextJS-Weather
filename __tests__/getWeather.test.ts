/**
 * @jest-environment node
 */

import getWeather, { Weather } from "@/app/utils/getWeather";
import urlGenerator from "@/app/utils/urlGenerator";
import fetcher from "@/app/utils/fetcher";
import apiErrorHandler from "@/app/utils/apiErrorHandler";

// mocking the dependencies
jest.mock("@/app/utils/urlGenerator");
jest.mock("@/app/utils/fetcher");
jest.mock("@/app/utils/apiErrorHandler");

console.error = jest.fn();

describe("getWeather", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return weather data when fetcher returns valid data", async () => {
    const mockUrl = "https://example.com";
    const requestData: Weather = {
      unit: "metric",
      city: "London",
    };
    const mockWeatherData = {
      main: {
        temp: 20,
        feels_like: 18,
        humidity: 70,
      },
      name: "London",
    };

    (urlGenerator as jest.Mock).mockReturnValue(mockUrl);
    (fetcher as jest.Mock).mockReturnValueOnce(mockWeatherData);

    const result = await getWeather(requestData);

    expect(urlGenerator).toHaveBeenCalledWith(requestData);
    expect(fetcher).toHaveBeenCalledWith(mockUrl);
    expect(result).toEqual(mockWeatherData);
  });
  it("should return a Response object with an error when no data is received from a fetcher", async () => {
    const mockUrl = "https://example.com";
    const requestData: Weather = {
      unit: "metric",
      city: "London",
    };
    const mockErrorResponse = new Response(
      JSON.stringify({ error: "No data found" }),
      { status: 500 },
    );

    (urlGenerator as jest.Mock).mockReturnValue(mockUrl);
    (fetcher as jest.Mock).mockResolvedValue({});
    (apiErrorHandler as jest.Mock).mockReturnValue(mockErrorResponse);

    const result = await getWeather(requestData);

    expect(urlGenerator).toHaveBeenCalledWith(requestData);
    expect(fetcher).toHaveBeenCalledWith(mockUrl);
    expect(apiErrorHandler).toHaveBeenCalledWith("No data found", 500);
    expect(result).toEqual(mockErrorResponse);
  });
  it("should return a Response object with an error when there's an error while fetching data", async () => {
    const mockUrl = "https://example.com";
    const requestData: Weather = {
      unit: "metric",
      city: "London",
    };
    const mockFetchError = new Error("Network error");
    const mockErrorResponse = new Response(
      JSON.stringify({ error: "Network error" }),
      { status: 500 },
    );

    (urlGenerator as jest.Mock).mockReturnValue(mockUrl);
    (fetcher as jest.Mock).mockRejectedValue(mockFetchError);
    (apiErrorHandler as jest.Mock).mockReturnValue(mockErrorResponse);

    const result = await getWeather(requestData);

    expect(urlGenerator).toHaveBeenCalledWith(requestData);
    expect(fetcher).toHaveBeenCalledWith(mockUrl);
    expect(apiErrorHandler).toHaveBeenCalledWith(
      "Network error",
      500,
    );
    expect(result).toEqual(mockErrorResponse);
  });
});
