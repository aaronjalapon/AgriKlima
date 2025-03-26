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

window.onload = function() {
    displayPosts();
};
