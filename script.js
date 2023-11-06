let getweather = document.getElementById("getweather");
let searchValue = document.getElementById("search");
let searchInput = document.getElementById("searchInput");
let locationName = document.getElementById("locationTitle");
let rigionTitle = document.getElementById("regionTitle");
let forCastText = document.getElementById("forCastText");
let forCastIconDiv = document.getElementById("forCastIconDiv");
let tempNumbers = document.getElementById("tempNumbersConatiner");
let dateTimeDiv = document.getElementById("dateTimeDiv");
let humidity = document.getElementById("humidityDiv");
let wind = document.getElementById("windDiv");
let cloud = document.getElementById("cloudDiv");
let UVIndex = document.getElementById("UVIndexDiv");
let feelsTemp = document.getElementById("feelsTempDiv");
let longitude = document.getElementById("longitudeDiv");
let latitude = document.getElementById("latitudeDiv");

searchValue.addEventListener("click", () => {
  let inputValue = searchInput.value;
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=ab32a1cadd734098b0243146230111&q=${inputValue}&aqi=no`
  )
    .then((res) => res.json())
    .then((json) => {
      data = json;
      console.log(data);
      locationName.innerHTML = data.location.name;
      rigionTitle.innerHTML = data.location.country;
      forCastText.innerHTML = data.current.condition.text;
      console.log(rigionTitle.value);

      forCastIconDiv.innerHTML = null;
      let forCastIcon = document.createElement("img");
      forCastIcon.className = "forCastImage";
      forCastIcon.src += data.current.condition.icon;
      forCastIconDiv.appendChild(forCastIcon);
      tempNumbers.innerHTML = data.current.temp_c;

      dateTimeDiv.innerHTML = data.location.localtime;
      humidity.innerHTML = data.current.humidity;
      windDiv.innerHTML = data.current.wind_kph;
      cloud.innerHTML = data.current.cloud;
      UVIndex.innerHTML = data.current.uv;
      feelsTemp.innerHTML = data.current.feelslike_c;
      latitude.innerHTML = data.location.lat;
      longitude.innerHTML = data.location.lon;
    });

  async function getWeatherData(city) {
    const apiKey = "ab32a1cadd734098b0243146230111";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function displayWeatherData(data) {
    const weatherContainer = document.getElementById("weather-container");

    weatherContainer.innerHTML = "";

    if (data.forecast) {
      data.forecast.forecastday.forEach((forecast) => {
        const date = new Date(forecast.date);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const temperature = forecast.day.avgtemp_c;

        const dayWeather = document.createElement("div");
        dayWeather.classList.add("day-weather");

        dayWeather.innerHTML = `
                                <div class="daysWeatherDiv">
                                <div><img src="${forecast.day.condition.icon}" alt="" /></div>
                                <div class="dayNameDiv">${day}</div>
                                <div class="dayDiv">${temperature}°C</div>
                                <div class="dayDiv">${forecast.day.condition.text}</div>
                                </div>
                            `;

        weatherContainer.appendChild(dayWeather);
      });
    } else {
      console.error("No forecast data available for the provided location.");
    }
  }

  getWeatherData(searchInput.value);
});
