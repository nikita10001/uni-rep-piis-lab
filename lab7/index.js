const canvas = document.getElementById('canvas');
const shapeSelector = document.getElementById('shape');

let isDrawing = false;
let startX = 0,
  startY = 0;
let currentShape = null;

// Функция начала рисования
const startDrawing = (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
  const shapeType = shapeSelector.value;

  currentShape = createShape(shapeType, startX, startY);
  canvas.appendChild(currentShape);
};

// Функция создания фигуры
const createShape = (shapeType, x, y) => {
  if (shapeType === 'circle') {
    return createCircle(x, y);
  } else if (shapeType === 'rectangle') {
    return createRectangle(x, y);
  }
};

const createCircle = (x, y) => {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', 0); // Изначальный радиус
  circle.setAttribute('fill', 'lightblue');
  return circle;
};

const createRectangle = (x, y) => {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', 0); // Изначальная ширина
  rect.setAttribute('height', 0); // Изначальная высота
  rect.setAttribute('fill', 'lightgreen');
  return rect;
};

// Функция для обновления размеров фигуры
const drawShape = (e) => {
  if (!isDrawing || !currentShape) return;

  const currentX = e.offsetX;
  const currentY = e.offsetY;
  const shapeType = shapeSelector.value;

  if (shapeType === 'circle') {
    const radius = calculateDistance(startX, startY, currentX, currentY);
    currentShape.setAttribute('r', radius);
  } else if (shapeType === 'rectangle') {
    const width = currentX - startX;
    const height = currentY - startY;
    updateRectangle(currentShape, width, height, currentX, currentY);
  }
};

const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const updateRectangle = (rect, width, height, currentX, currentY) => {
  rect.setAttribute('width', Math.abs(width));
  rect.setAttribute('height', Math.abs(height));

  // Обрабатываем отрицательные значения ширины и высоты
  if (width < 0) {
    rect.setAttribute('x', currentX);
  }
  if (height < 0) {
    rect.setAttribute('y', currentY);
  }
};

// Завершение рисования
const endDrawing = () => {
  isDrawing = false;
  currentShape = null;
};

// Привязываем события к элементам
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawShape);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseleave', endDrawing);

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
