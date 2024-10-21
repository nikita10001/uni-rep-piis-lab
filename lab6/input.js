const targets = document.querySelectorAll('.target');

targets.forEach((item) => {
  let isSelected = false;
  let offsetX, offsetY;
  let isAssigned = false;
  let prevPos = {
    top: 0,
    left: 0,
  };

  // item.addEventListener('mousedown', clickDownHandler);
  // document.addEventListener('mouseup', clickUpHandler);
  document.addEventListener('mousemove', moveSelectedItem);
  item.addEventListener('dblclick', dbClickHandler);
  document.addEventListener('click', dbClickCancelHandler);
  item.addEventListener('touchstart', touchStartHandler);
  document.addEventListener('touchstart', secondTouchHandler);
  document.addEventListener('touchend', touchEndHandler);
  document.addEventListener('touchmove', moveSelectedItem);

  function clickDownHandler(mouse) {
    if (!isAssigned) {
      isSelected = true;

      offsetX = mouse.clientX - item.getBoundingClientRect().left;
      offsetY = mouse.clientY - item.getBoundingClientRect().top;
    }
  }

  function touchStartHandler(touch) {
    if (!isAssigned) {
      isSelected = true;
      const touchPoint = touch.touches[0];
      offsetX = touchPoint.clientX - item.getBoundingClientRect().left;
      offsetY = touchPoint.clientY - item.getBoundingClientRect().top;
    }
  }

  function secondTouchHandler(touch) {
    if (isAssigned && touch.touches.length === 2) {
      resetPosition();
    }
  }

  function clickUpHandler() {
    isSelected = false;
  }

  function touchEndHandler() {
    isSelected = false;
  }

  function moveSelectedItem(mouse) {
    if (isSelected || isAssigned) {
      const posX = mouse.clientX || mouse.touches[0].clientX;
      const posY = mouse.clientY || mouse.touches[0].clientY;

      item.style.top = `${posY - offsetY}px`;
      item.style.left = `${posX - offsetX}px`;
    }
  }

  function moveAssignedItem(mouse) {
    if (isAssigned) {
      item.style.top = `${mouse.clientY - offsetY}px`;
      item.style.left = `${mouse.clientX - offsetX}px`;
    }
  }

  function dbClickHandler() {
    isAssigned = true;

    prevPos.top = item.style.top;
    prevPos.left = item.style.left;
    item.style.backgroundColor = 'black';
    document.addEventListener('mousemove', moveAssignedItem());
  }

  function dbClickCancelHandler() {
    if (isAssigned) {
      isAssigned = false;

      item.style.backgroundColor = 'red';
      document.removeEventListener('mousemove', moveAssignedItem());
    }
  }

  function resetPosition() {
    isSelected = false;
    isAssigned = false;

    item.style.top = prevPos.top;
    item.style.left = prevPos.left;
    item.style.backgroundColor = 'red';
    document.removeEventListener('mousemove', moveAssignedItem);
  }
});
