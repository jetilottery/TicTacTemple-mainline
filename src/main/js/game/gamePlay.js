define(function (require) {

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const bonusBoard = require('game/components/bonusBoard');
    const totalWinBar = require('game/components/totalWinBar');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const winLines = require('game/components/winLines');
    const dropButton = require('game/components/dropButton');
    const symbolList = require('game/components/symbolList');
    const payTable = require('game/components/paytable');
    const effects = require('game/components/animation/effects');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/CustomEase');

    const Tween = window.TweenMax;

    let bonusGameIndex = 0;
    let boardIndex = 3;

    let state = undefined;
    let gameTable = undefined;
    let gameWinTable = undefined;

    function init() {
        bonusGameIndex = 0;
        totalWinBar.init();
        bonusBoard.init();

        displayList.animationLayer.visible = false;
        effects.ticketCostFall(0.2,0.4);
    }

    async function start() {
        state = 'BASEGAME';
        bonusGameIndex = 0;
        boardIndex = 3;
        await payTable.close();

        baseGame();
    }

    async function reset() {
        return new Promise(async resolve => {
            bonusBoard.reset();
            totalWinBar.reset();
            resolve();
        });
    }

    function checkNextGameState() {
        if (scenarioData.scenario.wildCard) {
            bonusGame();
        } else {
            displayList.scoreBoardButton.enabled = true;
            msgBus.publish('Game.EndOfGame');
        }
    }

    async function baseGame() {
        if (state === 'BONUSGAME') {
            await symbolList.reset();
            state = "BASEGAME";
        }
        bonusBoard.hide();
        gameTable = 'baseGame';
        gameWinTable = 'baseGameWins';
        dropButton.show();
        symbolList.enable();
        winLines.reset();
        symbolList.populate(scenarioData.scenario[gameTable], gameWinTable, state);
    }

    async function bonusGame() {
        if (state === 'BASEGAME') {

            for (let i = 0; i < 3; i++) {
                await bonusBoard.addOne(i);
            }
            state = "BONUSGAME";

            msgBus.publish('animation.play', {
                index: 'baseGame',
                anim:  orientation.get() === orientation.LANDSCAPE ? 'land_bonusTrans_IN_anim': 'port_bonusTrans_IN_anim',
                loop: 0
            });
            bonusBoard.show();
        }

        msgBus.publish('animation.add', {
            index: 'baseGame',
            anim:  orientation.get() === orientation.LANDSCAPE ? 'land_bonusIdle_anim': 'port_bonusIdle_anim'
        });

        if (bonusGameIndex < 3) {

            gameTable = 'bonusGame_' + (bonusGameIndex + 1);
            gameWinTable = 'bonusGameWins_' + (bonusGameIndex + 1);
            winLines.reset();
            symbolList.populate(scenarioData.scenario[gameTable], gameWinTable, state);
            symbolList.enable();
            bonusGameIndex++;
            boardIndex--;
            Tween.to({}, 0, {
                delay: gameConfig.nextBonusDrop,
                onComplete: async () => {
                    await symbolList.reset(1);
                    bonusBoard.removeOne(boardIndex);
                }
            });
        } else {
            displayList.scoreBoardButton.enabled = true;
            msgBus.publish('Game.EndOfGame');
        }
    }

    function transition() {
        if(state ==='BONUSGAME') {
            msgBus.publish('animation.play', {
                index: 'baseGame',
                anim:  orientation.get() === orientation.LANDSCAPE ? 'land_bonusTrans_OUT_anim': 'port_bonusTrans_OUT_anim',
                loop: 0
            });
            msgBus.publish('animation.add', {
                index: 'baseGame',
                anim:  orientation.get() === orientation.LANDSCAPE ? 'land_basegameIdle_anim': 'port_basegameIdle_anim',
            });
        }

    }

    function getState() {
        return state;
    }


    msgBus.subscribe('Game.CheckNextGameState', checkNextGameState);

    return {
        init,
        reset,
        start,
        getState,
        transition
    };
})
;