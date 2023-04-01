// Add submit event listener to the search form and handle the search
document.getElementById('search-form').addEventListener('submit', handleSearch);

// Handle the search event, fetch weather data, and update search history
function handleSearch(e) {
  e.preventDefault(); // Prevent default form submission behavior
  const city = document.getElementById('city').value; // Get the input city name
  getWeather(city); // Fetch weather data for the input city
  addToSearchHistory(city); // Add the input city to search history
  document.getElementById('search-form').reset(); // Reset the search form
}

// Add a city to the search history list
function addToSearchHistory(city) {
  const searchHistory = document.getElementById('search-history'); // Get the search history element
  const listItem = document.createElement('li'); // Create a new list item
  listItem.textContent = city; // Set the text content to the city name
  listItem.addEventListener('click', () => getWeather(city)); // Add click event listener to fetch weather on click
  searchHistory.appendChild(listItem); // Append the new list item to the search history
}

// Fetch and display current weather and forecast data for a given city
function getWeather(city) {
  const apiKey = '2492eedfe21b7b17d9d60c2588ca4b5f'; // API key for OpenWeatherMap
  // URL for current weather and forecast data
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Fetch current weather data and display it
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => displayCurrentWeather(data))
    .catch(error => alert('Failed to fetch current weather data. Please try again later.'));

  // Fetch forecast data and display it
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(error => alert('Failed to fetch current weather data. Please try again later.'));
}

// Display current weather data on the page
function displayCurrentWeather(data) {
  const currentWeather = document.getElementById('current-weather'); // Get the current weather container element
  const date = new Date(data.dt * 1000); // Convert timestamp to Date object
  const temperature = (data.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius and format
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Icon URL for weather conditions

  // Set innerHTML to display the current weather data
  currentWeather.innerHTML = `
    <h2>${data.name} (${date.toLocaleDateString()})</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

// Display forecast data on the page
function displayForecast(data) {
  const fiveday = document.getElementById('fiveday'); // Get the five-day forecast container element
  forecast.innerHTML = ''; // Clear previous forecast data
  fiveday.innerHTML = '<h2>5-Day Forecast</h2>'; // Add forecast header

  // Iterate over forecast data and display each day's forecast
  data.list.forEach((item, index) => {
    // Display forecast data for every 8th item (i.e., every 3 hours) to get a daily forecast
    if (index % 8 === 0) {
      const date = new Date(item.dt * 1000); // Convert timestamp to Date object
      const temperature = (item.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius and format
      const iconUrl = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`; // Icon URL for weather conditions

      // Append forecast data for each day to the forecast container using template literals
      forecast.innerHTML += `
        <div>
          <h3>${date.toLocaleDateString()}</h3>
          <img src="${iconUrl}" alt="${item.weather[0].description}">
          <p>Temperature: ${temperature}°C</p>
          <p>Wind Speed: ${item.wind.speed} m/s</p>
          <p>Humidity: ${item.main.humidity}%</p>
        </div>
      `;
    }
  });
}
