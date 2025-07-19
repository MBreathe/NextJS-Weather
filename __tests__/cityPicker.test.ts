import cityPicker from "@/app/utils/cityPicker";

describe("cityPicker", () => {
  it("should return a city", async () => {
    const city = await cityPicker();
    expect(city).toBeDefined();
  });
  it("city should have a correct structure", async () => {
    const city = await cityPicker();
    expect(city).toHaveProperty("id");
    expect(city).toHaveProperty("name");
  });
  it("should randomly pick a city to return", async () => {
    const cityOne = await cityPicker();
    const cityTwo = await cityPicker();
    const cityThree = await cityPicker();
    const cityFour = await cityPicker();
    expect(cityOne).not.toEqual(cityTwo);
    expect(cityTwo).not.toEqual(cityThree);
    expect(cityThree).not.toEqual(cityFour);
    expect(cityFour).not.toEqual(cityOne);
  });
  it("should only return one city", async () => {
    const city = await cityPicker();
    expect(typeof city).toBe("object");
    expect(city).not.toBeInstanceOf(Array);
  });
});
