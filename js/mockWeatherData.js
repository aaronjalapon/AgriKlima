const mockWeatherData = {
    current: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        condition: 'Partly Cloudy',
        icon: '02d'
    },
    forecast: {
        daily: [
            {
                date: new Date(),
                temp: { max: 29, min: 22 },
                humidity: 70,
                icon: '01d'
            },
            {
                date: new Date(Date.now() + 86400000),
                temp: { max: 28, min: 21 },
                humidity: 75,
                icon: '02d'
            },
            {
                date: new Date(Date.now() + 172800000),
                temp: { max: 27, min: 20 },
                humidity: 80,
                icon: '10d'
            }
        ],
        weekly: [
            { day: 'Monday', temp: 28, humidity: 75, condition: 'Sunny' },
            { day: 'Tuesday', temp: 27, humidity: 80, condition: 'Partly Cloudy' },
            { day: 'Wednesday', temp: 29, humidity: 70, condition: 'Clear' },
            { day: 'Thursday', temp: 26, humidity: 85, condition: 'Rain' },
            { day: 'Friday', temp: 27, humidity: 78, condition: 'Cloudy' },
            { day: 'Saturday', temp: 28, humidity: 72, condition: 'Sunny' },
            { day: 'Sunday', temp: 29, humidity: 70, condition: 'Clear' }
        ],
        monthly: [
            { week: 1, avgTemp: 28, rainfall: 'Low', forecast: 'Mostly Sunny' },
            { week: 2, avgTemp: 27, rainfall: 'Moderate', forecast: 'Scattered Showers' },
            { week: 3, avgTemp: 29, rainfall: 'High', forecast: 'Heavy Rain' },
            { week: 4, avgTemp: 28, rainfall: 'Low', forecast: 'Clear' }
        ]
    },
    suggestions: {
        actions: [
            'Water crops in the early morning',
            'Check soil moisture levels',
            'Monitor for pests due to humid conditions',
            'Prepare shade structures for sensitive crops'
        ],
        crops: [
            'Rice',
            'Corn',
            'Vegetables',
            'Root crops'
        ]
    }
};

function getMockWeatherData() {
    return mockWeatherData;
}
