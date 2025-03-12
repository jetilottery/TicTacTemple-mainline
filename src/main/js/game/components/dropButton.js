define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const symbolList = require('game/components/symbolList');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const payTable = require('game/components/paytable');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    let dropBtn;

    function init() {
        dropBtn = displayList.dropButton;

        dropBtn.on('press', async () => {
            audio.play('start');
            payTable.close(true);
            if (orientation.get() === orientation.PORTRAIT) {
                displayList.scoreBoardButton.enabled = false;
            }
            dropBtn.enabled = false;
            dropBtn.visible = false;
            displayList.helpButton.enabled = false;

            // Publish to platform
            msgBus.publish('toPlatform', {
                channel: 'Game',
                topic: 'Game.Control',
                data: { name: 'howToPlay', event: 'enable', params: [0] },
            });
            msgBus.publish('toPlatform', {
                channel: 'Game',
                topic: 'Game.Control',
                data: { name: 'paytable', event: 'enable', params: [0] },
            });

            await symbolList.reset();

        });
        dropBtn.enabled = false;
        dropBtn.visible = false;
    }

    msgBus.subscribe('UI.showHelp',()=>{
        dropBtn.enabled = false;
    });

    msgBus.subscribe('UI.hideHelp',()=>{
        dropBtn.enabled = true;
    });

    return {
        init: init,
        show: () => {
            dropBtn.enabled = true;
            dropBtn.visible = true;
        },
        hide: () => {
            dropBtn.enabled = false;
            dropBtn.visible = false;
        }
    };
});