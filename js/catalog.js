"use strict";

{
  const priceFieldset = document.querySelector('.filter-price');

  priceFieldset.classList.add("hide-price-fieldset");

  const minLabel = priceFieldset.querySelector('.filter-price-min');
  const minInput = minLabel.querySelector('input');
  minInput.setAttribute('type', 'hidden');

  const maxLabel = priceFieldset.querySelector('.filter-price-max');
  const maxInput = maxLabel.querySelector('input');
  maxInput.setAttribute('type', 'hidden');

  priceFieldset.innerHTML += /*html*/`
    <div class="price-range">
      <div class="price-range-filler">
        <div class="range-control range-control-min"></div>
        <div class="range-control range-control-max"></div>
      </div>
    </div>
  `;

  const range = priceFieldset.querySelector('.price-range');
  const rangeWidth = range.offsetWidth;
  const minRangeValue = minInput.getAttribute('min');
  const maxRangeValue = maxInput.getAttribute('max');
  const rangeCoeff = (maxRangeValue - minRangeValue) / rangeWidth;

  let minControl = range.querySelector('.range-control-min');
  let minControlLeft = 0;
  let maxControl = range.querySelector('.range-control-max');
  let maxControlLeft = 0;

  const offsetFix = -10;

  setMinControlByValue(minInput.value);
  setMaxControlByValue(maxInput.value);

  let prevX = 0;
  let newX = 0;
  minControl.onmousedown = minMouseDown;
  maxControl.onmousedown = maxMouseDown;


  function getControlOffset(value) {
    return ( value / rangeCoeff ) + offsetFix;
  }

  function getValueByOffset(offset) {
    return Math.round( (offset - offsetFix) * rangeCoeff );
  }

  function setMinControlByValue( value ) {
    minControlLeft = getControlOffset(value);
    minControl.style.left = `${minControlLeft}px`;
  }

  function setMaxControlByValue( value ) {
    maxControlLeft = getControlOffset(value);
    maxControl.style.left = `${maxControlLeft}px`;
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
    if( minControlLeft < offsetFix ) {
      minControlLeft = offsetFix;
    } else if( minControlLeft > rangeWidth + offsetFix ) {
      minControlLeft = rangeWidth + offsetFix;
    } else if( minControlLeft >= maxControlLeft - 20 ) {
      minControlLeft = maxControlLeft - 20;
    }
    minControl.style.left = minControlLeft + 'px';
    prevX = newX;
    newX = e.clientX;
    minInput.value = getValueByOffset(minControlLeft);
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
    if( maxControlLeft < offsetFix ) {
      maxControlLeft = offsetFix;
    } else if( maxControlLeft > rangeWidth + offsetFix ) {
      maxControlLeft = rangeWidth + offsetFix;
    } else if( maxControlLeft <= minControlLeft + 20 ) {
      maxControlLeft = minControlLeft + 20;
    }
    maxControl.style.left = maxControlLeft + 'px';
    prevX = newX;
    newX = e.clientX;
    maxInput.value = getValueByOffset(maxControlLeft);
  }

  function rangeControlMouseUp() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

}
