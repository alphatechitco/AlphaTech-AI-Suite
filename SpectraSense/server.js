// AlphaTech- Express Server for AutoSense and AutoEntertain
// This server handles requests related to predictive analysis and media entertainment features.
// Developed by AlphaTech Solutions

const express = require('express'); // Import Express framework
const path = require('path'); // Import path module for file handling
const AutoEntertain = require('./AutoEntertain'); // Import AutoEntertain module
const AutoSense = require('./AutoSense'); // Import AutoSense module

const app = express(); // Initialize an Express application

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(__dirname + '/public')); // Serve static files (HTML, CSS, JS) from the 'public' directory

/**
 * GET /
 * Serves the main HTML file to the client.
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send the index.html file as the response
});

/**
 * POST /dimension
 * Handles requests for different dimensions ('P' for predictive analysis, 'E' for entertainment).
 */
app.post('/dimension', async (req, res) => {
    const { dimension, key, mediaInput } = req.body; // Destructure the request body
    try {
        switch (dimension) {
            case 'P': // Predictive Analysis dimension
                const autoSense = new AutoSense(key); // Initialize AutoSense with the provided key
                await autoSense.fetchData(); // Fetch data from the database
                const prediction = autoSense.predict(); // Calculate prediction
                const explanation = autoSense.explainPrediction(); // Get explanation for the prediction
                res.send({ prediction, explanation }); // Send the result to the client
                break;
            case 'E': // Entertainment dimension
                const autoEntertain = new AutoEntertain(key); // Initialize AutoEntertain with the provided key
                const mediaList = await autoEntertain.getMedia(); // Fetch media data from the database
                const mediaChoice = mediaInput; // Use the provided media choice
                try {
                    const interestedMedia = await autoEntertain.promptForMovieChoice(mediaChoice); // Get user's movie choice and recommendations
                    console.log(interestedMedia);
                    res.send(interestedMedia); // Send the media data to the client
                } catch (error) {
                    res.status(404).send({ error: error.message }); // Handle movie not found error
                }
                break;
            case 'I': // Information dimension (not implemented)
                res.status(501).send({ error: "Information Feature Not Implemented yet." }); // Send a 501 status if the feature is not implemented
                break;
            default: // Invalid dimension choice
                res.status(400).send({ error: 'Invalid Choice!' }); // Send a 400 status for invalid choices
        }
    } catch (error) {
        res.status(500).send({ error: error.message }); // Handle any server errors
    }
});

/**
 * Start the server on port 8000.
 */
app.listen(8000, () => {
    console.log("Server started on port 8000"); // Log that the server has started
});
