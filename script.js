var images = [];
var currentIndex = 0;
var currentRound = 1;

// Firebase Database reference
var database = firebase.database();

function getImages() {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            images = data;
            console.log('Images fetched:', images);
            displayImages();
        })
        .catch(error => console.error(error));
}

function displayImages() {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';

    if (currentIndex < images.length) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        for (let i = currentIndex; i < currentIndex + 4; i++) {
            if (i < images.length) {
                const img = document.createElement('img');
                img.src = images[i].image_path;
                img.alt = 'Image';
                console.log('Image ID being added to image:', images[i].id);
                img.addEventListener('click', () => voteImage(images[i].id));
                imageWrapper.appendChild(img);
            }
        }

        imageContainer.appendChild(imageWrapper);
    } else {
        const noImagesMessage = document.createElement('p');
        noImagesMessage.textContent = 'No more images available.';
        imageContainer.appendChild(noImagesMessage);
    }
}

function voteImage(imageId) {
    console.log('Vote counted for imageId:', imageId);

    // Record vote in Firebase
    var votesRef = database.ref('votes/' + imageId);
    votesRef.transaction(function(currentVotes) {
        // If votes has never been set, currentVotes will be `null`.
        return (currentVotes || 0) + 1;
    });

    currentIndex += 4;

    if (currentIndex >= images.length) {
        console.log('Round ' + currentRound + ' complete.');

        if (currentRound === 1) {
            console.log('Final round reached.');
            console.log('Remaining images:', images);
            return;
        }

        currentRound++;
        currentIndex = 0;
        shuffleImages();
    }

    displayImages();
}

function shuffleImages() {
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
}

getImages();
