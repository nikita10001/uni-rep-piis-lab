import { shirts } from '../data/shirts.js';
import {
  createColorSelection, //
  createDescription,
  createPrice,
  createSideSelection,
  createTitle,
  createImageContainer,
} from './common.js';
import { SELECTED_SHIRT_KEY, storage } from './utils/storage.js';

function init() {
  const container = document.querySelector('.shirt-details');
  const shirt = storage.getItem(SELECTED_SHIRT_KEY) || shirts[1];
  const { imgContainer, img } = createImageContainer(shirt);
  const title = createTitle(shirt);
  const price = createPrice(shirt);
  const description = createDescription(shirt);
  const sideSelection = createSideSelection(img, shirt);
  const colorSelection = createColorSelection(img, shirt);

  container.appendChild(imgContainer);
  const bodyContainer = document.createElement('div');
  bodyContainer.className = 'body-container';

  bodyContainer.appendChild(title);
  bodyContainer.appendChild(price);
  bodyContainer.appendChild(description);
  bodyContainer.appendChild(sideSelection);
  bodyContainer.appendChild(colorSelection);

  container.appendChild(bodyContainer);
}

init();
