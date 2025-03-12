define(require => {

    const winLines = require('game/components/winLines');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let symbols = [];
    let symbolRelation = {};

    function init(data) {
        symbols = data.symbols;
        symbolRelation = data.symbolRelation;
    }

    function highlightSymbols(val) {

        symbols.forEach(e => {
            e.hideWinText();
        });

        symbolRelation[val].forEach(async (e, i) => {
            if (i === 1) {
                if(prizeData.prizeTable[symbols[e].symbolLetter] !== undefined) {
                    symbols[e].showWinText();
                } else {
                    symbols[e].showWinText({
                        text:prizeData.prizeTable[symbols[i-1].symbolLetter],
                        data:symbols[i-1].symbolLetter
                    });
                }

            }
            await symbols[e].highlight(gameConfig.winLineDelay);

        });
    }


    function assignWinningSymbols(val) {
        symbolRelation[val].forEach(e => {
            symbols[e].winningSymbol = true;
        });
    }

    function showAllWinningSymbols(state) {
        return new Promise(async resolve=>{
            symbols.forEach( e => {
                if (e.winningSymbol) {
                    e.preShow(gameConfig.displayAllWins);
                }
            });

            let any = symbols.some((e)=>{
                if(e.winningSymbol === true) {
                    return true;
                }
            });

            if(any) {
                audio.play('highlight');

                if(state === "BASEGAME") {
                    msgBus.publish('animation.play', {
                        index: 'baseGame',
                        anim:  orientation.get() === orientation.LANDSCAPE ? 'land_basegameWin_anim': 'port_basegameWin_anim',
                        loop: 0
                    });
                    msgBus.publish('animation.add', {
                        index: 'baseGame',
                        anim:  orientation.get() === orientation.LANDSCAPE ? 'land_basegameWin_idle': 'port_basegameWin_idle',
                    });
                } else {
                    msgBus.publish('animation.play', {
                        index: 'baseGame',
                        anim:  orientation.get() === orientation.LANDSCAPE ? 'land_bonusWin_anim': 'port_bonusWin_anim',
                        loop: 0
                    });
                    msgBus.publish('animation.add', {
                        index: 'baseGame',
                        anim:  orientation.get() === orientation.LANDSCAPE ? 'land_bonusWin_idle': 'port_bonusWin_idle',
                    });
                    msgBus.publish('animation.add', {
                        index: 'baseGame',
                        anim:  orientation.get() === orientation.LANDSCAPE ? 'land_bonusWin_out': 'port_bonusWin_out',
                    });
                }
            }





            Tween.delayedCall(gameConfig.displayAllWinsResolve,resolve);
        });
    }

    function sequence(state) {
        Tween.delayedCall(gameConfig.delayBeforeWinSequence, async () => {

            winLines.parseWinningData(assignWinningSymbols);

            let promise = symbols.map(async symbol => {
                if (symbol.winningSymbol === false) {
                    symbol.nonWin();
                }
            });

            await Promise.all(promise);
            await showAllWinningSymbols(state);
            await winLines.showWinlines(highlightSymbols);

            await new Promise(resolve => {
                winLines.reset();
                resolve();
            });

            msgBus.publish('Game.CheckNextGameState');
        });
    }


    return {
        init,
        sequence
    };

});