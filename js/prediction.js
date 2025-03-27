document.addEventListener('DOMContentLoaded', () => {
    const predictionForm = document.getElementById('prediction-form');
    const resultsContainer = document.querySelector('.results-container');
    const loadingSpinner = document.getElementById('loading');
    const predictionResult = document.getElementById('prediction-result');
    
    // Populate crop select options
    const cropSelect = document.getElementById('prediction-crop');
    const crops = ['Rice', 'Corn', 'Coconut', 'Sugarcane', 'Banana'];
    crops.forEach(crop => {
        const option = document.createElement('option');
        option.value = crop.toLowerCase();
        option.textContent = crop;
        cropSelect.appendChild(option);
    });

    predictionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        resultsContainer.setAttribute('data-state', 'loading');
        loadingSpinner.classList.remove('hidden');
        hideAllStates();

        const crop = document.getElementById('prediction-crop').value;
        const location = document.getElementById('location').value;

        try {
            // Mock API call with realistic data
            const prediction = await mockPredictPrice(crop, location);
            
            // Show success state
            resultsContainer.setAttribute('data-state', 'success');
            showPredictionResults(prediction);

            // Update chart with mock data
            const mockData = {
                dates: ['2023-01', '2023-02', '2023-03', '2023-04'],
                prices: [100, 120, 110, 130]
            };
            renderPriceChart(mockData);
        } catch (error) {
            // Show error state
            resultsContainer.setAttribute('data-state', 'error');
            showError(error.message || 'Failed to get prediction. Please try again.');
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    });

    function hideAllStates() {
        const states = predictionResult.querySelectorAll('.initial-state, .success-state, .error-state');
        states.forEach(state => state.classList.add('hidden'));
    }

    function showPredictionResults(prediction) {
        hideAllStates();
        const successState = predictionResult.querySelector('.success-state');
        successState.classList.remove('hidden'); // Ensure success state is visible
        
        const priceRange = successState.querySelector('[data-content="price-range"]');
        const confidence = successState.querySelector('[data-content="confidence"]');
        
        priceRange.textContent = `₱${prediction.minPrice} - ₱${prediction.maxPrice} per kg`;
        confidence.textContent = `Confidence Level: ${prediction.confidence}%`;
    }

    function showError(message) {
        hideAllStates();
        const errorState = predictionResult.querySelector('.error-state');
        errorState.classList.remove('hidden'); // Ensure error state is visible
        errorState.querySelector('[data-content="error"]').textContent = message;
    }

    // Function to render the price chart
    function renderPriceChart(data) {
        const chartContainer = document.querySelector('#price-chart .chart-content');
        const initialState = document.querySelector('#price-chart .initial-state');

        // Hide initial state and show chart content
        initialState.classList.add('hidden');
        chartContainer.classList.remove('hidden');

        // Create a canvas element for the chart
        chartContainer.innerHTML = '<canvas id="priceChartCanvas"></canvas>';
        const ctx = document.getElementById('priceChartCanvas').getContext('2d');

        // Example chart data (replace with actual data)
        const labels = data.dates; // Array of dates
        const prices = data.prices; // Array of prices

        // Render the chart using Chart.js
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Historical Prices',
                    data: prices,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price'
                        }
                    }
                }
            }
        });
    }

    // Example usage: Call renderPriceChart with mock data
    document.getElementById('predict-btn').addEventListener('click', (e) => {
        e.preventDefault();
        const mockData = {
            dates: ['2023-01', '2023-02', '2023-03', '2023-04'],
            prices: [100, 120, 110, 130]
        };
        renderPriceChart(mockData);
    });

    async function mockPredictPrice(crop, location) {
        if (!crop || !location) {
            throw new Error('Please provide both crop and location.');
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));

        return {
            minPrice: 45,
            maxPrice: 52,
            confidence: 85
        };
    }
});
