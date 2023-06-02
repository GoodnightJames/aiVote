var images = [];
var currentIndex = 0;
var currentRound = 1;

function getImages() {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            images = data.images;
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

        for (let i = currentIndex; i < currentIndex + 2; i++) {
            if (i < images.length) {
                const img = document.createElement('img');
                img.src = images[i].image_path;
                img.alt = 'Image';
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

    // Add your logic here to handle the vote and move to the next pair

    currentIndex += 2;

    // Check if the current round is complete
    if (currentIndex >= images.length) {
        console.log('Round ' + currentRound + ' complete.');

        // Check if the final round is reached
        if (currentRound === 1) {
            console.log('Final round reached.');
            console.log('Remaining images:', images);

            // You can implement the logic for the final round as needed

            return;
        }

        currentRound++;
        currentIndex = 0;

        // Shuffle the images for the next round
        shuffleImages();
    }

    // Display the new pair of images
    displayImages();
}

function shuffleImages() {
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
}

// Call getImages to start the process
getImages();
