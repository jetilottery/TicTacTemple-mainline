define(require => {
    const PIXI = require('com/pixijs/pixi');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/CustomEase');

    const Tween = window.TweenMax;

    const dataTransFrom = {
        'S01' : '01',
        'S02' : '02',
        'S03' : '03',
        'S04' : '04',
        'S05' : '05',
        'S06' : '06',
    };


    class PayTableLine extends PIXI.Sprite {
        constructor(container) {
            super();

            this.sprite = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.spriteHighlight = new PIXI.Sprite(PIXI.Texture.EMPTY);

            this.spriteContainer = new PIXI.Container();
            this.spriteContainer.addChild(this.sprite);
            this.sprite.addChild(this.spriteHighlight);

            this.spriteContainer.children.forEach(e => {
                e.anchor.set(0.5);
            });

            this.sprite.children.forEach(e => {
                e.anchor.set(0.5);
            });

            this.spriteContainer.x = 120;
            this.spriteContainer.y = 0;
            this.spriteContainer.scale.x = 0.4;
            this.spriteContainer.scale.y = 0.4;

            container.addChildAt(this.spriteContainer, 0);

            this.tween = [];
        }

        async show(data) {
            return new Promise(resolve => {
                this.sprite.texture = PIXI.Texture.from('paytable_' + dataTransFrom[data] + '_off');
                this.spriteHighlight.texture = PIXI.Texture.from('paytable_' + dataTransFrom[data] + '_on');
                this.spriteHighlight.alpha = 0;
                this.sprite.alpha = 0;
                this.sprite.visible = true;

                this.sprite.alpha = 1;

                this.tween[1] = Tween.fromTo(this.spriteHighlight, gameConfig.payTableWinlineSpeed, {
                    alpha: 0,
                }, {
                    alpha: 1,
                    onComplete: () => {

                        this.tween[2] = Tween.to(this.spriteHighlight, (gameConfig.payTableWinlineSpeed / 4), {
                            delay: gameConfig.payTableWinlineSpeed / 4,
                            alpha: 0,
                        });

                        this.tween[3] = Tween.to(this.sprite, (gameConfig.payTableWinlineSpeed / 2), {
                            delay: gameConfig.payTableWinlineSpeed,
                            alpha: 0,
                            onComplete: resolve
                        });
                    }
                });
            });
        }

        reset() {
            this.sprite.visible = false;
            this.spriteHighlight.visible = false;
            this.tweens.forEach(e => {
                e.kill();
            });
            this.tween = [];
        }
    }

    return PayTableLine;

});