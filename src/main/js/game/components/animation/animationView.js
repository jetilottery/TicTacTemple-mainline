define(require => {

    const animationController = require('game/components/animation/animationController');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    function init() {
        animationController.addAnimation({
            index: 'baseGame',
            file: 'ticTacTemple_background',
            loop: true,
            x: 0,
            y: 0,
            pivotX:orientation.get() === orientation.LANDSCAPE ? -720 : -405,
            pivotY:orientation.get() === orientation.LANDSCAPE ? -405 : -612,
            container: displayList.background
        });
        animationController.addAnimation({
            index: 'dustBurst0',
            file: 'dustBurstAnim',
            loop: false,
            x: orientation.get() === orientation.LANDSCAPE ? 510 : 180,
            y: orientation.get() === orientation.LANDSCAPE ? 410 : 620,
            pivotX:0,
            pivotY:0,
            container: displayList.particlesLayer
        });
        animationController.addAnimation({
            index: 'dustBurst1',
            file: 'dustBurstAnim',
            loop: false,
            x: orientation.get() === orientation.LANDSCAPE ? 720 : 410,
            y: orientation.get() === orientation.LANDSCAPE ? 410 : 620,
            pivotX:0,
            pivotY:0,
            container: displayList.particlesLayer
        });
        animationController.addAnimation({
            index: 'dustBurst2',
            file: 'dustBurstAnim',
            loop: false,
            x: orientation.get() === orientation.LANDSCAPE ? 910 : 660,
            y: orientation.get() === orientation.LANDSCAPE ? 410 : 620,
            pivotX:0,
            pivotY:0,
            container: displayList.particlesLayer
        });
        animationController.addAnimation({
            index: 'dustBurstMeter',
            file: 'dustBurstAnim',
            loop: false,
            x: orientation.get() === orientation.LANDSCAPE ? 0 : 0,
            y: orientation.get() === orientation.LANDSCAPE ? -170 : -170,
            pivotX:0,
            pivotY:0,
            container: displayList.ticketSelectBar
        });
        animationController.addAnimation({
            index: 'winEffect',
            file: 'winEffect',
            loop: true,
            x: 0,
            y: -100,
            pivotX:0,
            pivotY:0,
            container: displayList.totalWinBar,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol1',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol1,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol2',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol2,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol3',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol3,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol4',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol4,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol5',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol5,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol6',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol6,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol7',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol7,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol8',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol8,
            back:true
        });
        animationController.addAnimation({
            index: 'symbol9',
            file: 'ticTacTemple_symbols',
            loop: true,
            x: 0,
            y: 0,
            pivotX:0,
            pivotY:0,
            container: displayList.symbol9,
            back:true
        });

    }

    msgBus.subscribe('animation.play', data => {
        animationController.playAnimation(data);
    });

    msgBus.subscribe('animation.add', data => {
        animationController.queueAnimation(data);
    });

    return {
        init
    };

});