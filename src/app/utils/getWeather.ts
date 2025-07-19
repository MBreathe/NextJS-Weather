import apiErrorHandler from "@/app/utils/apiErrorHandler";
import fetcher from "@/app/utils/fetcher";
import urlGenerator from "@/app/utils/urlGenerator";

export type Unit = "standard" | "metric" | "imperial";
export type Weather = {
  unit: Unit;
  city?: string;
  coords?: {
    lat: number;
    lon: number;
  };
};

async function getWeather(requestData: Weather) {
  let url = "";
  try {
    url = urlGenerator(requestData);
  } catch (e) {
    console.error(e);
    return apiErrorHandler(e instanceof Error ? e.message : "Invalid request");
  }

  try {
    const responseData = await fetcher(url);
    if (!responseData || !responseData.main)
      return apiErrorHandler("No data found", 500);
    return responseData;
  } catch (e) {
    console.error(e);
    return apiErrorHandler(e instanceof Error ? e.message : "Error while fetching data", 500);
  }
}

export default getWeather;
