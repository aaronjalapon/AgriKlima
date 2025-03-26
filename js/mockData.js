const mockPredictionData = {
    rice: {
        priceRange: "₱38.00 - ₱42.00 per kg",
        confidence: "85% confidence level",
        historicalPrices: [
            { month: "Jan", price: 40.50 },
            { month: "Feb", price: 39.75 },
            { month: "Mar", price: 38.90 },
            { month: "Apr", price: 41.20 },
            { month: "May", price: 42.00 },
            { month: "Jun", price: 40.80 }
        ]
    },
    corn: {
        priceRange: "₱25.00 - ₱28.00 per kg",
        confidence: "82% confidence level",
        historicalPrices: [
            { month: "Jan", price: 26.50 },
            { month: "Feb", price: 27.75 },
            { month: "Mar", price: 28.00 },
            { month: "Apr", price: 26.20 },
            { month: "May", price: 25.50 },
            { month: "Jun", price: 27.00 }
        ]
    },
    vegetables: {
        priceRange: "₱45.00 - ₱55.00 per kg",
        confidence: "78% confidence level",
        historicalPrices: [
            { month: "Jan", price: 48.00 },
            { month: "Feb", price: 52.00 },
            { month: "Mar", price: 50.00 },
            { month: "Apr", price: 47.00 },
            { month: "May", price: 49.00 },
            { month: "Jun", price: 53.00 }
        ]
    }
};
