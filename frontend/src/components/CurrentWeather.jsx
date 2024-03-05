import DateData from "./DateData";

const CurrentWeather = ({ data, tempunit }) => {

    const dateParts = data.location.localtime.split(' ');
    const date = new Date(dateParts[0]);
    const time = dateParts[1];

    return (
        <div className="mt-4 w-full md:w-[65%] lg:w-[45%] p-4 border-2 bg-sky-700 rounded-lg">

            {/* weather data for the given location  */}

            {/* place, date, and time */}
            <div className="flex flex-col">
                <div className="text-cyan-50 font-bold text-2xl">{data.location.name}, {data.location.region}, {data.location.country}</div>
                <div className="text-cyan-200 flex gap-3 font-semibold">
                    <DateData date={date} />
                    <p>{time}</p>
                </div>
            </div>

            {/* weather icon, temperature, and condition */}
            <div className="flex justify-center mt-4">
                <img className="w-36" src={data.current.condition.icon} alt={data.current.condition.text} />
                <div className="flex flex-col items-center text-cyan-50 gap-3 ml-4">
                    <div className="text-4xl font-bold mt-4">
                        {tempunit === 'C' ? `${data.current.temp_c}°C` : `${data.current.temp_f}°F`}
                    </div>
                    <p className="text-lg">{data.current.condition.text}</p>
                </div>
            </div>

            {/* other weather data */}
            <div className="flex justify-center mt-4 gap-5 flex-wrap">
                <div className="flex flex-col items-center p-5">
                    <p className="text-cyan-50 font-bold">Wind</p>
                    <p className="text-cyan-200">{data.current.wind_kph} km/h</p>
                </div>
                <div className="flex flex-col items-center p-5">
                    <p className="text-cyan-50 font-bold">Humidity</p>
                    <p className="text-cyan-200">{data.current.humidity}%</p>
                </div>
                <div className="flex flex-col items-center p-5">
                    <p className="text-cyan-50 font-bold">Feels Like</p>
                    <p className="text-cyan-200">{data.current.feelslike_c}°C</p>
                </div>
                <div className="flex flex-col items-center p-5">
                    <p className="text-cyan-50 font-bold">Pressure</p>
                    <p className="text-cyan-200">{data.current.pressure_in} inHg</p>
                </div>
                <div className="flex flex-col items-center p-5">
                    <p className="text-cyan-50 font-bold">Wind direction</p>
                    <p className="text-cyan-200">{data.current.wind_dir}</p>
                </div>
                <div className="flex flex-col items-center p-5">
                    <p className="text-cyan-50 font-bold">Precipitation</p>
                    <p className="text-cyan-200">{data.current.precip_in} in</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
