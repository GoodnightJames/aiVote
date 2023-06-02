// Firebase configuration
var config = {
  apiKey: "AIzaSyC07q7g5RUt9IMAH6TfOcO-LnS1MLP0Iiw",
  authDomain: "aivote-842d3.firebaseapp.com",
  databaseURL: "https://aivote-842d3-default-rtdb.firebaseio.com/",
  projectId: "aivote-842d3",
  storageBucket: "aivote-842d3.appspot.com",
  messagingSenderId: "1001056006585",
  appId: "1:1001056006585:web:5208ea815e6f8e8bad0668"
};
firebase.initializeApp(config);

var database = firebase.database();

function displayImages(images) {
  var imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = ""; // Clear the container
  for (var key in images) {
    var img = document.createElement("img");
    img.src = images[key].url;
    img.onclick = function() {
      database.ref("images/" + key).transaction(function(image) {
        if (image) {
          image.votes++;
        }
        return image;
      });
      fetchImages(); // Refresh the images after a vote
    };
    imageContainer.appendChild(img);
  }
}

function fetchImages() {
  // Fetch the four images with the least number of votes
  database.ref("images").orderByChild("votes").limitToFirst(4).once("value", function(snapshot) {
    displayImages(snapshot.val());
  });
}

fetchImages(); // Fetch the images when the page loads
