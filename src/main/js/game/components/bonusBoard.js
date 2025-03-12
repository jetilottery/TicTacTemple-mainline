define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resources = require('skbJet/component/resourceLoader/resourceLib');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const effects = require('game/components/animation/effects');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    require('com/gsap/TweenLite');
    require('com/gsap/easing/CustomEase');
    require('com/gsap/plugins/PixiPlugin');
    require('com/pixijs/pixi-particles');
    // require('com/pixijs/pixi-filters');

    const Tween = window.TweenLite;

    let plaques = [];
    let dropping = false;
    let droppingTween = null;

    // let animation;

    function init() {
        plaques = [
            displayList.bonusTurn1Plaque,
            displayList.bonusTurn2Plaque,
            displayList.bonusTurn3Plaque,
        ];
        displayList.bonusTurnsText.alpha = 0;
        checkPlural();
        hide();
    }


    function show() {
        displayList.bonusTurnsContainer.visible = true;

        Tween.to(displayList.infoText, 1, {
            alpha: 0,
            onComplete: () => {
                displayList.infoText.visible = false;
            }
        });
    }

    function hide() {
        displayList.bonusTurnsContainer.visible = false;
        displayList.infoText.visible = true;
    }

    function reset() {
        checkPlural();
        plaques.forEach(e => {
            e.y = orientation.get() === orientation.LANDSCAPE ? -600 : -2000;
            e.alpha = 0;
        });
        displayList.bonusTurnsText.alpha = 0;

        hide();
    }

    function addOne(index) {
        return new Promise(resolve => {
            show();
            checkPlural(index);
            plaques[index].alpha = 1;
            if (plaques[index - 1] !== undefined) {
                Tween.to(plaques[index - 1], gameConfig.bonusNumberDropIN, {
                    delay: gameConfig.bonusNumberDropINDelay,
                    alpha: 0
                });
            }

            plaques[index].y = orientation.get() === orientation.LANDSCAPE ? -600 : -2000;

            droppingTween = Tween.to(plaques[index], 0.2, {
                y: 0,
                delay: 1,
                onStart:()=> {
                    dropping = true;
                },
                onComplete: () => {
                    dropping = false;
                    audio.playSequential('bonusTurnIncrease');
                    effects.shake(displayList.backgroundContainer.parent, 0.01, 4);
                    if (displayList.bonusTurnsText.alpha === 0) {
                        Tween.to(displayList.bonusTurnsText, 0.3, {
                            alpha: 1,
                        });
                    }
                    resolve();
                }
            });
        });

    }

    function removeOne(index) {
        checkPlural(index, true);
        Tween.to(plaques[index], 0.3, {
            y: 600,
            alpha: 0,
        });
        if (plaques[index - 1] !== undefined) {
            Tween.to(plaques[index - 1], gameConfig.bonusNumberDropOUT, {
                alpha: 1,
            });
        }


        if (index === 0) {
            displayList.infoText.visible = true;
            displayList.infoText.alpha = 0;

            Tween.to(displayList.infoText, 1, {
                alpha: 1
            });
            Tween.to(displayList.bonusTurnsText, 1, {
                alpha: 0
            });
        }
    }

    function checkPlural(index) {
        if (index === 1) {
            displayList.bonusTurnsText.text = resources.i18n.game.Game.bonusTurn;
        } else {
            displayList.bonusTurnsText.text = resources.i18n.game.Game.bonusTurns;
        }
    }

    function onOrientaitonChange() {
        if(dropping === true){
            droppingTween.restart();
        }
    }

    msgBus.subscribe('GameSize.OrientationChange',onOrientaitonChange);

    return {
        init,
        show,
        hide,
        reset,
        addOne,
        removeOne,
    };
});