function formatDate(date) {
  let hours = ((date.getHours() + 11) % 12) + 1;
  if (hours < 12) {
    hours = `${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayList = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayList];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-value").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "42e6bc06b4b0dadbd7f47c9b7345f143";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "42e6bc06b4b0dadbd7f47c9b7345f143";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
//challenges
