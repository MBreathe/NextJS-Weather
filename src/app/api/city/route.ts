import cityPicker from "@/app/utils/cityPicker";
import apiErrorHandler from "@/app/utils/apiErrorHandler";
import getWeather, { Weather } from "@/app/utils/getWeather";
import reqChecker from "@/app/utils/reqChecker";

export async function POST(req: Request) {
  let requestData: Weather;
  try {
    requestData = await reqChecker(req, 1);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) return apiErrorHandler(e.message);
    return apiErrorHandler("Invalid request");
  }

  const city = await cityPicker();
  if (!city) return apiErrorHandler("No cities found", 500);
  const { name } = city;

  const cityReq: Weather = {
    city: name,
    unit: requestData.unit,
  };

  try {
    const data = await getWeather(cityReq);
    return new Response(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    return apiErrorHandler("Error while fetching data from external API", 500);
  }
}
