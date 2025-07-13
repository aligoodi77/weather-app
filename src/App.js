import { useState } from "react";
import { useWeather } from "./useWeather";

export default function App() {
  const [city, setCity] = useState("");
  const { weatherData, isLoading, error } = useWeather(city);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <input
        type="text"
        placeholder="Enter your Location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {isLoading && <p className="loader">Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <>
          <h2>{weatherData.location.name} Forecast</h2>
          <ul className="weather">
            {weatherData.forecast.forecastday.map((day) => (
              <Day key={day.date} weather={day} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Day({ weather }) {
  return (
    <li className="day">
      <p>{getFriendlyDay(weather.date)}</p>
      <img src={weather.day.condition.icon} alt={weather.day.condition.text} />
      <p>{Math.round(weather.day.avgtemp_c)}°C</p>
    </li>
  );
}

function getFriendlyDay(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays > 1 && diffDays < 7) return daysOfWeek[date.getDay()];

  return dateStr; // age bekhahi mishe tarikh asli ro neshon bedi
}
