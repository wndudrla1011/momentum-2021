const API_KEY = "f284512523d9d2914d540027ea516b78";
const forecast = document.querySelector("#weather");
const weather = document.querySelector("#weather span:first-child");

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} ${data.main.temp}°C`;
      const sky = data.weather[0].main;
      paintIcon(sky);
    });
}

function paintIcon(sky) {
  const weatherIcon = document.createElement("i");
  weather.appendChild(weatherIcon);
  if (sky === "Clear") {
    weatherIcon.setAttribute("class", "far fa-sun");
  } else if (
    sky === "scattered clouds" ||
    sky === "few clouds" ||
    sky === "broken clouds" ||
    sky === "overcast clouds"
  ) {
    weatherIcon.setAttribute("class", "fas fa-cloud");
  } else if (
    sky === "shower rain" ||
    sky === "light rain" ||
    sky === "moderate rain" ||
    sky === "Rain"
  ) {
    weatherIcon.setAttribute("class", "fa-cloud-showers-heavy");
  } else if (sky === "Thunderstorm") {
    weatherIcon.setAttribute("class", "fas fa-poo-storm");
  } else if (sky === "snow") {
    weatherIcon.setAttribute("class", "fas fa-snowflake");
  } else {
    weatherIcon.setAttribute("class", "fas fa-smog");
  }
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
