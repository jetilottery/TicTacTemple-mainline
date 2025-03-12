define(require => {
    const PIXI = require('com/pixijs/pixi');
    // const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const zOrder = require('game/components/zOrder');

    require('com/gsap/TimelineMax');
    require('com/gsap/TweenMax');
    require('com/gsap/easing/CustomEase');
    require('com/gsap/plugins/PixiPlugin');

    const Tween = window.TweenMax;
    const TimeLine = window.TimelineMax;

    const Bounce = window.CustomEase.create("custom", "M0,0 C0,0 0.022,0.609 0.044,0.712 0.049,0.737 0.07,0.976 0.1,1 0.126,1.01 0.128,0.994 0.178,0.964 0.248,1 0.204,1 0.3,1 0.41,1 1,1 1,1");

    const symbol = {
        'A': 'S01',
        'B': 'S02',
        'C': 'S03',
        'D': 'S04',
        'E': 'S05',
        'F': 'S06',
        'W': 'B01'
    };

    class Symbol extends PIXI.Sprite {
        constructor(startPosition, endPosition) {
            super();
            this.startPosition = startPosition;
            this.endPosition = endPosition;

            this.shatter = "_shatter";
            this.static = "_static";
            this.winHighlight = "_winHighlight";
            this.winAnim = "_winAnim";
            this.revert = "_revert";
            this.winStatic = "_winStatic";
            this.triggerAnim = "_triggerAnim";
            this.triggerStatic = "_triggerStatic";

            this.spineContainer = new PIXI.Container();

            this.dropTween = undefined;
            this.symbolLetter = undefined;

            // Center everything
            this.winAmmountValue = new PIXI.Text('');
            this.winAmmountValue.anchor.set(0.5);
            this.winAmmountValue.visible = false;

            this.resultContainer = new PIXI.Container();
            this.resultContainer.addChild(this.spineContainer);
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.parentIndexPosition = undefined;

            this.addChild(this.resultContainer);

            this.x = this.startPosition;
            this.y = -2000;

            // State
            this.revealed = false;

        }

        enable() {
            return new Promise(resolve => {
                this.resultContainer.visible = true;
                resolve();
            });
        }

        setAnimationState(state,loop) {

            msgBus.publish('animation.play', {
                index: this.parent.name,
                anim:  symbol[this.number] + state,
                loop: loop === undefined ? undefined : loop
            });
        }

        queueAnimationState(state,delay) {
            msgBus.publish('animation.add', {
                index: this.parent.name,
                anim:  symbol[this.number] + state,
                delay: delay === undefined ? 0 : delay
            });
        }

        bonusWinSparkle() {
        }

        highlightPulse() {
            let highlightPulseTween = new TimeLine();

            this.win.alpha = 1;

            highlightPulseTween.to(this.win, 1, {
                alpha: 0
            }, 0);
        }

        preShow() {
            if (this.symbolLetter !== 'W') {
                this.setAnimationState(this.winHighlight,0);
                this.queueAnimationState(this.static);


                // Tween.delayedCall(delay,()=>{
                //     this.setAnimationState(this.revert);
                //     this.queueAnimationState(this.static);
                // });
            }
        }

        highlight(delay) {
            return new Promise(resolve => {
                if (this.symbolLetter !== 'W') {
                    this.setAnimationState(this.winAnim,0);
                    this.queueAnimationState(this.winStatic);


                    Tween.delayedCall(delay,()=>{
                        this.setAnimationState(this.revert,0);
                        this.queueAnimationState(this.static);
                        resolve();
                    });
                }
            });
        }

        bonusPopulate() {
            return new Promise(resolve => {
                this.setAnimationState(this.triggerAnim,0);
                this.queueAnimationState(this.triggerStatic);
                audio.play('musicNight',-1);
                audio.play('transition',0,true);

                resolve();
            });
        }

        populate(number) {
            this.number = number;
            this.queueAnimationState(this.static);
            this.symbolLetter = number;

            zOrder.focusBonus(number,this);
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        reset() {
            return new Promise(resolve => {
                if(this.symbolLetter !== undefined) {
                    this.setAnimationState(this.shatter,0);
                }

                Tween.delayedCall(1,()=>{
                    this.y = -2000;
                    resolve();
                });

                this.revealed = false;
                this.matched = false;
                this.number = undefined;
                this.dropTween = undefined;
                this.symbolLetter = undefined;
                this.winningSymbol = false;
                this._filters = [];
            });
        }

        async drop(symbolIndex, reset) {
            let _this = this;

            await new Promise(resolve => {

                let dropTimeLine = new TimeLine({
                    delay: (gameConfig.symbolDelay * symbolIndex),
                    onComplete: resolve
                });

                dropTimeLine.add(() => {
                    this.dropTween.getActive()[0].data = {};
                    this.dropTween.getActive()[0].data['beforeBounce'] = true;

                    if (symbolIndex < 3) {
                        msgBus.publish('animation.play', {index: 'dustBurst' + symbolIndex, anim: 'dustBurst'});
                    }
                    if (_this.symbolLetter === 'W') {
                        _this.bonusPopulate(0.5);
                    }
                }, gameConfig.dropSpeed / 4);

                var dropSpeed = reset === undefined ? gameConfig.dropSpeed : (gameConfig.dropSpeed / 2);
                this.dropTween = dropTimeLine.to(this, dropSpeed, {
                    ease: reset === undefined ? Bounce : window.Sine.easeIn,
                    y: reset === undefined ? this.endPosition : this.endPosition + this.endPosition + 700,
                    onComplete: () => {
                        if (reset) {
                            msgBus.publish('game.checkReset');
                        }
                    }
                }, 0);
            });
        }

        match() {
            this.matched = true;
            this.win.visible = true;
            this.noWin.visible = false;
        }

        nonWin() {
            return new Promise(resolve => {
                resolve();
            });
        }

        showWinText(val) {
            let textData = "";
            let data = undefined;

            if (val !== undefined) {
                textData = val.text;
                data = symbol[val.data];
            } else {
                textData = prizeData.prizeTable[this.symbolLetter];
                data = symbol[this.symbolLetter];
            }

            text.update(this.winAmmountValue, textStyles['winLine' + data]);
            this.winAmmountValue.text = SKBeInstant.formatCurrency(textData).formattedAmount;
            this.winAmmountValue.visible = true;
        }

        hideWinText() {
            this.winAmmountValue.text = " ";
            this.winAmmountValue.visible = false;
        }

        static fromContainer(container, startPosition, endPosition) {
            const symbol = new Symbol(startPosition, endPosition);
            container.addChild(symbol);
            container.symbol = symbol;
            symbol.spineContainer.addChild(symbol.parent.children[0]);

            return symbol;
        }
    }


    return Symbol;
});
