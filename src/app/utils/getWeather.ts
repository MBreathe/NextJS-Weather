import apiErrorHandler from "@/app/utils/apiErrorHandler";
import fetcher from "@/app/utils/fetcher";

export type Unit = "standard" | "metric" | "imperial";
export type Weather = {
    unit: Unit;
    city?: string;
    coords?: {
        lat: number;
        lon: number;
    };
}


async function getWeather(requestData: Weather) {
    if (!process.env.OPEN_WEATHER_API_KEY) return apiErrorHandler("API_KEY for OpenWeather is not set", 500);
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;

    //assign a correct url
    let url = "";
    if ("city" in requestData) {
        const {city, unit} = requestData;
        if (!city || !unit) return apiErrorHandler("Incorrect or missing parameters");
        if (typeof city !== "string") return apiErrorHandler("Invalid city type");

        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
    }
    else if ("coords" in requestData) {
        const {coords, unit} = requestData;
        if (!coords || !unit) return apiErrorHandler("Incorrect or missing parameters");
        if (typeof coords.lat !== "number" || typeof coords.lon !== "number") return apiErrorHandler("Invalid lat/lon type");

        url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${unit}`;
    }
    else return apiErrorHandler("Invalid request");

    let responseData;
    try {
        responseData = await fetcher(url);
        if (!responseData || !responseData.main) return apiErrorHandler("No data found", 500);
        return responseData;
    } catch (e) {
        console.error(e);
        return apiErrorHandler("Error while fetching data from external API", 500);
    }
}

export default getWeather;