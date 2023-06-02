// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC07q7g5RUt9IMAH6TfOcO-LnS1MLP0Iiw",
    authDomain: "aivote-842d3.firebaseapp.com",
    projectId: "aivote-842d3",
    storageBucket: "aivote-842d3.appspot.com",
    messagingSenderId: "1001056006585",
    appId: "1:1001056006585:web:5208ea815e6f8e8bad0668",
    measurementId: "G-P9FN6MY6ZE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// get images-container element
let imagesContainer = document.getElementById('images-container');

fetch('images.json')
    .then(response => response.json())
    .then(data => {
        data.images.forEach(image => {
            let imgElement = document.createElement('img');
            imgElement.src = image.image_path;
            imgElement.onclick = function() {
                firebase.database().ref('votes/' + image.id).transaction(function(currentVote) {
                    return (currentVote || 0) + 1;
                });
            };
            imagesContainer.appendChild(imgElement);
        });
    });
