let barterListings = [];

function calculateMatchScore(offer1, offer2) {
    let score = 0;
    // Check if what one person wants matches what the other has
    if (offer1.want.toLowerCase().includes(offer2.have.toLowerCase()) ||
        offer2.want.toLowerCase().includes(offer1.have.toLowerCase())) {
        score += 50;
    }
    
    // Category matching
    if (offer1.category === offer2.category) {
        score += 20;
    }
    
    return score;
}

function findMatchingSuggestions(currentOffer) {
    return barterListings
        .map(listing => ({
            listing,
            score: calculateMatchScore(currentOffer, listing)
        }))
        .filter(match => match.score > 30)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

document.addEventListener('DOMContentLoaded', () => {
    displayBarterListings();
});

function displayBarterListings() {
    const listingsContainer = document.getElementById('barter-listings');
    listingsContainer.innerHTML = '';

    barterListings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        listingCard.innerHTML = `
            <h3>${listing.offering}</h3>
            <p>Category: ${listing.category}</p>
            <p>Wanting: ${listing.wanting}</p>
            <p>Posted by: ${listing.postedBy}</p>
            <p>Location: ${listing.location}</p>
        `;
        listingsContainer.appendChild(listingCard);
    });
}

function postBarterOffer() {
    const item = document.getElementById('barter-item').value;
    const category = document.getElementById('item-category').value;
    const want = document.getElementById('barter-want').value;

    if (item && want) {
        const newListing = {
            id: barterListings.length + 1,
            offering: item,
            category: category,
            wanting: want,
            postedBy: "Current User",
            location: "Local Area"
        };
        barterListings.push(newListing);
        displayBarterListings();
    }
}

function updateSuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = suggestions
        .map(({listing, score}) => `
            <div class="barter-card">
                <h4>Match Score: ${score}%</h4>
                <p>Has: ${listing.have}</p>
                <p>Wants: ${listing.want}</p>
                <p>Category: ${listing.category}</p>
                <button onclick="contactTrader()">Contact Trader</button>
            </div>
        `).join('');
}

function updateListings() {
    const listings = document.getElementById('barter-listings');
    listings.innerHTML = barterListings
        .map(listing => `
            <div class="barter-card">
                <p>Has: ${listing.have}</p>
                <p>Wants: ${listing.want}</p>
                <p>Category: ${listing.category}</p>
                <p class="date">${listing.date.toLocaleDateString()}</p>
            </div>
        `).join('');
}

window.onload = function() {
    updateListings();
};
