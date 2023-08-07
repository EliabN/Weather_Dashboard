const apiKey = 'fa2010b8940dd9610445d3e38eaccf79'

// Name of city
var cityInput = document.getElementById('city-input');

var displayError = document.getElementById("error-message")

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
        displayError.style.visibility = "visible";
    } else {
        console.log("Got city");
        getWeather(city);
    }
    console.log(city);
}


// Fetch the weather
function getWeather(city) {

    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=en&units=metric&appid=' + apiKey

    fetch(url)
      .then((resp) => {
        console.log(resp);
        // If city not found display message
        if (resp.status === 404) {
            console.log("Not Found")
            displayError.style.visibility = "visible";
        }
        
        // If any error display in console
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
    // Display message if city is found
    displayError.style.visibility = "visible";
    displayError.textContent = "Search successful!"
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
