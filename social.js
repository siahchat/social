const feed = document.getElementById('feed');

// Handling the post button
document.getElementById('post-button').addEventListener('click', () => {
    const postText = document.getElementById('post-text').value;
    const fileInput = document.getElementById('file-input');
    const mediaFiles = fileInput.files;

    if (postText || mediaFiles.length) {
        const newPost = createPost(postText, mediaFiles);
        feed.prepend(newPost);

        // Clear post text and file input
        document.getElementById('post-text').value = '';
        fileInput.value = '';
    } else {
        alert('Please write a message or attach files.');
    }
});

function createPost(text, files) {
    const post = document.createElement('div');
    post.classList.add('post');

    // Post header with profile picture, username, and handle
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profilePic = document.createElement('img');
    profilePic.src = 'shadow.jpg'; // Your profile picture here
    postHeader.appendChild(profilePic);

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
    const userName = document.createElement('h4');
    userName.textContent = 'Jesiah';
    const userHandle = document.createElement('p');
    userHandle.textContent = '@jesiah';
    userInfo.appendChild(userName);
    userInfo.appendChild(userHandle);
    postHeader.appendChild(userInfo);

    post.appendChild(postHeader);

    // Post content
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    const postText = document.createElement('p');
    postText.textContent = text;
    postContent.appendChild(postText);

    // Attach media if uploaded
    if (files.length > 0) {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('post-media');
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '100%';
                img.style.marginTop = '10px';
                mediaContainer.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.controls = true;
                video.style.maxWidth = '100%';
                video.style.marginTop = '10px';
                mediaContainer.appendChild(video);
            }
        }
        postContent.appendChild(mediaContainer);
    }
    post.appendChild(postContent);

    // Post actions: Like, Share, Bookmark, Delete
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');

    // Like Button
    const likeButton = createActionButton('likeicon.png', 'Like');
    let likeCounter = 0;
    likeButton.addEventListener('click', () => {
        if (likeButton.classList.toggle('liked')) {
            likeCounter++;
        } else {
            likeCounter--;
        }
        likeButton.querySelector('.counter').textContent = likeCounter;
    });

    // Share Button
    const shareButton = createActionButton('shareicon.png', 'Share');
    let shareCounter = 0;
    shareButton.addEventListener('click', () => {
        if (shareButton.classList.toggle('shared')) {
            shareCounter++;
        } else {
            shareCounter--;
        }
        shareButton.querySelector('.counter').textContent = shareCounter;
    });

    // Bookmark Button
    const bookmarkButton = createActionButton('bookmarkicon.png', 'Bookmark');
    let bookmarkCounter = 0;
    bookmarkButton.addEventListener('click', () => {
        if (bookmarkButton.classList.toggle('bookmarked')) {
            bookmarkCounter++;
        } else {
            bookmarkCounter--;
        }
        bookmarkButton.querySelector('.counter').textContent = bookmarkCounter;
    });

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        feed.removeChild(post);
    });

    postActions.appendChild(likeButton);
    postActions.appendChild(shareButton);
    postActions.appendChild(bookmarkButton);
    postActions.appendChild(deleteButton);
    post.appendChild(postActions);

    return post;
}

function createActionButton(iconSrc, label) {
    const button = document.createElement('button');
    const icon = document.createElement('img');
    icon.src = iconSrc;
    button.appendChild(icon);

    const counter = document.createElement('span');
    counter.classList.add('counter');
    counter.textContent = '0';

    button.appendChild(counter);

    return button;
}