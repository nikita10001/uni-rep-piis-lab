const targets = document.querySelectorAll('.target');

let isDragging = false;
let isPinned = false;
let offsetX, offsetY;
let currentElement = null;
let startPosition = { top: 0, left: 0 };
let lastTouchTime = 0;
const doubleTapDelay = 300;

targets.forEach((target) => {
  target.addEventListener('touchstart', (e) => {
    handleTouchStart(e, target);
  });
});

document.addEventListener('touchmove', (e) => {
  handleTouchMove(e);
});

document.addEventListener('touchend', (e) => {
  handleTouchEnd(e);
});

function handleTouchStart(e, target) {
  e.preventDefault();

  const currentTime = new Date().getTime();
  if (currentTime - lastTouchTime <= doubleTapDelay) {
    handleDoubleTap(target);
  } else {
    lastTouchTime = currentTime;
  }

  if (!isPinned) {
    isDragging = true;
    currentElement = target;

    const rect = target.getBoundingClientRect();
    offsetX = e.touches[0].clientX - rect.left;
    offsetY = e.touches[0].clientY - rect.top;

    startPosition.top = rect.top + window.scrollY;
    startPosition.left = rect.left + window.scrollX;

    target.style.position = 'absolute';
  } else {
    isDragging = true;
    currentElement = target;
  }
}

function handleDoubleTap(target) {
  targets.forEach((t) => {
    t.style.backgroundColor = '';
    t.isPinned = false;
  });

  isPinned = true;
  currentElement = target;
  target.style.backgroundColor = 'lightblue';
}

function handleTouchMove(e) {
  if (isDragging && currentElement) {
    currentElement.style.top = `${e.touches[0].clientY - offsetY}px`;
    currentElement.style.left = `${e.touches[0].clientX - offsetX}px`;
  }

  if (e.touches.length > 1) {
    resetElementPosition();
  }
}

function handleTouchEnd(e) {
  if (isDragging) {
    if (e.changedTouches.length > 1) {
      resetElementPosition();
    } else {
      completeDragging();
    }
  }
}

function completeDragging() {
  currentElement = null;
}

function resetElementPosition() {
  if (currentElement) {
    currentElement.style.top = `${startPosition.top}px`;
    currentElement.style.left = `${startPosition.left}px`;
    isPinned = false;
    currentElement.style.backgroundColor = '';
    currentElement = null;
  }
}
