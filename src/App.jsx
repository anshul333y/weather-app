import { useState, useEffect } from "react";
import Inputs from "./components/Inputs";
import TopButtons from "./components/TopButtons";
import TimeandLocation from "./components/TimeandLocation";
import TempandDetails from "./components/TempandDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/WeatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [query, setQuery] = useState({ q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const message = query.q ? query.q : "current location";

    toast.info(`Fetching weather for ${message}`);

    const data = await getFormattedWeatherData({ ...query, units });
    toast.success(
      `Weather data for ${data.name}, ${data.country} fetched successfully!`,
    );
    setWeather(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) {
      return "from-cyan-700 to-blue-700";
    }
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
          <TimeandLocation weather={weather} />
          <TempandDetails weather={weather} units={units} />
          <Forecast title="3hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};

export default App;
