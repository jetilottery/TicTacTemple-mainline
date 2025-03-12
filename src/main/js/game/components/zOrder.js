define(require => {

    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    let playerNumberArray = [];
    let container = undefined;

    function sort() {
        container = displayList.playerNumbers;

        playerNumberArray = [
            displayList.symbol1,
            displayList.symbol2,
            displayList.symbol3,
            displayList.symbol4,
            displayList.symbol5,
            displayList.symbol6,
            displayList.symbol7,
            displayList.symbol8,
            displayList.symbol9,
        ];

        container.addChildAt(playerNumberArray[0], 0);
        container.addChildAt(playerNumberArray[1], 3);
        container.addChildAt(playerNumberArray[2], 6);
        container.addChildAt(playerNumberArray[3], 1);
        container.addChildAt(playerNumberArray[4], 4);
        container.addChildAt(playerNumberArray[5], 7);
        container.addChildAt(playerNumberArray[6], 2);
        container.addChildAt(playerNumberArray[7], 5);
        container.addChildAt(playerNumberArray[8], 8);
    }
    function reset() {
        sort();
    }

    function focusBonus(number,symbol) {
        container = displayList.bonusSymbolLayer;

        if(number === 'W') {
            container.addChild(symbol.parent);
        }
    }

    return {
        sort,
        reset,
        focusBonus
    };
});