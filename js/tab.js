"use strict";

window.Utils = window.Utils || {};

{
  window.Utils.activateTabs = function() {

    const btnGroups = document.querySelectorAll("[data-tab-buttons]");

    btnGroups.forEach(function(btnGroup) {

      const tabGroupSelector = btnGroup.getAttribute('data-tab-buttons');
      const tabGroup = document.querySelector(`[data-tab-group="${tabGroupSelector}"]`);
      // if !tabGroup - go exception/alert

      btnGroup.querySelectorAll('[data-tab-button]').forEach(function(btn) {
        const tabSelector = btn.getAttribute('data-tab-button');
        const tab = tabGroup.querySelector(`[data-tab="${tabSelector}"]`);
        // if !tab - go exception/alert

        console.log(tabGroupSelector);
        console.log(tab);
        btn.addEventListener("click", function(evt) {
          evt.preventDefault();
          swtichButtonTo(btnGroup, btn);
          swtichTabTo(tabGroup, tab);
        });
      });
    });


    const anchorBtns = document.querySelectorAll("[data-tab-anchor]");
    anchorBtns.forEach(function(anchorBtn) {
      let temp = anchorBtn.getAttribute('data-tab-anchor').split('-');
      const tabBtn = document.querySelector(`[data-tab-buttons=${temp[0]}] [data-tab-button=${temp[1]}]`);
      anchorBtn.addEventListener('click', function() {
        tabBtn.click();
      })
    });
  }

  function swtichButtonTo(btnGroup, btn) {
    btnGroup.querySelectorAll('.tab-current[data-tab-button]').forEach(function(btn) { btn.classList.remove('tab-current'); });
    btn.classList.add('tab-current');
  }

  function swtichTabTo(tabGroup, tab) {
    tabGroup.querySelectorAll('.tab-current[data-tab]').forEach(function(tab) { tab.classList.remove('tab-current'); });
    tab.classList.add('tab-current');
  }
}



