"use client"
import {useEffect, useState} from "react";
import fetcher from "@/app/utils/fetcher";

export default function Home() {
  const [coords, setCoords] = useState<{coords: {lat: number, lon: number}, unit: string} | null>(null);
  const [temp, setTemp] = useState<number>(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords({coords: {lat: position.coords.latitude, lon: position.coords.longitude}, unit: "metric"});
      });
    }
  }, []);
  useEffect(() => {
    if (!coords) return;
    const fetchWeather = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coords)
      }
      try {
        const data = await fetcher("/api/weather", options);
        setTemp(data.main.temp);
      } catch (e) {
        console.error(e);
      }
    }
    fetchWeather();
  }, [coords]);

  return (
    <div className="flex flex-col text-center justify-center h-screen">
      <h1 className="">{temp}</h1>
    </div>
  );
}
