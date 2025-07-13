import { useEffect, useState } from "react";

export function useWeather(city) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "a21ac248f9d749e4999122030250706";

  useEffect(() => {
    if (!city) return;

    async function fetchWeather() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return { weatherData, isLoading, error };
}
