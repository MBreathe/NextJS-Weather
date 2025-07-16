import {Weather, Unit} from "@/app/utils/getWeather";

async function reqChecker(req: Request, reqLength: number) {
    let requestData: Weather;
    try {
        requestData = await req.json();
    } catch (e) {
        console.error(e);
        throw new Error("Invalid request");
    }

    if (!requestData) throw new Error("Invalid request");
    if (Object.keys(requestData).length > reqLength) throw new Error("Too many parameters");
    const validUnits: Unit[] = ["standard", "metric", "imperial"];
    if (!validUnits.includes(requestData.unit)) throw new Error(`Invalid unit. Must be ${validUnits.join(", ")}`)
    return requestData;
}

export default reqChecker;