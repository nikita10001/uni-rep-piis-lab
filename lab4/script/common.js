import { formatUrl } from './utils/url.js';

export const createButton = (props) => {
  const { text = '', className = '', onClick, backGroundColor = '' } = props;
  const button = document.createElement('button');
  button.className = `button ${className}`;

  if (backGroundColor) {
    button.style.backgroundColor = backGroundColor;
    button.style.color = '#000';
    button.style.borderWidth = '2px';
    button.style.borderRadius = '10px';
    button.style.borderColor = 'black';
    button.style.borderStyle = 'solid';
    button.style.cursor = 'pointer';
    button.addEventListener('mouseenter', () => {
      button.style.opacity = 0.7; // Цвет при наведении
    });

    button.addEventListener('mouseleave', () => {
      button.style.opacity = 1; // Возвращаем исходный цвет
    });
  }
  button.textContent = text;
  button.onclick = onClick;
  return button;
};

export const createImageContainer = (shirt) => {
  const availableColors = Object.keys(shirt.colors);

  const imgContainer = document.createElement('div');
  imgContainer.className = 'image-container';

  const img = document.createElement('img');
  img.className = 'shirt-image';
  img.src = formatUrl(shirt.colors[availableColors[0]].front);
  img.alt = shirt.name;

  imgContainer.appendChild(img);
  return { imgContainer, img };
};

export const createTitle = (shirt) => {
  const title = document.createElement('h2');
  title.className = 'shirt-title';
  title.textContent = shirt.name;
  return title;
};

export const createPrice = (shirt) => {
  const price = document.createElement('h3');
  price.className = 'shirt-price';
  price.textContent = shirt.price;
  return price;
};

export const createDescription = (shirt) => {
  const description = document.createElement('p');
  description.className = 'shirt-description';
  description.textContent = shirt.description;
  return description;
};

export const createSideSelection = (img, shirt) => {
  const availableColors = Object.keys(shirt.colors);

  const sideSelection = document.createElement('div');
  sideSelection.className = 'side-selection';

  const sideText = document.createElement('span');
  sideText.innerText = 'Side: ';
  sideSelection.appendChild(sideText);

  const frontButton = createButton({
    text: 'Front',
    onClick: () => {
      img.src = formatUrl(shirt.colors[availableColors[0]].front);
    },
  });

  const backButton = createButton({
    text: 'Back',
    onClick: () => {
      img.src = formatUrl(shirt.colors[availableColors[0]].back);
    },
  });

  sideSelection.appendChild(frontButton);
  sideSelection.appendChild(backButton);

  return sideSelection;
};

export const createColorSelection = (img, shirt) => {
  const availableColors = Object.keys(shirt.colors);

  const colorSelection = document.createElement('div');
  colorSelection.className = 'color-selection';

  const colorText = document.createElement('span');
  colorText.innerText = 'Color: ';
  colorSelection.appendChild(colorText);

  const colorButtons = Object.keys(shirt.colors).map((color) => {
    return createButton({
      text: color.charAt(0).toUpperCase() + color.slice(1),
      backGroundColor: color,
      onClick: () => {
        const frontImage = shirt.colors[color]?.front;
        img.src = formatUrl(frontImage);
      },
    });
  });

  colorButtons.forEach((button) => colorSelection.appendChild(button));
  return colorSelection;
};
