const apiKey = "9da786b1d75fd98f0003f008078df910";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const cities = {
  London: 'London',
  Kyiv: 'Kyiv',
  Tokyo: 'Tokyo',
  Berlin: 'Berlin',
  Dnipro: 'Dnipro'
};

const select = document.getElementById('city-select');
for (let city in cities) {
  let option = document.createElement('option');
  option.value = city;
  option.textContent = cities[city];
  select.appendChild(option);
}
document.getElementById('select-container').appendChild(select);

function showWeather(data) {
  document.getElementById('weather-output').innerHTML =
    '<div class="city">' + data.name + '</div>' +
    '<div><img class="weather-icon" src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="icon"> ' + data.weather[0].description + '</div>' +
    '<hr>' +
    '<div>Temperature: ' + data.main.temp + ' °C</div>' +
    '<div>Wind speed: ' + data.wind.speed + ' m/s</div>';
}

function getWeather(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&lang=en')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showWeather(data);
    })
    .catch(function(error) {
      document.getElementById('weather-output').innerHTML = 'Error loading weather data.';
      console.error(error);
    });
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('Hello', select.value)
  getWeather(select.value);
});

select.addEventListener('change', function() {
  document.getElementById('weather-output').innerHTML = 'Loading...';
  getWeather(select.value);
});