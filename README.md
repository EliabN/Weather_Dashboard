# Weather Dashboard
Weather app is an application that provides current and future weather forecasts in cities to in the browser and dynamically updated HTML and CSS using third-Party APIs

Visit the page [here](https://eliabn.github.io/Weather_Dashboard/)
## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Preview

The following image shows the web application's appearance and functionality: click to visit page

[![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./assets/06-server-side-apis-homework-demo.png)](https://eliabn.github.io/Weather_Dashboard/)

## How application is created (extra info)

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).
