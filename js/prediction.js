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

        const crop = cropSelect.value;
        const location = document.getElementById('location').value;

        try {
            // Simulate API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mock prediction result
            const prediction = {
                minPrice: 45,
                maxPrice: 52,
                confidence: 85
            };

            // Show success state
            resultsContainer.setAttribute('data-state', 'success');
            showPredictionResults(prediction);
        } catch (error) {
            // Show error state
            resultsContainer.setAttribute('data-state', 'error');
            showError('Failed to get prediction. Please try again.');
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
        successState.classList.remove('hidden');
        
        const priceRange = successState.querySelector('[data-content="price-range"]');
        const confidence = successState.querySelector('[data-content="confidence"]');
        
        priceRange.textContent = `₱${prediction.minPrice} - ₱${prediction.maxPrice} per kg`;
        confidence.textContent = `Confidence Level: ${prediction.confidence}%`;
    }

    function showError(message) {
        hideAllStates();
        const errorState = predictionResult.querySelector('.error-state');
        errorState.classList.remove('hidden');
        errorState.querySelector('[data-content="error"]').textContent = message;
    }
});
