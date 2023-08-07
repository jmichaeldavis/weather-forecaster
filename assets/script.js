var searchBar = document.querySelector("#search-bar");
var searchBtn = document.querySelector("#search-button");
var fiveDayForecastEl = document.querySelector("#day-forecast");

var weatherApiKey = '672c0e16208bfbcdccb5e0e26b7d03b2';

function getCoords() {
    var cityName = searchBar.value;
    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${weatherApiKey}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var latitude = data[0].lat;
            var longitude = data[0].lon;

            getWeather(latitude, longitude);
        })
}

function getWeather(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (i = 0; i < 5; i++) {
                var temperatureOfDayContainer = document.createElement('ul');
                var temperatureOfDayEl = document.createElement('li');
                var temperatureDescriptionEl = document.createElement('li');
                var tempMin = document.createElement('li');
                var tempMax = document.createElement('li');

                fiveDayForecastEl.appendChild(temperatureOfDayContainer);

                temperatureOfDayContainer.appendChild(temperatureOfDayEl);
                temperatureOfDayEl.textContent = `${data.list[i].main.temp}° F`;

                temperatureOfDayContainer.appendChild(temperatureDescriptionEl);
                temperatureDescriptionEl.textContent = `Expect ${data.list[i].weather[0].description} `;

                temperatureOfDayContainer.appendChild(tempMax);
                tempMax.textContent = `High of ${data.list[i].main.temp_max}° F`;

                temperatureOfDayContainer.appendChild(tempMin);
                tempMin.textContent = `Low of ${data.list[i].main.temp_min}° F`;

            }
        })

}

searchBtn.addEventListener("click", getCoords);
