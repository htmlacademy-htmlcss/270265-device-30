"use strict";

window.Utils = window.Utils || {};

{
  window.Utils.activateModals = function() {

    const btns = document.querySelectorAll("[data-modal]");

    btns.forEach(function(btn) {
        const modalSelector = btn.getAttribute("data-modal");

        const modal = document.querySelector(`[data-modal-box="${modalSelector}"]`);
        // if !modal - go exception/alert

        btn.addEventListener("click", function(evt) {
          evt.preventDefault();
          openModal(modal);
        });

        modal.querySelector('.modal-close').addEventListener("click", function(evt) {
          evt.preventDefault();
          closeModal(modal);
        });
    });
  }

  function openModal(modal) {
    if( !modal.classList.contains("modal-show") ) {
      modal.classList.add("modal-show");
    }
  }

  function closeModal(modal) {
    if( modal.classList.contains("modal-show") ) {
      modal.classList.remove("modal-show");
      modal.classList.remove("modal-error");
    }
  }
}



