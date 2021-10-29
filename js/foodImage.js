const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
const foodImage = document.querySelector("#foodImage");
const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

foodImage.appendChild(bgImage);
