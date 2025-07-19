import fetcher from "@/app/utils/fetcher";

global.fetch = jest.fn();

describe("fetcher", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should throw an error if no url provided", async () => {
    const mockUrl = "";
    try {
      await fetcher(mockUrl);
      fail("fetcher didn't throw an error");
    } catch (e) {
      e instanceof Error && expect(e.message).toBe("No url provided");
    }
  });
  it("should fetch data from url", async () => {
    const mockUrl = "https://example.com";
    const mockData = { data: "test" };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await fetcher(mockUrl);
    expect(result).toEqual(mockData);
  });
  it("should throw an error if fetch fails", async () => {
    const mockUrl = "https://example.com";
    const error = "Bad request";

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: error,
    });

    try {
      await fetcher(mockUrl);
      fail("fetcher didn't throw an error");
    } catch (e) {
      e instanceof Error && expect(e.message).toBe(error);
    }
  });
  it("should pass options to fetch if they were provided as the second argument", async () => {
    const mockUrl = "https://example.com";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: "test" }),
    });

    await fetcher(mockUrl, options);
    expect(global.fetch).toHaveBeenCalledWith(mockUrl, options);
  });
});
