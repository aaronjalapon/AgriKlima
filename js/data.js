const mockData = {
    crops: {
        rice: {
            optimalTemp: { min: 20, max: 35 },
            optimalHumidity: { min: 60, max: 80 },
            priceHistory: [35, 37, 38, 38, 38],
            recommendations: {
                dry: "Consider delayed planting",
                wet: "Ensure proper drainage"
            }
        },
        corn: {
            optimalTemp: { min: 18, max: 32 },
            optimalHumidity: { min: 50, max: 75 },
            priceHistory: [25, 24, 24, 24, 24],
            recommendations: {
                dry: "Implement mulching",
                wet: "Monitor for fungal diseases"
            }
        }
    },
    soilConditions: {
        "Region III": { ph: 6.5, moisture: "Adequate", type: "Clay Loam" },
        "Region IV": { ph: 6.2, moisture: "Low", type: "Sandy Loam" }
    }
};
