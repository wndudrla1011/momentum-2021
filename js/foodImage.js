const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
const title = [
  "육회비빔밥",
  "돈카츠 정식",
  "삼겹살 샐러드",
  "모츠나베",
  "치킨 가라아케",
];
const foodImage = document.querySelector("#foodImage");
const buttonChangeImage = document.querySelector("#button-changeImage");
const random = Math.floor(Math.random() * images.length);
const chosenImage = images[random];

const bgImage = document.createElement("img");
const span = document.createElement("span");

bgImage.src = `img/${chosenImage}`;
span.innerText = title[random];

foodImage.appendChild(bgImage);
foodImage.appendChild(span);

function changeImage() {
  const random = Math.floor(Math.random() * images.length);
  const chosenImage = images[random];
  bgImage.src = `img/${chosenImage}`;
  span.innerText = title[random];
}

buttonChangeImage.addEventListener("click", changeImage);
