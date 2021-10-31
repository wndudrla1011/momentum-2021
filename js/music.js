const backgroundMusic = document.querySelector(".background-music");

function playMusic() {
  backgroundMusic.volume = 0.5;
  backgroundMusic.loop = true;
}

window.addEventListener("load", playMusic);
// window.addEventListener("beforeunload", playMusic);
