const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapeSelector = document.getElementById('shape');

let isDrawing = false;
let startX, startY;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  const currentX = e.offsetX;
  const currentY = e.offsetY;
  const shape = shapeSelector.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (shape === 'circle') {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
  } else if (shape === 'rectangle') {
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(startX, startY, width, height);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});
