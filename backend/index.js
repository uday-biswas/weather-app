const express = require("express");    
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weather");

const PORT = process.env.PORT_BACKEND || 4001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// routes for weather data
app.use("/api/v1/weatherdata", weatherRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`server started on port no. ${PORT}`);
});

