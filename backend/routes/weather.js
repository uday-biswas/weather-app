// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers functions
const {
    given,
    current,
} = require("../controllers/report")

// Route for getting the weather with user input location
router.post("/given", given)

// Route for getting the weather with user's current location
router.post("/current", current)

// Export the router for use in the main application
module.exports = router