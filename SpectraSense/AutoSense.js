// AlphaTech - AutoSense Module
// This module is designed for predictive analysis using linked lists and binary search trees.
// Developed by AlphaTech Solutions

const db = require('./dbconfig'); // Import database configuration
const LinkedList = require('./LinkedList'); // Import LinkedList
const BST = require('./BST'); // Import Binary Search Tree (BST)

class AutoSense {
    /**
     * Constructor to initialize AutoSense with a type and set up data structures.
     * @param {string} type - The type of predictive data to fetch.
     */
    constructor(type) {
        this.type = type;
        this.featuresList = new LinkedList(); // Initialize an empty LinkedList for features
        this.featureTree = new BST(); // Initialize an empty BST for feature contributions
    }

    /**
     * Fetches predictive data from the database based on the type and populates the linked list.
     * @returns {Promise<void>} - Resolves when data is successfully fetched and inserted into the list.
     */
    fetchData() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT feature_name, coefficient, feature FROM predictive_data WHERE type = ?';
            db.query(sql, [this.type], (err, results) => {
                if (err) {
                    reject(err); // Reject the promise with an error if query fails
                } else {
                    if (results.length > 0) {
                        // Insert each row into the linked list
                        results.forEach(row => {
                            this.featuresList.insert(row.feature_name, row.coefficient, row.feature);
                        });
                        resolve(); // Resolve when all data is inserted
                    } else {
                        reject(new Error('Invalid type provided or no data available for this type')); // Reject if no data found
                    }
                }
            });
        });
    }

    /**
     * Predicts a value based on the sum of coefficients multiplied by features in the linked list.
     * @returns {number} - The predicted value.
     */
    predict() {
        let prediction = 0;
        let current = this.featuresList.head; // Start at the head of the linked list
        while (current) {
            prediction += current.coefficient * current.feature; // Add each feature's contribution to the prediction
            current = current.next; // Move to the next node
        }
        return prediction; // Return the final prediction value
    }

    /**
     * Explains the prediction by identifying the most influential feature.
     * Populates the BST with contributions and finds the maximum contribution.
     * @returns {Object} - An object containing the most influential feature and its contribution.
     */
    explainPrediction() {
        let current = this.featuresList.head; // Start at the head of the linked list
        while (current) {
            const contribution = current.coefficient * current.feature; // Calculate the contribution of each feature
            this.featureTree.insert(current.featureName, contribution); // Insert the contribution into the BST
            current = current.next; // Move to the next node
        }

        // Find the feature with the maximum contribution
        const mostImportant = this.featureTree.findMaxContribution();
        console.log(`The prediction is most influenced by ${mostImportant.featureName} with a contribution of ${mostImportant.contribution}.`);
        
        // Return the most influential feature and its contribution
        return {
            mostInfluentialFeature: mostImportant.featureName,
            contribution: mostImportant.contribution
        };
    }
}

module.exports = AutoSense; // Export the AutoSense class for external use
