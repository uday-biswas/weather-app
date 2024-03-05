require("dotenv").config();

// function to fetch weather data from the API for a given location
const given = async (req, res) => {
    const { location } = req.body;
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location}&days=6&aqi=no&alerts=no`);
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// function to fetch weather data from the API for user's current location
const current = async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&days=6&aqi=no&alerts=no`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { given, current }