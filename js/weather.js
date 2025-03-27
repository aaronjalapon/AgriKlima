let currentWeatherData = null;

const weatherElements = {
    input: document.querySelector('[data-weather-input]'),
    searchBtn: document.querySelector('[data-weather-search]'),
    refreshBtn: document.querySelector('[data-weather-refresh]'),
    loading: document.getElementById('loading'),
    currentWeather: document.getElementById('current-weather'),
    forecast: document.getElementById('forecast'),
    weatherResult: document.getElementById('weather-result')
};

function toggleLoading(show) {
    weatherElements.loading.classList.toggle('hidden', !show);
    weatherElements.currentWeather.classList.toggle('hidden', show);
    weatherElements.weatherResult.classList.toggle('hidden', show);
}

async function getWeatherSuggestions() {
    const location = weatherElements.input.value.trim();
    if (!location) {
        alert('Please enter a location');
        return;
    }

    toggleLoading(true);

    try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1500));
        currentWeatherData = getMockWeatherData(); // Update to store in the global variable
        displayWeatherInfo(currentWeatherData);
        displaySuggestions(currentWeatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    } finally {
        toggleLoading(false);
    }
}

function displayWeatherInfo(data) {
    const { temperature, humidity, windSpeed, condition } = data.current;
    
    document.getElementById('location-display').textContent = weatherElements.input.value;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind: ${windSpeed} km/h`;
    
    weatherElements.currentWeather.classList.remove('hidden');
}

function displaySuggestions(data) {
    // Display weather-based suggestions
    const actionsList = document.getElementById('weather-actions');
    const cropGrid = document.getElementById('crop-grid');
    const prepSteps = document.getElementById('prep-steps');

    // Clear previous content
    actionsList.innerHTML = '';
    cropGrid.innerHTML = '';
    prepSteps.innerHTML = '';

    // Add actions
    data.suggestions.actions.forEach(action => {
        actionsList.innerHTML += `<li>${action}</li>`;
    });

    // Add recommended crops
    data.suggestions.crops.forEach(crop => {
        cropGrid.innerHTML += `
            <div class="crop-card">
                <h4>${crop}</h4>
                <p>Suitable for current weather conditions</p>
            </div>
        `;
    });

    // Add preparation steps with timeline
    const prepStepsData = [
        { step: 'Soil Preparation', timing: 'Immediate' },
        { step: 'Planting Schedule', timing: 'Within 3 days' },
        { step: 'Irrigation Setup', timing: 'Within 1 week' }
    ];

    prepStepsData.forEach((step, index) => {
        prepSteps.innerHTML += `
            <div class="prep-step">
                <h4>Step ${index + 1}: ${step.step}</h4>
                <small>Timeline: ${step.timing}</small>
            </div>
        `;
    });

    weatherElements.weatherResult.classList.remove('hidden');
}

function refreshWeather() {
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.classList.remove('hidden');
    
    // Simulate API call with mock data
    setTimeout(() => {
        currentWeatherData = getMockWeatherData(); // Use the function instead of undefined variable
        updateWeatherDisplay(currentWeatherData);
        loadingSpinner.classList.add('hidden');
    }, 1000);
}

function updateWeatherDisplay(data) {
    const currentWeather = document.getElementById('current-weather');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    currentWeather.classList.remove('hidden');
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.current.icon}@2x.png" alt="Weather icon">`;
    temperature.textContent = `${data.current.temp}°C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeed.textContent = `Wind: ${data.current.windSpeed} km/h`;

    updateForecast(data.forecast);
}

function updateForecast(forecast) {
    const forecastContainer = document.getElementById('forecast');
    const forecastPeriod = document.getElementById('forecast-period').value;
    
    forecastContainer.innerHTML = '';
    forecast[forecastPeriod].forEach(day => {
        const card = createForecastCard(day);
        forecastContainer.appendChild(card);
    });
}

function createForecastCard(data) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
        <div class="date">${new Date(data.date).toLocaleDateString()}</div>
        <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon">
        <div class="temp">High: ${data.temp.max}°C | Low: ${data.temp.min}°C</div>
        <div class="humidity">Humidity: ${data.humidity}%</div>
    `;
    return card;
}

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

// Initialize weather display on page load
document.addEventListener('DOMContentLoaded', () => {
    refreshWeather();
    
    // Add forecast period change handler
    document.getElementById('forecast-period').addEventListener('change', () => {
        if (currentWeatherData) {
            updateForecast(currentWeatherData.forecast);
        }
    });
});

// Event Listeners
weatherElements.searchBtn.addEventListener('click', getWeatherSuggestions);
weatherElements.refreshBtn.addEventListener('click', getWeatherSuggestions);
weatherElements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeatherSuggestions();
});
