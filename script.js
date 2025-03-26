// Simple price prediction using average and trend
async function predictPrice() {
    const button = document.querySelector('button');
    const resultBox = document.getElementById('prediction-result');
    
    try {
        showLoading(button);
        const crop = document.getElementById('prediction-crop').value;
        const prices = cropData[crop].historicalPrices;
        const average = prices.reduce((a, b) => a + b) / prices.length;
        const trend = prices[prices.length - 1] - prices[prices.length - 2];
        
        const prediction = average + trend;
        resultBox.innerHTML = 
            `Predicted price for ${crop}: ₱${prediction.toFixed(2)}/kg`;
    } catch (error) {
        resultBox.innerHTML = '<div class="error">Error calculating prediction</div>';
    } finally {
        hideLoading(button);
    }
}

// Weather-based suggestions using mock weather data
async function getWeatherSuggestions() {
    // Simulate weather API call
    const mockWeather = {
        temperature: 28,
        rainfall: 150
    };

    const suggestions = Object.entries(cropData)
        .filter(([crop, data]) => {
            return mockWeather.temperature >= data.idealTemperature.min &&
                   mockWeather.temperature <= data.idealTemperature.max &&
                   mockWeather.rainfall >= data.idealRainfall.min &&
                   mockWeather.rainfall <= data.idealRainfall.max;
        })
        .map(([crop]) => crop);

    document.getElementById('weather-result').innerHTML = 
        `Recommended crops for current weather: ${suggestions.join(', ')}`;
}

// Update dashboard with farmer's information
function updateDashboard() {
    const location = document.getElementById('farmer-location').value;
    const crop = document.getElementById('crop-select').value;
    
    if (!location || !crop) {
        alert('Please fill in all fields');
        return;
    }

    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = `
        <h3>Your Farm Summary</h3>
        <p>Location: ${location}</p>
        <p>Current Crop: ${crop}</p>
        <p>Current Market Price: ₱${cropData[crop].historicalPrices.slice(-1)[0]}/kg</p>
    `;
}

// Barter System Functions
function postBarterOffer() {
    const has = document.getElementById('barter-item').value;
    const wants = document.getElementById('barter-want').value;
    
    if (!has || !wants) {
        alert('Please fill in all fields');
        return;
    }

    const newListing = {
        id: barterListings.length + 1,
        has: has,
        wants: wants,
        location: document.getElementById('farmer-location').value || 'Unknown',
        farmer: 'Current User',
        date: new Date().toISOString().split('T')[0]
    };

    barterListings.unshift(newListing);
    displayBarterListings();
    clearBarterForm();
}

function displayBarterListings() {
    const container = document.getElementById('barter-listings');
    container.innerHTML = barterListings.map(listing => `
        <div class="barter-card">
            <h4>Offering: ${listing.has}</h4>
            <p>Wanting: ${listing.wants}</p>
            <p>Location: ${listing.location}</p>
            <p>Posted by: ${listing.farmer}</p>
            <small>Posted on: ${listing.date}</small>
        </div>
    `).join('');
}

// Community Functions
function createPost() {
    const content = document.getElementById('post-content').value;
    
    if (!content) {
        alert('Please write something to post');
        return;
    }

    const newPost = {
        id: communityPosts.length + 1,
        author: 'Current User',
        content: content,
        date: new Date().toISOString().split('T')[0],
        likes: 0
    };

    communityPosts.unshift(newPost);
    displayPosts();
    document.getElementById('post-content').value = '';
}

function displayPosts() {
    const container = document.getElementById('community-posts');
    container.innerHTML = communityPosts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <span>${post.author}</span>
                <span>${post.date}</span>
            </div>
            <p>${post.content}</p>
            <button onclick="likePost(${post.id})" class="like-button">
                👍 ${post.likes} Likes
            </button>
        </div>
    `).join('');
}

function likePost(postId) {
    const post = communityPosts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        displayPosts();
    }
}

// Mobile Navigation Toggle
function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    nav.classList.toggle('active');
}

// Loading State Handler
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Form Validation
function validateForm(inputs) {
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            clearError(input);
        }
    });
    return isValid;
}

function showError(input, message) {
    const feedback = document.createElement('div');
    feedback.className = 'input-feedback';
    feedback.textContent = message;
    input.parentNode.appendChild(feedback);
}

function clearError(input) {
    const feedback = input.parentNode.querySelector('.input-feedback');
    if (feedback) {
        feedback.remove();
    }
}

// Initialize crop select options
window.onload = function() {
    const cropSelect = document.getElementById('prediction-crop');
    Object.keys(cropData).forEach(crop => {
        const option = document.createElement('option');
        option.value = crop;
        option.textContent = crop.charAt(0).toUpperCase() + crop.slice(1);
        cropSelect.appendChild(option);
    });

    displayBarterListings();
    displayPosts();
};
