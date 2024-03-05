import React from 'react';
import DateData from './DateData';

const WeatherForecast = ({ data, tempunit }) => {

    return (
        <div className="mt-4 w-full p-4">
            <div className="text-gray-700 text-center m-4 font-bold text-3xl">5-Day Weather Forecast</div>
            <div className="flex flex-wrap justify-center gap-6">
                {data.map((day, index) => (
                    <div key={index} className="bg-gray-300 text-center flex flex-col min-w-44 p-4 border rounded-lg">

                        {/* date, weather icon, condition, and temperature */}
                        <DateData date={day.date} />
                        <img src={day.day.condition.icon} alt={day.day.condition.text} />
                        <div className="font-semibold text-gray-600">{day.day.condition.text}</div>
                        <div className="font-bold text-xl text-gray-500">{tempunit === 'C' ? `${day.day.avgtemp_c}°C` : `${day.day.avgtemp_f}°F`}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;