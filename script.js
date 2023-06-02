// Initialize Firebase
var config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
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
