import { Weather } from "./getWeather";

function urlGenerator(requestData: Weather) {
  if (!process.env.OPEN_WEATHER_API_KEY)
    throw new Error("OPEN_WEATHER_API_KEY is not defined");
  const API_KEY = process.env.OPEN_WEATHER_API_KEY;

  //assign a correct url
  let url = "";
  if ("city" in requestData) {
    const { city, unit } = requestData;
    if (typeof city !== "string") throw new Error("Invalid city type");

    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  } else if ("coords" in requestData) {
    const { coords, unit } = requestData;
    if (!coords) throw new Error("Invalid coords");
    if (typeof coords.lat !== "number" || typeof coords.lon !== "number")
      throw new Error("Invalid coords type");

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${unit}`;
  } else throw new Error("Invalid request");
  return url;
}

export default urlGenerator;
