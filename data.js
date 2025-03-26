const validateCropData = (data) => {
    for (const [crop, info] of Object.entries(data)) {
        if (!info.idealTemperature?.min || !info.idealTemperature?.max ||
            !info.idealRainfall?.min || !info.idealRainfall?.max ||
            !Array.isArray(info.historicalPrices)) {
            throw new Error(`Invalid data format for crop: ${crop}`);
        }
    }
    return data;
};

const cropData = validateCropData({
    rice: {
        idealTemperature: { min: 20, max: 35 },
        idealRainfall: { min: 100, max: 200 },
        historicalPrices: [45, 48, 46, 50, 49, 47]
    },
    corn: {
        idealTemperature: { min: 18, max: 32 },
        idealRainfall: { min: 50, max: 100 },
        historicalPrices: [30, 32, 31, 35, 33, 34]
    },
    vegetables: {
        idealTemperature: { min: 15, max: 30 },
        idealRainfall: { min: 40, max: 80 },
        historicalPrices: [60, 65, 62, 68, 64, 66]
    }
});

const barterListings = [
    {
        id: 1,
        offering: "Rice Seeds",
        category: "crops",
        wanting: "Farming Tools",
        postedBy: "Juan dela Cruz",
        location: "Bulacan"
    },
    {
        id: 2,
        offering: "Tractor Services",
        category: "services",
        wanting: "Vegetable Seeds",
        postedBy: "Maria Santos",
        location: "Pampanga"
    },
    {
        id: 3,
        offering: "Gardening Tools",
        category: "tools",
        wanting: "Fresh Vegetables",
        postedBy: "Pedro Reyes",
        location: "Nueva Ecija"
    }
];

const suggestedMatches = [
    {
        originalOffer: "Rice (50kg)",
        suggestedMatches: [
            {
                id: 5,
                offers: "Corn (65kg)",
                wants: "Rice (45kg)",
                location: "Nueva Ecija",
                matchScore: 95
            },
            {
                id: 6,
                offers: "Corn (50kg)",
                wants: "Rice (40kg)",
                location: "Pangasinan",
                matchScore: 85
            }
        ]
    },
    {
        originalOffer: "Garden Tools Set",
        suggestedMatches: [
            {
                id: 7,
                offers: "Vegetable Seeds Pack",
                wants: "Gardening Tools",
                location: "Batangas",
                matchScore: 90
            }
        ]
    }
];

const communityPosts = [
    {
        id: 1,
        author: "Maria Santos",
        content: "Best time to plant rice this season is next week, according to our local agriculture office!",
        date: "2024-01-20",
        likes: 5
    }
];
