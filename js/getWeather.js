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
    const weather = data.weather[0].main.toLowerCase();
    const windSpeed = data.wind.speed * 2.237; // Convert wind speed to mph

    let backgroundImage;

    if (windSpeed > 20) {
        backgroundImage = "static/images/windy.jpg";
    } else {
        switch (weather) {
            case "clouds":
                backgroundImage = "static/images/cloudy.jpg";
                break;
            case "rain":
                backgroundImage = "static/images/rainy.jpg";
                break;
            case "snow":
                backgroundImage = "static/images/snowy.jpg";
                break;
            case "thunderstorm":
                backgroundImage = "static/images/stormy.jpg";
                break;
            default:
                backgroundImage = "static/images/sunny.jpg";
                break;
        }
    }

    weatherElement.style.backgroundImage = `url(${backgroundImage})`;
}

function getTemperature(data) {
    const temperatureElement = document.getElementById("temperature");
    const weatherDescription = data.weather[0].main;
    const weatherDetails = data.weather[0].description;
    
    const temp = convertKelvinToFahrenheit(data.main.temp);
    const tempMin = convertKelvinToFahrenheit(data.main.temp_min);
    const tempMax = convertKelvinToFahrenheit(data.main.temp_max);
    const feelsLike = convertKelvinToFahrenheit(data.main.feels_like);

    temperatureElement.innerHTML = `
        <div class="flex flex-col items-end">
            <div>Temperature: <span class="text-cyan-400">${temp}°F</span></div>
            <div>(Feels like): <span class="text-green-500">${feelsLike}°F</span></div>
        </div>
        <div>
            <div class="mx-[1ch]">|</div>
            <div class="mx-[1ch]">|</div>
        </div>
        <div class="flex flex-col">
            <div>Min: <span class="text-red-500">${tempMin}°F</span></div>
            <div>Max: <span class="text-blue-500">${tempMax}°F</span></div>
        </div>  
    `;
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
