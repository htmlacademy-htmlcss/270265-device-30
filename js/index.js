"use strict";

Utils.activateModals();
Utils.activateTabs();


Utils.formChecker([
  ['.feedback form',
    [
      [
        'input, textarea',
        function( val ) { return val != ''; }
      ]
    ]
  ]
]);
