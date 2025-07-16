import getWeather, { Weather } from "@/app/utils/getWeather";
import apiErrorHandler from "@/app/utils/apiErrorHandler";
import reqChecker from "@/app/utils/reqChecker";

export async function POST(req: Request) {
  // check for validity of the request
  let requestData: Weather;
  try {
    requestData = await reqChecker(req, 2);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) return apiErrorHandler(e.message);
    return apiErrorHandler("Invalid request");
  }

  try {
    const data = await getWeather(requestData);
    return new Response(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    return apiErrorHandler("Error while fetching data from external API", 500);
  }
}
