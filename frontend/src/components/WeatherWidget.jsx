import { useEffect, useState } from "react";
import axios from "axios";
import { FaSun, FaCloud, FaCloudRain, FaBolt, FaSnowflake, FaSmog} from "react-icons/fa";

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/weather/${lat}/${lon}`);
                setWeather(response.data);
                } catch (error) {console.error(error);}
            },
            (error) => {
                console.error(error);
                setErrorMessage("Location permission denied");
            }
        );
    }, []);
    if (errorMessage) {
        return (<div className="bg-white rounded-xl px-4 py-2 border border-slate-100 shadow-sm">{errorMessage}</div>);}
    if (!weather) {
        return (<div className="bg-white rounded-xl px-4 py-2 border border-slate-100 shadow-sm">Loading weather...</div>);
    }
    const getWeatherIcon = () => {
    const weatherType = weather?.weather?.toLowerCase();
    switch (weatherType) {
        case "clear":
            return <FaSun size={16} className="animate-spin-slow" />;
        case "clouds":
            return <FaCloud size={16} />;
        case "rain":
        case "drizzle":
            return <FaCloudRain size={16} />;
        case "thunderstorm":
            return <FaBolt size={16} />;
        case "snow":
            return <FaSnowflake size={16} />;
        case "mist":
        case "fog":
        case "haze":
            return <FaSmog size={16} />;
        default:
            return <FaSun size={16} />;
        }
    };
    return (
        <div className="bg-white rounded-xl px-4 py-2 border border-slate-100 shadow-sm flex items-center gap-3 hover:shadow-md transition duration-300">
            <div className="bg-amber-50 p-2 rounded-lg text-amber-500">{getWeatherIcon()}</div>
            <div>
                <h3 className="text-base font-bold text-slate-800 leading-tight">{weather.temperature}°C</h3>
                <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">Humidity {weather.humidity}%</p>
            </div>
        </div>
    );
};

export default WeatherWidget;