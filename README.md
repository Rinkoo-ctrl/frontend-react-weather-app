# Weather App

This project is a simple weather application built with React, allowing users to search for weather information by city name. It also features recent search history and a dark mode toggle.

**Live Demo:** [https://rinkooweatherapp.netlify.app/](https://rinkooweatherapp.netlify.app/)

## Features

-   **Weather Search:** Input a city and get current weather.
-   **Recent Searches:** Quick access to your last 5 searches.
-   **Dark Mode:** Switch between light and dark themes.
-   **Weather Details:** Temperature, humidity, wind, etc.
-   **Error Handling:** Shows messages for invalid cities or issues.
-   **Loading Indicator:** Shows when weather data is loading.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Rinkoo-ctrl/frontend-react-weather-app.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd frontend-react-weather-app
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Add your OpenWeatherMap API key:**

    -   Create a `.env.local` file.
    -   Add: `REACT_APP_API_KEY=your_api_key`.
    -   Get an API key from [OpenWeatherMap](https://openweathermap.org/).

5.  **Start the app:**

    ```bash
    npm start
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

-   `npm start`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
