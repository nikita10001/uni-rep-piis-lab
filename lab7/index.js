const canvas = document.getElementById('canvas');
const shapeSelector = document.getElementById('shape');

let isDrawing = false;
let startX, startY;

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

  canvas.innerHTML = '';

  if (shape === 'circle') {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', startX);
    circle.setAttribute('cy', startY);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'lightblue');
    canvas.appendChild(circle);
  } else if (shape === 'rectangle') {
    const width = currentX - startX;
    const height = currentY - startY;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', startX);
    rect.setAttribute('y', startY);
    rect.setAttribute('width', Math.abs(width));
    rect.setAttribute('height', Math.abs(height));
    rect.setAttribute('fill', 'lightgreen');
    canvas.appendChild(rect);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});
