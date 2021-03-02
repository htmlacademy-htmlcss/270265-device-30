"use strict";

{
  const priceFieldset = document.querySelector('.filter-price');

  priceFieldset.classList.add("hide-price-fieldset");

  const minLabel = priceFieldset.querySelector('.filter-price-min');
  const minInput = minLabel.querySelector('input');

  const maxLabel = priceFieldset.querySelector('.filter-price-max');
  const maxInput = maxLabel.querySelector('input');

  priceFieldset.innerHTML += /*html*/`
    <div class="price-range">
      <div class="price-range-filler">
        <div class="price-range-grey-left"></div>
        <div class="price-range-grey-right"></div>
        <div class="range-control range-control-min">
          <span class="range-sublabel">от <span class="range-from"></span></span>
        </div>
        <div class="range-control range-control-max">
        <span class="range-sublabel">до <span class="range-to"></span></span>
        </div>
      </div>
    </div>
  `;

  const range = priceFieldset.querySelector('.price-range');
  const rangeWidth = range.offsetWidth;
  const minRangeValue = minInput.getAttribute('min');
  const maxRangeValue = maxInput.getAttribute('max');
  const rangeCoeff = (maxRangeValue - minRangeValue) / rangeWidth;
  const greyLeft = priceFieldset.querySelector('.price-range-grey-left');
  const greyRight = priceFieldset.querySelector('.price-range-grey-right');
  const rangeFrom = range.querySelector('.range-from');
  const rangeTo = range.querySelector('.range-to');

  let minControl = range.querySelector('.range-control-min');
  let minControlLeft = 0;
  let maxControl = range.querySelector('.range-control-max');
  let maxControlLeft = 0;

  const rightOffsetFix = -20;

  minControlLeft = getControlOffset(minInput.value);
  maxControlLeft = getControlOffset(maxInput.value, rightOffsetFix);

  moveMinControl(minInput.value);
  moveMaxControl(maxInput.value);

  let prevX = 0;
  let newX = 0;
  minControl.onmousedown = minMouseDown;
  maxControl.onmousedown = maxMouseDown;


  function getControlOffset(value, offsetFix = 0) {
    return ( value / rangeCoeff ) + offsetFix;
  }

  function getValueByOffset(offset, offsetFix = 0) {
    return Math.round( (offset - offsetFix) * rangeCoeff );
  }

  function moveMinControl() {
    minControl.style.left = `${minControlLeft}px`;
    greyLeft.style.width = `${minControlLeft}px`;
    rangeFrom.innerHTML = minInput.value;
  }

  function moveMaxControl() {
    maxControl.style.left = `${maxControlLeft}px`;
    greyRight.style.width = rangeWidth - maxControlLeft + 'px';
    rangeTo.innerHTML = maxInput.value;
  }



  function minMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    prevX = e.clientX;
    newX = e.clientX;
    document.onmouseup = rangeControlMouseUp;
    document.onmousemove = minMouseMove;
  }

  function minMouseMove(e) {
    e = e || window.event;
    e.preventDefault();

    minControlLeft = parseInt(minControl.style.left) + newX - prevX;

    if( minControlLeft < 0 ) {
      minControlLeft = 0;
    } else if( minControlLeft > rangeWidth ) {
      minControlLeft = rangeWidth;
    } else if( minControlLeft >= maxControlLeft - 20 ) {
      minControlLeft = maxControlLeft - 20;
    }

    minInput.value = getValueByOffset(minControlLeft);
    moveMinControl();

    prevX = newX;
    newX = e.clientX;
  }

  function maxMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    prevX = e.clientX;
    newX = e.clientX;
    document.onmouseup = rangeControlMouseUp;
    document.onmousemove = maxMouseMove;
  }

  function maxMouseMove(e) {
    e = e || window.event;
    e.preventDefault();

    maxControlLeft = parseInt(maxControl.style.left) + newX - prevX;

    if( maxControlLeft < rightOffsetFix ) {
      maxControlLeft = rightOffsetFix;
    } else if( maxControlLeft > rangeWidth + rightOffsetFix ) {
      maxControlLeft = rangeWidth + rightOffsetFix;
    } else if( maxControlLeft <= minControlLeft + 20 ) {
      maxControlLeft = minControlLeft + 20;
    }

    maxInput.value = getValueByOffset(maxControlLeft, rightOffsetFix);
    moveMaxControl();

    prevX = newX;
    newX = e.clientX;
  }

  function rangeControlMouseUp() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

}
