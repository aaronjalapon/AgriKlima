function getWeatherSuggestions() {
    document.getElementById('loading').classList.remove('hidden');
    setTimeout(() => {
        displayWeatherInfo(mockWeatherData);
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
}

function displayWeatherInfo(data) {
    // Display current weather
    const currentWeather = document.getElementById('current-weather');
    currentWeather.classList.remove('hidden');
    
    document.getElementById('location-display').textContent = "Your Location";
    document.getElementById('temperature').innerHTML = `<strong>Temperature:</strong> ${data.current.temperature}°C ${data.current.icon}`;
    document.getElementById('humidity').innerHTML = `<strong>Humidity:</strong> ${data.current.humidity}%`;
    document.getElementById('wind-speed').innerHTML = `<strong>Wind Speed:</strong> ${data.current.windSpeed} km/h`;

    // Display forecast
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = data.forecast.map(day => `
        <div class="forecast-card">
            <h4>${day.day}</h4>
            <p>${day.icon} ${day.temperature}°C</p>
            <p>${day.condition}</p>
            <p>Humidity: ${day.humidity}%</p>
        </div>
    `).join('');

    // Display recommendations
    const actionsList = document.getElementById('weather-actions');
    actionsList.innerHTML = data.agriculturalSuggestions.actions.map(action => 
        `<li>${action}</li>`
    ).join('');

    const cropGrid = document.getElementById('crop-grid');
    cropGrid.innerHTML = data.agriculturalSuggestions.recommendedCrops.map(crop => `
        <div class="crop-card">
            <h4>${crop.icon} ${crop.name}</h4>
            <p>Suitability: ${crop.suitability}</p>
        </div>
    `).join('');

    const prepSteps = document.getElementById('prep-steps');
    prepSteps.innerHTML = data.agriculturalSuggestions.preparationSteps.map(step => `
        <div class="prep-step">
            <p>${step}</p>
        </div>
    `).join('');

    // Handle seasonal alert
    const seasonAction = document.getElementById('season-action');
    if (data.seasonalAlert.actionRequired) {
        seasonAction.classList.remove('hidden');
        document.getElementById('season-message').textContent = data.seasonalAlert.message;
    }
}

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

window.onload = function() {
    getWeatherSuggestions();
};
