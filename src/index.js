const box = document.getElementById("animatedBox");
const btn = document.getElementById("toggle-animation");
let pause = false;
let currentFrame = 0;
let intervalId;
let returnIntervalId;

btn.onclick = () => {
  pause = !pause;
  if (pause) {
    btn.innerText = "Start Animation";
    clearInterval(intervalId); // Stop the animation
    clearInterval(returnIntervalId); // Stop the return animation
  } else {
    btn.innerText = "Pause Animation";
    startAnimation();
  }
};

function startAnimation() {
  const duration = 2000; // Duration of the animation in milliseconds
  const startPosition = 0; // Starting left position
  const endPosition = 400; // Ending left position
  const frames = 60; // Number of frames for the animation
  const interval = duration / frames; // Time per frame
  currentFrame = 0; // Reset frame count

  intervalId = setInterval(() => {
    if (pause) {
      clearInterval(intervalId); // Stop the animation if paused
      return;
    }

    currentFrame++;
    const progress = currentFrame / frames; // Normalize progress (0 to 1)
    const currentPosition =
      startPosition + (endPosition - startPosition) * progress;
    box.style.left = currentPosition + "px"; // Update the left position

    if (currentFrame >= frames) {
      clearInterval(intervalId); // Stop the animation to the end

      // Start the animation back to the start position
      currentFrame = 0; // Reset frame count
      returnAnimation();
    }
  }, interval);
}

function returnAnimation() {
  const duration = 2000; // Duration of the return animation in milliseconds
  const frames = 60; // Number of frames for the return animation
  const interval = duration / frames; // Time per frame
  currentFrame = 0; // Reset frame count

  returnIntervalId = setInterval(() => {
    if (pause) {
      clearInterval(returnIntervalId); // Stop the return animation if paused
      return;
    }

    currentFrame++;
    const returnProgress = currentFrame / frames; // Normalize progress (0 to 1)
    const returnPosition =
      endPosition - (endPosition - startPosition) * returnProgress;
    box.style.left = returnPosition + "px"; // Update the left position

    if (currentFrame >= frames) {
      clearInterval(returnIntervalId); // Stop the return animation
    }
  }, interval);
}
