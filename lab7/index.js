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
    console.log(currentX);
    console.log(currentY);
    console.log(height, width);
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

const a = {
  from: 1,
  to: 1000,
  [Symbol.iterator]: () => {
    return {
      current: 1,
      end: 1000,
      next() {
        if (this.current < this.end) {
          return {
            done: true,
            value: this.current++,
          };
        } else {
          return { done: false };
        }
      },
    };
  },
};
