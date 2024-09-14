function init() {
  const container = document.getElementById('shirts-container');

  const createButton = (text) => {
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = text;
    return button;
  };

  const renderItem = (item) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.colors?.white?.front || item.default?.front;
    img.alt = item?.name || 'T-Shirt';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = item?.name || 'No name T-Shirt';

    const text = document.createElement('div');
    text.className = 'card-text';
    text.textContent = `Price: ${item?.price || 0}`;

    const quickViewButton = createButton('Quick View');
    const seePageButton = createButton('See Page');

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(quickViewButton);
    card.appendChild(seePageButton);

    container.appendChild(card);
  };

  const renderList = (items, renderItem) => {
    items.forEach(renderItem);
  };

  renderList(shirts, renderItem);
}

init();
