async function getWeatherSuggestions() {
    try {
        const resultBox = document.getElementById('weather-result');
        resultBox.innerHTML = '<div class="loading"></div>';

        // Simulate weather API call
        const mockWeather = {
            temperature: 28,
            rainfall: 150,
            humidity: 75
        };

        const recommendations = await CropRecommender.recommend(mockWeather);
        
        resultBox.innerHTML = `
            <h3>Weather Analysis</h3>
            <p>Temperature: ${mockWeather.temperature}°C</p>
            <p>Rainfall: ${mockWeather.rainfall}mm</p>
            <p>Humidity: ${mockWeather.humidity}%</p>
            <h4>Recommended Crops:</h4>
            <ul>${recommendations.map(crop => 
                `<li>${crop.charAt(0).toUpperCase() + crop.slice(1)}</li>`
            ).join('')}</ul>
        `;
    } catch (error) {
        console.error(error);
        resultBox.innerHTML = '<div class="error">Error fetching weather data</div>';
    }
}

window.onload = function() {
    getWeatherSuggestions();
};
