const canvas = document.getElementById("map-canvas");
const context = canvas.getContext("2d");

canvas.width = 2772;
canvas.height = 2158;

// Preloading images to drastically improve performance

const currentFrame = (index) =>
  `assets/images/map/${index.toString().padStart(4, "0")}.jpg`;
const frameCount = 57;
const images = [];

const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    images[i] = new Image(); // This is functionally equivalent to document.createElement('img').
    images[i].src = currentFrame(i);
  }
};

preloadImages();

const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const element = document.getElementById("map");

element.addEventListener("scroll", () => {
  const scrollTop = element.scrollTop;
  const maxScrollTop = element.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  if (frameIndex < frameCount)
    requestAnimationFrame(() => context.drawImage(images[frameIndex], 0, 0));
});

var intro_video = document.getElementById("intro-video");
var intro_fallback = document.getElementById("intro-fallback");
var map_canvas = document.getElementById("map-canvas");
var empty_scroll = document.getElementById("empty-scroll");
var map_fallback = document.getElementById("map-fallback");
var promise = intro_video.play();

if (promise !== undefined) {
  promise.catch((error) => {
    if (error.name === "NotAllowedError") {
      intro_video.remove();
      intro_fallback.style.display = "block";

      map_canvas.remove();
      empty_scroll.remove();
      map_fallback.style.display = "block";
    }
  });
}
