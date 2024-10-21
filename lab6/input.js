const targets = document.querySelectorAll('.target');

targets.forEach((item) => {
  let isSelected = false;
  let offsetX, offsetY;
  let isAssigned = false;
  let prevPos = {
    top: 0,
    left: 0,
  };

  //
  item.addEventListener('touchstart', touchStartHandler);
  item.addEventListener('dblclick', dbClickHandler);
  document.addEventListener('click', dbClickCancelHandler);
  document.addEventListener('touchstart', secondTouchHandler);
  document.addEventListener('touchend', touchEndHandler);
  document.addEventListener('touchmove', moveSelectedItem);

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

  function touchEndHandler() {
    isSelected = false;
  }

  function moveSelectedItem(touch) {
    if (isSelected || isAssigned) {
      const posX = touch.clientX || touch.touches[0].clientX;
      const posY = touch.clientY || touch.touches[0].clientY;

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
    // alert('db click');
    isAssigned = true;

    prevPos.top = item.style.top;
    prevPos.left = item.style.left;
    item.style.backgroundColor = 'black';
    document.addEventListener('touchmove', moveAssignedItem);
  }

  function dbClickCancelHandler() {
    if (isAssigned) {
      isAssigned = false;

      item.style.backgroundColor = 'red';
      document.removeEventListener('touchmove', moveAssignedItem);
    }
  }

  function resetPosition() {
    isSelected = false;
    isAssigned = false;

    item.style.top = prevPos.top;
    item.style.left = prevPos.left;
    item.style.backgroundColor = 'red';
    document.removeEventListener('touchmove', moveAssignedItem);
  }
});
