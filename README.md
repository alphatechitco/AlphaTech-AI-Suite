# AutoSense & AutoEntertain

**Developed by [AlphaTech Solutions](https://alphatechitco.netlify.app/)**

## Overview

AutoSense & AutoEntertain is a powerful project combining predictive analytics and media recommendation systems. Built with Node.js and Express, it utilizes custom data structures such as Linked Lists and Binary Search Trees to deliver insightful predictions and personalized movie suggestions.

### Features

- **AutoSense**: A predictive analysis tool that evaluates input features, calculates predictions, and provides explanations by identifying the most influential factors.
- **AutoEntertain**: A movie recommendation engine that suggests films based on genre similarity and user input, offering tailored entertainment options.

## Project Structure

- **`AutoEntertain.js`**: Manages the movie recommendation logic, including fetching and recommending movies based on user preferences.
- **`AutoSense.js`**: Handles predictive analysis by processing feature data, calculating predictions, and explaining the significant contributors.
- **`LinkedList.js`**: Implements a linked list to store and traverse feature data used in predictions.
- **`BST.js`**: Implements a binary search tree to manage feature contributions and determine the most impactful features in the prediction.
- **`public/`**: Contains static files like HTML, CSS, and JavaScript for the front end.
- **`server.js`**: The main Express server file that routes requests to the appropriate dimension (predictive analysis or entertainment).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alphatechitco/AlphaTech-AI-Suite.git
Navigate to the project directory:

cd SpectraSense
Install the required dependencies:

npm install
Set up your database configuration: Ensure your database connection settings are correctly configured in dbconfig.js.

Data for Database
Use The CSV files provided for standard data usage and test of project

Running the Project
Start the server:


node server.js
Access the application: Open your browser and navigate to http://localhost:8000.

Usage
Predictive Analysis (AutoSense)
Endpoint: POST /dimension
Payload:
{
  "dimension": "P",
  "key": "exampleKey"
}
Response: Returns a prediction and an explanation of the most influential feature.
Movie Recommendation (AutoEntertain)
Endpoint: POST /dimension
Payload:
{
  "dimension": "E",
  "key": "genreKey",
  "mediaInput": "exampleMovieTitle"
}
Response: Returns the selected movie and a list of similar recommendations based on genre and rating.
Example API Request
POST /dimension
Content-Type: application/json

{
    "dimension": "P",
    "key": "Finance",
    "mediaInput": "Inception"
}
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch:
git checkout -b feature-branch

Commit your changes:
git commit -am 'Add new feature'

Push to the branch:
git push origin feature-branch
Create a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or suggestions, please contact us at https://www.instagram.com/alphatechltdco/?igsh=MWtjanJrNzhmZjcx&utm_source=qr

AlphaTech - ReImagine

