const canvas = document.getElementById("map-container");
const context = canvas.getContext("2d");

canvas.width = 2772;
canvas.height = 2158;

// Preloading images to drastically improve performance

const currentFrame = (index) =>
  `assets/images/map/${index.toString().padStart(4, "0")}.jpg`;
const frameCount = 54;
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
  console.log("FrameIndex", frameIndex);
  if (frameIndex < frameCount)
    requestAnimationFrame(() =>
      context.drawImage(images[frameIndex + 1], 0, 0)
    );
});
