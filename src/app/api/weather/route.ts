import apiErrorHandler from "@/app/utils/apiErrorHandler";
import fetcher from "@/app/utils/fetcher";
type Unit = "standard" | "metric" | "imperial";
type WeatherCity = {
    city: string;
    unit: Unit;
}
type WeatherCoords = {
    coords: {
        lat: number;
        lon: number;
    };
    unit: Unit;
}

export async function POST(req: Request) {
    if (!process.env.API_KEY) return apiErrorHandler("API_KEY is not set", 500);
    const API_KEY: string = process.env.API_KEY;

    // check for validity of the request
    let requestData: WeatherCity | WeatherCoords;
    try {
        requestData = await req.json();
    } catch (e) {
        console.error(e);
        return apiErrorHandler("Invalid JSON");
    }
    if (!requestData) return apiErrorHandler("Invalid request");
    if (Object.keys(requestData).length > 2) return apiErrorHandler("Too many parameters");
    const validUnits: Unit[] = ["standard", "metric", "imperial"];
    if (!validUnits.includes(requestData.unit)) return apiErrorHandler(`Invalid unit. Must be ${validUnits.join(", ")}`)

    //assign a correct url
    let url = "";
    if ("city" in requestData) {
        const {city, unit} = requestData;
        if (!city || !unit) return apiErrorHandler("Incorrect or missing parameters");
        if (typeof city !== "string") return apiErrorHandler("Invalid city type");

        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
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
    } catch (e) {
        console.error(e);
        return apiErrorHandler("Error while fetching data from external API", 500);
    }

    // filtering the response
    if (!responseData || !responseData.main) return apiErrorHandler("No data found", 500);
    // TODO: add filtering?
    return new Response(JSON.stringify(responseData));
}