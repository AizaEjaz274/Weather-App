
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');

    if (searchButton && cityInput) {
        searchButton.addEventListener('click', function() {
            const city = cityInput.value;
            if (city) {
                fetchWeather(city);
            }
        });
    } else {
        console.error('Search button or city input element not found.');
    }
});

function fetchWeather(city) {
    const apiKey = 'd45d0f7c102841f6f2567fb905868776'; // Replace with your API key if needed
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.weather && data.weather.length > 0) {
                updateWeather(data);
                console.log(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
}

function updateWeather(data) {
    const weather = data.weather[0];
    document.getElementById('city').innerText = data.name;
    document.getElementById('temp').innerText = `${data.main.temp}°c`;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
}
