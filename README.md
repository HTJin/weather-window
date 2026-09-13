# Weather Window

Open the curtains, see the weather. A single-page app that shows the current conditions and
temperature for a city or US zip code, then plays a song that fits the weather.

## What it does

- A window with curtains. Type a city or a 5-digit zip code, press Enter or pull the curtains,
  and the window opens on the current weather.
- Input validation for city names and zip codes.
- A track chosen to match the conditions plays while the window is open. Click the window to
  close it and reset.

## How it works

No framework and no build step: `index.html`, one stylesheet, three scripts.

| File | Job |
|---|---|
| `js/getWeather.js` | Calls the OpenWeatherMap current-weather endpoint by city or zip and reads back conditions and temperature |
| `js/getSpotifySong.js` | Searches the Spotify Web API for a track that matches the condition and starts playback |
| `js/windowControl.js` | The curtain and window animation, input handling and validation |

## Run it

Open `index.html` in a browser. The scripts expect an OpenWeatherMap API key and Spotify
client credentials; set them in the two `js/get*.js` files before use.

## APIs

- [OpenWeatherMap](https://openweathermap.org/api), current weather by city or zip
- [Spotify Web API](https://developer.spotify.com/documentation/web-api), track search and playback
