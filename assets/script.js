const apiKey = 'fa2010b8940dd9610445d3e38eaccf79'

// Name of city
var cityInput = document.getElementById('city-input');

// Search button clicked
document.querySelector('.search-btn').addEventListener('click', getName);

// Get error-message element
var displayError = document.getElementById("error-message");

// Function to add event listener to city buttons
function addCityButtonListener() {
    // Get all elements with the class "recent-btn"
    var  recentBtns = document.querySelectorAll("#recent-btn");

    // Loop through each element and add the event listener
    recentBtns.forEach((recentBtn) => {
        recentBtn.addEventListener("click", displayRecent);
    });
}
  
// Call the function to add event listeners to existing buttons on page load
addCityButtonListener();

// Get name of city from input
function getName(event) {
    event.preventDefault();
    // Get city name
    var city = cityInput.value;

	// Test city
    //city = "Sydney";
    
    // Check text entered
    if (city === "") {
        console.log("Enter City");
        // Display error
        displayError.style.visibility = "visible";
    } else {
        console.log("Got city");
        // Call functions to fetch api data
        getWeather(city);
        getForecast(city)
    }
    // City name
    console.log(city);
}


// Fetch the weather response
function getWeather(city) {
    // url to fetch
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=en&units=metric&appid=' + apiKey

    fetch(url)
      .then((resp) => {
        //console.log(resp);
        // If city not found display message
        if (resp.status === 404) {
            console.log("Not Found")
            // Display error
            displayError.style.visibility = "visible";
        }
        
        // If any error display in console
        if (!resp.ok) {
          throw new Error("Weather data could not be fetched. Status: " + resp.statusText);
        }

        // covert and return json data type
        return resp.json();
      })
      .then((data) => {
        // Json data
        //console.log(data);

        // Handle the fetched weather data here
        displayWeather(data)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        // Handle the error here or display an error message to the user
    });
}



function displayWeather(data) {
    // Display successful message if city is found
    displayError.style.visibility = "visible";
    displayError.textContent = "Search successful!"

    // Covert dt to Date "ddd, MMM, DD"
    let date = new Date(data.dt *1000);

    // Main weather information
    let main = data.main

    // Select the "city-info" card
    let display = document.querySelector('.city-info')

    // Replace with ne html
    display.innerHTML = `<h1 class="city-date m-2 card-header">${data.name} ${date.toDateString()}</h1>
    <div class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-3">
        <p id="t">Temp: ${Math.round(main.temp)}°C</p>
        <p id="w">Wind: ${data.wind.speed}</p>
        <p id="h">Humidity: ${main.humidity}%</p>
        <P id="d">Desc: ${data.weather[0].main}</P>
        <button class="btn btn-primary">More info.</button>
    </div>
    <div class="info-icon col-6 col-sm-6 col-md-6 col-lg-4 col-xl-2 mb-3">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" class="city-info-img" alt="Weather icon"/>
    </div>`;

    // Get the recent element buttons
    let resentBtns = document.getElementById('recent');
    var children = resentBtns.children;

    //console.log(children);

    // Flag to check if city is already present
    let isCityPresent = false;

    // For loop to check if city button exists 
    for (let i = 0; i < children.length; i++) {
        let recentCity = children[i].children[0].innerText.toLowerCase();
        if (data.name.toLowerCase() === recentCity) {
          isCityPresent = true;
          break; // Exit the loop early, as we found a match
        }
    }

    // Check if the city is not present, then add a new button
    if (!isCityPresent) {
        // Get search section in html
        let searchSec = document.getElementById('recent');
      
        // Button property
        let recent = `<button id="recent-btn" class="btn  btn-secondary w-100 text-white">${data.name}</button>`;
      
        // Create and add button property to div
        let recentBtn = document.createElement("div");
        recentBtn.innerHTML = recent;
      
        // Display button
        searchSec.appendChild(recentBtn);

        // Add the event listener to the new button
        recentBtn.addEventListener("click", displayRecent);
    }
}

// Fetch the forecast
function getForecast(city) {
    // url to fetch
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=en&units=metric&appid=' + apiKey

    fetch(url)
      .then((resp) => {
        //console.log(resp);
        if (!resp.ok) {
            // Display error
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
    //console.log(data)
    // Select the "forecast-cards" element
    let card = document.querySelector('.forecast-cards')

    // Collection index
    let index = -1
    card.innerHTML = data.list.map(day => {
        // Index plus 1
        index++

        // Store time of the day
        let time = data.list[index].dt_txt.split(" ")[1];

        // If of the day is noon
        if (time === '12:00:00') {
            // Weather property of each day
            let day = data.list[index]

            // Store date of day "ddd, mmm, DD"
            let date = new Date(day.dt *1000).toDateString().split(' 20')[0];

            // Replace with ne html
            return `<div class="col-12 col-md-6 col-lg-4 col-xl-2 mb-3">
            <div class="p-3 text-white">
                <h3 class="card-header ">${date}</h3>
                <div class="col-12">
                  <div class="forecast-details rounded-2 row align-items-center">
                    <div class="col">
                      <p id="T">Temp: ${Math.round(day.main.temp)}°C</p>
                      <p id="W">Wind: ${day.wind.speed}mph</p>
                      <p id="H">Humidity: ${day.main.humidity}%</p>
                      <P id="d">Desc: ${day.weather[0].main}</P>
                    </div>
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-12 mb-3">
                      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="city-info-img justify-content-center" alt="Weather icon" />
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-block btn-primary w-75 justify-content-center text-center m-3 mx-auto">Learn more.</button>
                    </div>
                  </div>
                </div>
            </div>
            </div>`
        }
    }).join(' ');
}

function displayRecent(event) {
    // Get name of city
    let cityName = event.target.innerText;

    // Test name
    //cityName = "Perth"

    // Call functions
    getWeather(cityName);
    getForecast(cityName);
}


// Fist initial search on page load
function firstCity() {
    // City name
    cityName = "Sydney";

    // Call functions
    getWeather(cityName);
    getForecast(cityName);
}

// Search first city
firstCity();

// Perform the redirection
function navigateToURL(url) {
    window.open(url, '_blank');
    return false;
}

// Get all the buttons with the specified class
const buttons = document.querySelectorAll('.btn-primary');

// Function to handle button click and perform redirection
function redirect(event) {
    event.preventDefault()
    console.log('url');
    // Get the URL from the data-url attribute of the clicked button
    const url = event.target.dataset.url;
  
    // Perform the redirection
    window.open(url);
  
    // Log a message to verify that the function is executed upon button click
    console.log('url');
  
    // Prevent the default behavior of the button click (optional)
    return false;
}

// Or you can directly use the parent element without the function
function navigateToURL(event, url) {
    // Get the URL from the data-url attribute of the clicked button
    //const url = event.target.dataset.url;
  
    // Perform the redirection
    window.open(url, '_blank');
  
    // Trigger the parent article's click event
    event.target.parentNode.click();
}

// Loop through all buttons and add the click event listener
buttons.forEach((button) => {
    console.log('url');
    button.addEventListener('click', redirect);
});



