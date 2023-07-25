async function fetchWeatherData(city, zip) {
  const apiKey = "056e5a496ed237e46fe2e65ead648222";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&`;

  if (zip) {
    apiUrl += `zip=${zip},us`;
  } else {
    apiUrl += `q=${city}`;
  }

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    alert(
      "Error fetching weather data. Please check your input and try again."
    );
    console.error(error);
  }
}

function updateBackgroundImage(data) {
  const weatherElement = document.querySelector(".bg-cover");
  const weatherDisplay = document.getElementById("weather");
  const cityName = data.name;
  const weather = data.weather[0].main;
  const windSpeed = data.wind.speed * 2.237; // Convert wind speed to mph

  let backgroundImage, iconImage, weatherDesc;

  if (windSpeed > 20) {
    backgroundImage = "static/images/windy.jpg";
    iconImage = "static/images/wind-icon.svg";
    weatherDesc = "Windy";
  } else {
    switch (weather.toLowerCase()) {
      case "clouds":
        backgroundImage = "static/images/cloudy.jpg";
        iconImage = "static/images/cloud-icon.svg";
        weatherDesc = "Cloudy";
        break;
      case "rain":
        backgroundImage = "static/images/rainy.jpg";
        iconImage = "static/images/rain-icon.svg";
        weatherDesc = "Raining";
        break;
      case "snow":
        backgroundImage = "static/images/snowy.jpg";
        iconImage = "static/images/snow-icon.svg";
        weatherDesc = "Snowing";
        break;
      case "thunderstorm":
        backgroundImage = "static/images/stormy.jpg";
        iconImage = "static/images/storm-icon.svg";
        weatherDesc = "Thunderstorming";
        break;
      default:
        backgroundImage = "static/images/sunny.jpg";
        iconImage = "static/images/sun-icon.svg";
        weatherDesc = "Clear";
        break;
    }
  }

  weatherElement.style.backgroundImage = `url(${backgroundImage})`;
  weatherDisplay.innerHTML = `
        <div class="flex justify-center items-end space-x-4 mb-5">
            <div class="flex flex-col items-end">
                <h1 class="text-base md:text-lg whitespace-nowrap">Right now in</h1>
                <h1 class="text-base md:text-lg whitespace-nowrap">${cityName}, it's</h1>
            </div>
            <div class="flex flex-col items-center self-end">
                <img class="w-[100px] h-[100px] animate__animated animate__heartBeat bgimg" src="${iconImage}" alt="${weatherDesc}">
                <h2 class="-mt-4 tracking-wider text-sm md:text-base" id="wdesc">${weatherDesc}!</h2>
            </div>
        </div>
    `;
  weatherDisplay.classList.add("relative", "bottom-24");
}

function getTemperature(data) {
  const temperatureElement = document.getElementById("temperature");
  const temp = convertKelvinToFahrenheit(data.main.temp);
  const tempMin = convertKelvinToFahrenheit(data.main.temp_min);
  const tempMax = convertKelvinToFahrenheit(data.main.temp_max);
  const feelsLike = convertKelvinToFahrenheit(data.main.feels_like);

  temperatureElement.innerHTML = `
        <div class="flex flex-col items-end">
            <div>Temperature: <span class="text-cyan-400">${temp}°F</span></div>
            <div>(Feels like): <span class="text-green-500" id="temp">${feelsLike}°F</span></div>
        </div>
        <div>
            <div class="mx-[1ch]">|</div>
            <div class="mx-[1ch]">|</div>
        </div>
        <div class="flex flex-col">
            <div>Min: <span class="text-blue-500">${tempMin}°F</span></div>
            <div>Max: <span class="text-red-500">${tempMax}°F</span></div>
        </div>
    `;
  temperatureElement.classList.add("relative", "bottom-24");
}

function convertKelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32);
}

async function fetchAndUpdateWeather(city, zip) {
  if (!city && !zip) {
    alert("Please enter a city or zip code.");
    return false;
  }

  const data = await fetchWeatherData(city, zip);
  if (data) {
    updateBackgroundImage(data);
    getTemperature(data);
    return true;
  }
  return false;
}
