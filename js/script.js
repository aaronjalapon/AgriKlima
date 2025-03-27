// Add error handling and loading states
async function predictPrice() {
    try {
        const resultBox = document.getElementById('prediction-result');
        resultBox.innerHTML = 'Calculating...';
        
        const crop = document.getElementById('prediction-crop').value;
        const prices = cropData[crop].historicalPrices;
        const average = prices.reduce((a, b) => a + b) / prices.length;
        const trend = prices[prices.length - 1] - prices[prices.length - 2];
        
        const prediction = average + trend;
        resultBox.innerHTML = `Predicted price for ${crop}: ₱${prediction.toFixed(2)}/kg`;
    } catch (error) {
        console.error(error);
        resultBox.innerHTML = 'Error calculating prediction. Please try again.';
    }
}

// Add loading state for weather suggestions
async function getWeatherSuggestions() {
    try {
        const resultBox = document.getElementById('weather-result');
        resultBox.innerHTML = 'Loading weather data...';
        
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

        if (suggestions.length === 0) {
            resultBox.innerHTML = 'No suitable crops found for current weather conditions.';
            return;
        }
        
        resultBox.innerHTML = `Recommended crops for current weather: ${suggestions.join(', ')}`;
    } catch (error) {
        console.error(error);
        resultBox.innerHTML = 'Error fetching weather data. Please try again.';
    }
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

function initializeApp() {
    // Wait for cropData to be available
    if (typeof cropData === 'undefined') {
        console.error('cropData is not defined. Please ensure data.js is loaded before script.js');
        return;
    }

    // Get the current page's crop select element
    const cropSelect = document.getElementById('crop-select') || document.getElementById('prediction-crop');
    
    if (cropSelect) {
        // Clear existing options except the first one
        while (cropSelect.options.length > 1) {
            cropSelect.remove(1);
        }
        
        // Add crop options
        Object.keys(cropData).forEach(crop => {
            const option = document.createElement('option');
            option.value = crop;
            option.textContent = crop.charAt(0).toUpperCase() + crop.slice(1);
            cropSelect.appendChild(option);
        });
    }

    // Initialize other components
    const barterContainer = document.getElementById('barter-listings');
    if (barterContainer) displayBarterListings();
    
    const communityContainer = document.getElementById('community-posts');
    if (communityContainer) displayPosts();
}

// Use DOMContentLoaded and a fallback
document.addEventListener('DOMContentLoaded', initializeApp);
// Fallback for cases where DOMContentLoaded has already fired
if (document.readyState === 'complete') {
    initializeApp();
}

function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}