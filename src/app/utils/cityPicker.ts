import { readFile } from "fs/promises";
import path from "path";

type City = {
    id: string;
    name: string;
}

// cache
let citiesCache: City[] | null = null;

async function loadCities() {
    if (citiesCache) return citiesCache;

    try {
        const filePath = path.join(process.cwd(), "data", "worldCities.json");
        const data = await readFile(filePath, "utf-8");
        citiesCache = JSON.parse(data);
        return citiesCache;
    } catch (e) {
        console.error(e);
    }
}

async function cityPicker() {
    const cities = await loadCities();
    if (!cities || cities.length === 0) return null;

    return cities[Math.floor(Math.random() * cities.length)];
}

export default cityPicker;
