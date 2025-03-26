const API_KEY = 'your_weather_api_key'; // Replace with actual API key

let priceChart = null;

async function updateDashboard() {
    const location = document.getElementById('farmer-location').value;
    const crop = document.getElementById('crop-select').value;
    
    if (!location || !crop) {
        alert('Please enter both location and crop');
        return;
    }

    try {
        await updateWeatherInfo(location);
        updateCropRecommendations(crop, location);
        updateFarmStats(crop);
        updateMarketPrices(crop);
        updateWeatherAlerts(location);
        updatePriceChart(crop);
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

async function updateWeatherInfo(location) {
    const weatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.querySelector('.forecast-items');
    
    try {
        const weather = await fetchWeatherData(location);
        weatherDiv.innerHTML = `
            <p class="temperature">${weather.temperature}°C</p>
            <p class="conditions">${weather.conditions}</p>
            <p class="humidity">Humidity: ${weather.humidity}%</p>
            <p class="wind">Wind: ${weather.windSpeed} km/h</p>
        `;
        
        forecastDiv.innerHTML = weather.forecast.map(day => `
            <div class="forecast-day">
                <span class="day">${day.date}</span>
                <span class="temp">${day.temperature}°C</span>
                <span class="condition">${day.conditions}</span>
            </div>
        `).join('');
    } catch (error) {
        weatherDiv.innerHTML = '<p class="error">Failed to load weather data</p>';
    }
}

async function updateCropRecommendations(location, crop) {
    const adviceDiv = document.getElementById('crop-advice');
    try {
        const recommendations = await fetchCropRecommendations(location, crop);
        adviceDiv.innerHTML = `
            <div class="recommendation-item">
                <h4>Current Season</h4>
                <p>Best crops to plant:</p>
                <ul>
                    ${recommendations.crops.map(c => `<li>${c.name} - ${c.reason}</li>`).join('')}
                </ul>
            </div>
            <div class="soil-conditions">
                <h4>Soil Conditions</h4>
                <p>pH Level: ${recommendations.soil.ph}</p>
                <p>Moisture: ${recommendations.soil.moisture}</p>
            </div>
        `;
    } catch (error) {
        adviceDiv.innerHTML = '<p class="error">Failed to load recommendations</p>';
    }
}

async function updateFarmStats(crop) {
    const yieldTracker = document.getElementById('yield-tracker');
    const resourceUsage = document.getElementById('resource-usage');
    
    try {
        const farmData = await fetchFarmStats(crop);
        
        yieldTracker.innerHTML = `
            <h4>Current Yield</h4>
            <div class="yield-metrics">
                <div class="metric">
                    <span class="label">Total Area:</span>
                    <span class="value">${farmData.area} hectares</span>
                </div>
                <div class="metric">
                    <span class="label">Expected Yield:</span>
                    <span class="value">${farmData.expectedYield} tons/hectare</span>
                </div>
                <div class="metric">
                    <span class="label">Growth Stage:</span>
                    <span class="value">${farmData.growthStage}</span>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${farmData.growthProgress}%"></div>
                    </div>
                </div>
            </div>
        `;

        resourceUsage.innerHTML = `
            <h4>Resource Monitoring</h4>
            <div class="resource-metrics">
                ${Object.entries(farmData.resources).map(([resource, data]) => `
                    <div class="resource-item">
                        <span class="resource-name">${resource}</span>
                        <div class="progress-bar">
                            <div class="progress ${data.status}" style="width: ${data.usage}%"></div>
                        </div>
                        <span class="usage-value">${data.usage}%</span>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        yieldTracker.innerHTML = '<p class="error">Failed to load farm statistics</p>';
    }
}

async function updateMarketPrices(crop) {
    const priceDiv = document.getElementById('price-trends');
    
    try {
        const marketData = await fetchMarketPrices(crop);
        renderPriceChart(crop, marketData[0].priceHistory);
    } catch (error) {
        priceDiv.innerHTML = '<p class="error">Failed to load market prices</p>';
    }
}

async function updateWeatherAlerts(location) {
    const alertsFeed = document.getElementById('alerts-feed');
    
    try {
        const alerts = await fetchWeatherAlerts(location);
        
        if (alerts.length === 0) {
            alertsFeed.innerHTML = '<p class="no-alerts">No current weather alerts</p>';
            return;
        }

        alertsFeed.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.severity}">
                <div class="alert-header">
                    <h4>${alert.title}</h4>
                    <span class="alert-severity ${alert.severity}">${alert.severity}</span>
                </div>
                <p>${alert.message}</p>
                <div class="alert-footer">
                    <span class="alert-time">${formatTimeAgo(alert.timestamp)}</span>
                    <span class="alert-location">${alert.location}</span>
                </div>
                ${alert.recommendations ? `
                    <div class="alert-recommendations">
                        <h5>Recommended Actions:</h5>
                        <ul>
                            ${alert.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `).join('');
    } catch (error) {
        alertsFeed.innerHTML = '<p class="error">Failed to load weather alerts</p>';
    }
}

// Helper functions
async function fetchWeatherData(location) {
    // Replace with actual API call
    return {
        temperature: 28,
        conditions: 'Partly Cloudy',
        humidity: 75,
        windSpeed: 10,
        forecast: [
            { date: 'Mon', temperature: 29, conditions: 'Sunny' },
            { date: 'Tue', temperature: 28, conditions: 'Cloudy' },
            // Add more forecast days
        ]
    };
}

async function fetchCropRecommendations(location, crop) {
    // Simulate API call
    return {
        crops: [
            { name: 'Rice', reason: 'High yield potential' },
            { name: 'Corn', reason: 'Favorable conditions' },
        ],
        soil: {
            ph: '6.5 (Optimal)',
            moisture: 'Adequate'
        }
    };
}

async function fetchFarmStats(crop) {
    // Simulate API call
    return {
        area: 2.5,
        expectedYield: 4.2,
        growthStage: 'Vegetative',
        growthProgress: 65,
        resources: {
            'Water': { usage: 75, status: 'normal' },
            'Fertilizer': { usage: 60, status: 'warning' },
            'Pesticides': { usage: 45, status: 'good' }
        }
    };
}

async function fetchMarketPrices(crop) {
    // Simulate API call with more realistic price data
    const basePrice = {
        'rice': 45,
        'corn': 35,
        'vegetables': 60,
        'sugarcane': 30,
        'coconut': 40,
        'banana': 25,
        'mango': 80
    }[crop] || 50;

    // Generate slightly varying prices for the last 6 months
    const priceHistory = Array.from({length: 6}, (_, i) => {
        return basePrice + (Math.random() - 0.5) * 10;
    });

    return [{
        name: crop,
        currentPrice: priceHistory[priceHistory.length - 1],
        change: ((priceHistory[5] - priceHistory[4]) / priceHistory[4] * 100).toFixed(2),
        weeklyAverage: (priceHistory.reduce((a, b) => a + b, 0) / priceHistory.length).toFixed(2),
        priceHistory: priceHistory
    }];
}

async function fetchWeatherAlerts(location) {
    // Simulate API call
    return [
        {
            title: 'Heavy Rain Warning',
            severity: 'high',
            message: 'Expected rainfall of 100mm in the next 24 hours',
            timestamp: new Date().getTime() - 7200000,
            location: location,
            recommendations: [
                'Secure loose equipment',
                'Check drainage systems',
                'Prepare flood barriers if needed'
            ]
        }
    ];
}

function calculateExpectedYield(crop) {
    return (mockData.crops[crop].priceHistory[0] / 10).toFixed(1);
}

function determineGrowthStage() {
    return "Vegetative";
}

function calculateTrend(prices) {
    const last = prices[prices.length - 1];
    const previous = prices[prices.length - 2];
    return ((last - previous) / previous * 100).toFixed(1);
}

function isUrgent() {
    return Math.random() > 0.5;
}

function generateAlertTitle() {
    return "Weather Alert";
}

function generateAlertMessage() {
    return "Weather conditions may affect your crops";
}

function formatTimeAgo(timestamp) {
    const diff = new Date().getTime() - timestamp;
    const hours = Math.floor(diff / 3600000);
    return hours > 24 ? `${Math.floor(hours/24)}d ago` : `${hours}h ago`;
}

function renderPriceChart(crop, priceHistory) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    if (priceChart) {
        priceChart.destroy();
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${crop.charAt(0).toUpperCase() + crop.slice(1)} Prices (₱/kg)`,
                data: priceHistory,
                borderColor: '#2c5282',
                backgroundColor: 'rgba(44, 82, 130, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₱' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updatePriceChart(crop) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (priceChart) {
        priceChart.destroy();
    }

    // Sample data - replace with actual API data in production
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: `${crop} Price Trends`,
            data: generateSamplePrices(),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    priceChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Price (PHP)'
                    }
                }
            }
        }
    });
}

function generateSamplePrices() {
    // Generate random prices between 20 and 100
    return Array.from({length: 6}, () => Math.floor(Math.random() * 80) + 20);
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
});
