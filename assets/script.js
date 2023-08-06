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
    }
    console.log(city);
}
