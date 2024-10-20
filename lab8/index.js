const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapeSelector = document.getElementById('shape');

let isDrawing = false;
let startX, startY;

// Массив для хранения нарисованных фигур
let shapes = [];

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

  // Очищаем холст перед перерисовкой
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Перерисовываем все предыдущие фигуры
  shapes.forEach((shape) => {
    drawShape(shape);
  });

  // Рисуем текущую фигуру
  if (shape === 'circle') {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    drawCircle(startX, startY, radius, 'lightblue');
  } else if (shape === 'rectangle') {
    const width = currentX - startX;
    const height = currentY - startY;
    drawRectangle(startX, startY, width, height, 'lightgreen');
  }
});

canvas.addEventListener('mouseup', (e) => {
  if (!isDrawing) return;
  isDrawing = false;

  const currentX = e.offsetX;
  const currentY = e.offsetY;
  const shape = shapeSelector.value;

  // Сохраняем фигуру в массиве для перерисовки в будущем
  if (shape === 'circle') {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    shapes.push({ type: 'circle', x: startX, y: startY, radius, color: 'lightblue' });
  } else if (shape === 'rectangle') {
    const width = currentX - startX;
    const height = currentY - startY;
    shapes.push({ type: 'rectangle', x: startX, y: startY, width, height, color: 'lightgreen' });
  }
});

// Функции для рисования фигур
function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRectangle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Перерисовка сохраненных фигур
function drawShape(shape) {
  if (shape.type === 'circle') {
    drawCircle(shape.x, shape.y, shape.radius, shape.color);
  } else if (shape.type === 'rectangle') {
    drawRectangle(shape.x, shape.y, shape.width, shape.height, shape.color);
  }
}

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});
