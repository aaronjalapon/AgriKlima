class AIPricePredictor {
    static async predict(crop, historicalPrices) {
        // Simple ML model using weighted moving average
        const weights = [0.4, 0.3, 0.2, 0.1];
        const recentPrices = historicalPrices.slice(-4);
        const prediction = recentPrices.reduce((acc, price, i) => 
            acc + price * weights[i], 0);
        
        const trend = prediction > historicalPrices[historicalPrices.length - 1] 
            ? "rising" : "falling";
            
        return {
            predictedPrice: prediction,
            trend: trend,
            confidence: 0.85 // Mock confidence score
        };
    }
}

class CropRecommender {
    static async recommend(weather) {
        const scores = {};
        
        for (const [crop, data] of Object.entries(cropData)) {
            const tempScore = this.calculateScore(
                weather.temperature,
                data.idealTemperature.min,
                data.idealTemperature.max
            );
            
            const rainScore = this.calculateScore(
                weather.rainfall,
                data.idealRainfall.min,
                data.idealRainfall.max
            );
            
            scores[crop] = (tempScore + rainScore) / 2;
        }
        
        return Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .filter(([,score]) => score > 0.6)
            .map(([crop]) => crop);
    }
    
    static calculateScore(value, min, max) {
        if (value < min || value > max) return 0;
        const mid = (max + min) / 2;
        return 1 - Math.abs(value - mid) / (max - min);
    }
}
