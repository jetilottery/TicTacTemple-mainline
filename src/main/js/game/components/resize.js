define(require => {

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const payTable = require('game/components/paytable');
    const PIXI = require('com/pixijs/pixi');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

    let transitionParam;
    // let transitionContainer = {
    //     bonus: undefined,
    //     transition: undefined,
    // };

    function init() {
        setUpBackground();
    }

    function setUpBackground() {
        if (displayList.background.children.length > 0) {

            let pivotX = orientation.get() === orientation.LANDSCAPE ? -720 : -405;
            let pivotY = orientation.get() === orientation.LANDSCAPE ? -405 : -612;

            msgBus.publish('animation.play', {
                index: 'baseGame',
                anim: orientation.get() === orientation.LANDSCAPE ? 'land_basegameIdle_anim' : 'port_basegameIdle_anim'
            });

            displayList.background.children[0].pivot.set(pivotX, pivotY);

        }
    }

    function switchContainer() {}

    function preload(app, callback) {

        let channel = SKBeInstant.config.urlGameFolder + 'assetPacks/' + SKBeInstant.config.assetPack;

        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols.jpg']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols2.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols3.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols4.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols5.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols6.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols7.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols8.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols9.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols10.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols11.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols12.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols13.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols14.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols15.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/ticTacTemple_symbols16.png']);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[channel+'/spine/dustBurstAnim.png']);
        app.renderer.plugins.prepare.upload(callback);
    }

    function setUpScoreBoard() {
        if(orientation.get() === orientation.LANDSCAPE) {
            displayList.scoreBoard.pivot.x = 0;
            displayList.scoreBoard.pivot.y = 0;
            displayList.scoreBoard.scale.set(0.7);
            displayList.scoreBoard.visible = true;
            displayList.scoreBoardClose.visible = false;
            displayList.scoreBoardButton.visible = false;
            displayList.scoreBoardBackground.texture = PIXI.Texture.EMPTY;
        } else {
            payTable.close();
            displayList.scoreBoard.pivot.x = 500;
            displayList.scoreBoard.pivot.y = -100;
            displayList.scoreBoard.visible = false;
            displayList.scoreBoardClose.visible = false;
            displayList.scoreBoardButton.visible = true;
        }
        displayList.scoreBoardButton.visible = orientation.get() !== orientation.LANDSCAPE;
    }

    msgBus.subscribe('GameSize.OrientationChange', () => {
        setUpBackground();
        setUpScoreBoard();
        switchContainer(transitionParam);
    });

    return {
        init,
        switchContainer,
        preload
    };

});