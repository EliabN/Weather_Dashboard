const apiKey = 'fa2010b8940dd9610445d3e38eaccf79'

// Name of city
var cityInput = document.getElementById('city-input');

// Search button clicked
document.querySelector('.search-btn').addEventListener('click', getName);

getName()
function getName() {
    //event.preventDefault();
    // Get city name
    var city = cityInput.value;

    // Test city
    city = "Sydney";

    if (city === "") {
        console.log("Enter City");
    } else {
        console.log("Got city");
        //getWeather(city);
        getForecast(city)
    }
    console.log(city);
}


// Fetch the weather
function getWeather(city) {

    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=en&units=metric&appid=' + apiKey

    fetch(url)
      .then((resp) => {
        console.log(resp);
        if (!resp.ok) {
          throw new Error("Weather data could not be fetched. Status: " + resp.statusText);
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        // Handle the fetched weather data here
        displayWeather(data)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        // Handle the error here or display an error message to the user
});
}



function displayWeather(data) {
    console.log(data)
    let date = new Date(data.dt *1000);
    console.log(date)

    // Weather information
    let main = data.main

    let display = document.querySelector('.city-info')

    display.innerHTML = `<h1 class="city-date p-0">${data.name} ${date.toDateString()}</h1>
    <p id="T">Temp: ${main.temp}°C</p>
    <p id="W">Wind: ${data.wind.speed} mph</p>
    <p id="H">Humidity: ${main.humidity}%</p>
    <button class="btn btn-primary">More info.</button>`
}









// Fetch the forecast
function getForecast(city) {

    let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=en&units=metric&appid=' + apiKey

    fetch(url)
      .then((resp) => {
        //console.log(resp);
        if (!resp.ok) {
          throw new Error("Weather data could not be fetched. Status: " + resp.statusText);
        }
        return resp.json();
      })
      .then((data) => {
        // Handle the fetched weather data here
        displayForecast(data)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        // Handle the error here or display an error message to the user
});
}

function displayForecast(data) {
    console.log(data)

    // Weather information
    let main = data.list[0].dt_txt

    //let time = data.list[0].dt_txt.split(" ")[1]

    //console.log(time)

    let card = document.querySelector('.forecast-cards')

    let temp = -1
    card.innerHTML = data.list.map(day => {
        temp++
        let time = data.list[temp].dt_txt.split(" ")[1]
        if (time === '12:00:00') {
            return `<p id="T">Temp: ${temp}*</p>`
        } 

        
        
    }).join(' ');
}

