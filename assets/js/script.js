document.getElementById('search-form').addEventListener('submit', handleSearch);



function handleSearch(e) {
  e.preventDefault();
  const city = document.getElementById('city').value;
  getWeather(city);
  addToSearchHistory(city);
}



function addToSearchHistory(city) {
  const searchHistory = document.getElementById('search-history');
  const listItem = document.createElement('li');
  listItem.textContent = city;
  listItem.addEventListener('click', () => getWeather(city));
  searchHistory.appendChild(listItem);
}



function getWeather(city) {
  const apiKey = '2492eedfe21b7b17d9d60c2588ca4b5f';
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => displayCurrentWeather(data))
    .catch(error => console.error('Error fetching current weather data:', error));


  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(error => console.error('Error fetching forecast data:', error));
}



function displayCurrentWeather(data) {
  const currentWeather = document.getElementById('current-weather');
  const date = new Date(data.dt * 1000);
  const temperature = (data.main.temp - 273.15).toFixed(1);
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;



  currentWeather.innerHTML = `
    <h2>${data.name} (${date.toLocaleDateString()})</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;

}



function displayForecast(data) {
  const forecast = document.getElementById('forecast');
  fiveday.innerHTML = '<h2>5-Day Forecast</h2>';

  data.list.forEach((item, index) => {
    if (index % 8 === 0) {
      const date = new Date(item.dt * 1000);
      const temperature = (item.main.temp - 273.15).toFixed(1);
      const iconUrl = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;


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