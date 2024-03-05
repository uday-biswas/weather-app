import React, { useState, useRef, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import BounceLoader from "react-spinners/BounceLoader";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useOnClickOutside from './hooks/useOnClickOutside';
import axios from 'axios';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tempunit, setTempunit] = useState('C');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const ref = useRef(null);

  // function for getting the weather for current location
  const currentlocation = async () => {
    setLoading(true);
    try {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                console.log("latitude and longitude", latitude, longitude)
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/weatherdata/current`,
                {latitude: latitude, longitude: longitude}
                );
                console.log(response);
                if(response.status !== 200) throw new Error("Error fetching weather data");
                const data = await response.data;
                setWeatherData(data);
                setLoading(false);
            });
        } else {
            setError("Geolocation is not supported by your browser. Please enter a location manually.");
            setLoading(false);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data. Please try again later.");
        setLoading(false);
    }
  };

  // using useEffect to get the current location and favorites from local storage when the component mounts
  useEffect(() => {
    currentlocation();
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
  }, []);
  
  // function to handle change in location input
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // function to get weather data for a given location
  const handleSearch = async (location) => {
    setLoading(true);
    try {
      setError(null);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/weatherdata/given`,
        {location: location}
      );
      console.log("response", response)

      if(response.status !== 200) throw new Error("Error fetching weather data");
      const data = await response.data;
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // using custom hook to close the favorites pop up when clicked outside
  useOnClickOutside(ref, () => setShowFavorites(false));
  
  // function to add location to favorites
  const addToFavorites = (location) => {
    if (favorites.includes(location)) return;
    setFavorites([...favorites, location]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, location]));
  }

  // function to remove location from favorites
  const removeFromFavorites = (loc) => {
    const newFavorites = favorites.filter(favorite => favorite !== loc);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }

  return (
    <div className="bg-gray-500 bg-opacity-20 min-h-screen backdrop-blur-md flex flex-col justify-center items-center px-4 py-8">
      <h1 className="text-3xl w-full text-center font-bold mb-4">Welcome to the Weather App !!</h1>
      <p className="mb-4 w-full font-semibold text-center">Enter a location to get the current weather and 5-day forecast</p>
      <div className="flex">

        {/* taking input for location to search for weather data */}
        <input
          className="border border-gray-300 rounded py-2 px-4 mr-2 w-full"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(location);
            }
          }}
        />

        {/* button to search for weather data */}
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSearch(location)}
          disabled={!location.trim()}
        >
          Search
        </button>
      </div>

      <div className='flex gap-3'>

        {/* button to add location to favorites */}
          { location.trim() && 
            <button
          className="hover:bg-fuchsia-600 bg-fuchsia-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => addToFavorites(location)}
          >
            Add to Favorites
          </button>
          }

        <div className='flex flex-col relative'>
          
          {/* button to show favorite locations */}
          <button
          className="hover:bg-fuchsia-600 hover:cursor-pointer bg-fuchsia-500 text-white font-bold flex py-2 px-4 rounded mt-4"
          onClick={() => setShowFavorites(!showFavorites)}
          >
            <div>Favorites</div>
            <IoMdArrowDropdown size={30}/>
          </button>

          {/* pop up to show favorite locations */}
          {showFavorites && (
            <div ref={ref} onClick={(e) => e.stopPropagation()} className="absolute top-16 z-10 max-h-40 overflow-y-auto text-gray-800 bg-rose-200 font-semibold  bg-opacity-400 p-4 rounded-lg">
              {favorites.map((favorite, index) => (
                <div className='flex justify-between w-full'>
                <div key={index} className="hover:bg-gray-200 min-w-max cursor-pointer p-2" 
                onClick={() => {
                  setLocation(favorite)
                  handleSearch(favorite)
                  setShowFavorites(false)
                  }}>
                  {favorite}
                </div>
                <div className='p-2 text-red-600 border-l-2 hover:cursor-pointer'
                onClick={() => removeFromFavorites(favorite)}>
                  <MdDelete size={25}/></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* button to switch between Celcius and Fareinheit for temperature units */}
        { tempunit === 'C' ?
          <button
          className="hover:bg-fuchsia-600 bg-fuchsia-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setTempunit('F')}
          >
            Fareinheit
          </button> :
          <button
          className="hover:bg-fuchsia-600 bg-fuchsia-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setTempunit('C')}
          >
            Celcius
          </button>
        }

        {/* button to get weather data for current location */}
        <button
          className="hover:bg-fuchsia-600 bg-fuchsia-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => currentlocation()}
          >
            Current location
        </button>
      </div>

      {/* loading indicator while fetching data */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <BounceLoader
        color={"blue"}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
      )}

      {/* showing error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* showing current weather and 5-day forecast */}
      {weatherData && (
        <>
          <CurrentWeather data={weatherData} tempunit={tempunit}/>
          <WeatherForecast data={weatherData.forecast.forecastday.slice(1)} tempunit={tempunit} />
        </>
      )}

      {/* footer */}
      <footer className="text-center text-gray-900 w-full min-h-2 absolute bottom-0 bg-gray-400 mt-8">
        <p className="font-semibold">
          Created by Uday Biswas
        </p>
      </footer>

    </div>
  );
};

export default WeatherApp;
