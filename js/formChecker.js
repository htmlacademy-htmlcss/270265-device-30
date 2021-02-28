"use strict";

window.Utils = window.Utils || {};

{
  window.Utils.formChecker = function(checkers) {

    if( !checkers ) return;

    checkers.forEach(function(checker) {
      const form = document.querySelector(checker[0]);
      let fieldsToCheck = [];

      checker[1].forEach(function( checkerData ) {
        const fields = form.querySelectorAll(checkerData[0]);

        fields.forEach(function(field) {
          field.check = checkerData[1];
          field.oninput = function() {
            this.classList.remove('invalid');
          }
          fieldsToCheck.push(field);
        });
      });

      form.onsubmit = function() {

        let success = true;
        fieldsToCheck.forEach(function(field) {
          if( !field.check(field.value) ) {
            field.classList.add('invalid');
            success = false;
          }
        });
        return success;
      }
    });
  }
}
