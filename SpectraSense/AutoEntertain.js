// AlphaTech - AutoEntertain Module
// This module helps in retrieving and recommending movies based on a genre and user-selected movie.
// Developed by AlphaTech Solutions

const db = require('./dbconfig'); // Import database configuration

class AutoEntertain {
    /**
     * Constructor to initialize AutoEntertain with a genre key and a standard similarity scale.
     * @param {string} key - The genre key for filtering movies.
     */
    constructor(key) {
        this.key = key;
        this.standardScale = 0.5; // Standard similarity scale for recommendations
    }

    /**
     * Fetches a list of movies from the database that match the genre key.
     * @returns {Promise<Array>} - Resolves with an array of movies matching the genre.
     */
    getMedia() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM movies WHERE genre LIKE ?';
            db.query(sql, [`%${this.key}%`], (err, results) => {
                if (err) {
                    reject(err); // Reject the promise with an error if query fails
                } else {
                    resolve(results); // Resolve with the movie results if query succeeds
                }
            });
        });
    }

    /**
     * Fetches a specific movie based on the user's choice and provides recommendations.
     * @param {string} mediaChoice - The title of the movie the user selected.
     * @returns {Promise<Object>} - Resolves with the selected movie and recommendations.
     */
    promptForMovieChoice(mediaChoice) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM movies WHERE title LIKE ?';
            db.query(sql, [`%${mediaChoice}%`], (err, results) => {
                if (err) {
                    reject(err); // Reject the promise with an error if query fails
                } else if (results.length === 0) {
                    reject(new Error('Movie not found')); // Reject if no movie is found
                } else {
                    const selectedMedia = results[0];
                    this.getRecommendations(selectedMedia)
                        .then(recommendations => {
                            resolve({ selectedMedia, recommendations }); // Resolve with the selected movie and recommendations
                        })
                        .catch(reject); // Reject if getting recommendations fails
                }
            });
        });
    }

    /**
     * Retrieves movie recommendations based on the selected movie's genre.
     * @param {Object} selectedMedia - The movie object selected by the user.
     * @returns {Promise<Array>} - Resolves with an array of recommended movies.
     */
    getRecommendations(selectedMedia) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM movies WHERE genre LIKE ? AND id != ?';
            db.query(sql, [`%${selectedMedia.genre}%`, selectedMedia.id], (err, results) => {
                if (err) {
                    reject(err); // Reject the promise with an error if query fails
                } else {
                    // Filter the recommendations based on similarity scale
                    const recommendations = results.filter(media => {
                        const similarityScale = this.calculateSimilarity(media, selectedMedia);
                        return similarityScale >= this.standardScale;
                    });
                    resolve(recommendations); // Resolve with the filtered recommendations
                }
            });
        });
    }

    /**
     * Calculates the similarity between two movies based on genre and rating.
     * @param {Object} mediaElement - The movie object being compared.
     * @param {Object} selectedMedia - The original movie selected by the user.
     * @returns {number} - The similarity scale between the two movies.
     */
    calculateSimilarity(mediaElement, selectedMedia) {
        // Split and trim the genre strings into arrays
        const selectedGenres = selectedMedia.genre.split(', ').map(genre => genre.trim());
        const mediaGenres = mediaElement.genre.split(', ').map(genre => genre.trim());
        
        // Calculate genre resemblance
        const genreIntersection = selectedGenres.filter(genre => mediaGenres.includes(genre));
        const genreResemblance = genreIntersection.length > 0 ? 1 : 0;
        
        // Calculate rating resemblance
        const ratingDifference = Math.abs(mediaElement.rating - selectedMedia.rating);
        const ratingResemblance = 1 / (1 + ratingDifference);
        
        // Return a combined similarity score based on genre and rating resemblance
        return (genreResemblance * 0.5) + (ratingResemblance * 0.5);
    }
}

module.exports = AutoEntertain; // Export the AutoEntertain class for external use
