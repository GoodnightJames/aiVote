// Initialize Firebase database
const db = firebase.database();

fetch('images.json')
    .then(response => response.json())
    .then(data => displayImages(data.images));

function displayImages(images) {
    const imagesContainer = document.getElementById('images-container');

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.image_path;
        imgElement.alt = image.filename;
        imgElement.addEventListener('click', () => voteForImage(image.id));

        imagesContainer.appendChild(imgElement);
    });
}

function voteForImage(imageId) {
    const imageRef = db.ref('images/' + imageId);
    imageRef.transaction(currentVotes => {
        if (currentVotes === null) {
            return 1;
        } else {
            return currentVotes + 1;
        }
    });
}
