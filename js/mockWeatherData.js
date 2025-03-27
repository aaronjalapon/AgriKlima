const mockWeatherData = {
    current: {
        temperature: 28,
        humidity: 75,
        windSpeed: 12,
        condition: 'Partly Cloudy',
        icon: '⛅'
    },
    forecast: [
        {
            day: 'Today',
            temperature: 28,
            humidity: 75,
            condition: 'Partly Cloudy',
            icon: '⛅'
        },
        {
            day: 'Tomorrow',
            temperature: 29,
            humidity: 70,
            condition: 'Sunny',
            icon: '☀️'
        },
        {
            day: 'Wednesday',
            temperature: 27,
            humidity: 80,
            condition: 'Light Rain',
            icon: '🌧️'
        },
        {
            day: 'Thursday',
            temperature: 28,
            humidity: 72,
            condition: 'Cloudy',
            icon: '☁️'
        },
        {
            day: 'Friday',
            temperature: 30,
            humidity: 68,
            condition: 'Sunny',
            icon: '☀️'
        }
    ],
    agriculturalSuggestions: {
        alerts: [
            "Moderate rainfall expected - Good conditions for planting",
            "High humidity levels - Monitor for potential fungal diseases"
        ],
        recommendedCrops: [
            {
                name: "Rice",
                suitability: "High",
                icon: "🌾"
            },
            {
                name: "Corn",
                suitability: "Medium",
                icon: "🌽"
            },
            {
                name: "Vegetables",
                suitability: "High",
                icon: "🥬"
            },
            {
                name: "Sweet Potato",
                suitability: "Medium",
                icon: "🥔"
            }
        ],
        actions: [
            "Prepare drainage systems for expected rainfall",
            "Apply fungicide as preventive measure",
            "Schedule irrigation for dry periods",
            "Monitor soil moisture levels"
        ],
        preparationSteps: [
            "Check and clean irrigation systems",
            "Prepare soil beds for planting",
            "Stock up on fungicide supplies",
            "Set up weather monitoring equipment",
            "Plan harvest schedule around forecasted rain"
        ]
    },
    seasonalAlert: {
        upcoming: "Rainy Season",
        message: "Rainy season is approaching. Time to prepare your fields and adjust crop planning.",
        actionRequired: true
    }
};
