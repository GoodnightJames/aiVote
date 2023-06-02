window.onload = function() {
    const imagesContainer = document.getElementById('images-container');

    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            data.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image.image_path;
                imagesContainer.appendChild(img);

                img.addEventListener('click', function() {
                    // Add a new vote entry in Firebase
                    firebase.database().ref('votes').push({
                        id: image.id,
                        filename: image.filename
                    });
                });
            });
        });
}
