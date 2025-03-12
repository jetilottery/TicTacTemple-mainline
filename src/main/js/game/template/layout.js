define({
    _BASE_APP: {
        children: [
            'backgroundContainer',
            'transitionLayer',
            'logo',
            'playerNumbers',
            'symbolBase',
            "bonusSymbolLayer",
            "prizeValueLayer",
            'symbolMask',
            'selectionContainer',
            'winUpTo',
            'infoText',
            'scoreBoardButton',
            'scoreBoardClose',
            'totalWinBar',
            'scoreBoard',
            'dropButton',
            'particlesLayer'
        ],
    },

    /*
     * BACKGROUND
     */
    backgroundContainer: {
        type: 'container',
        children: [
            'background',
            'selection'
        ],
    },

    background: {
        type: 'sprite',
        texture: 'landscape_background',
    },
    backgroundBonusGame: {
        type: 'sprite',
        texture: 'landscape_bonusBackground',
    },
    selection: {
        type: 'sprite',
        landscape: {
            texture: 'plaques'
        }
    },
    infoText: {
        type: 'text',
        style: 'infoText',
        children: ['infoSymbol'],
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 290,
            y: 482,
            wordWrapWidth: 200,
            string: 'infoText'
        },
        portrait: {
            x: 405,
            y: 946,
            wordWrapWidth: 400,
            maxWidth: 340,
            string: 'infoTextPortrait'
        },
    },

    infoSymbol: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_B01',
            x: -160,
            anchor: 0.5,
            scale: 0.3,
            visible: true
        },
        portrait: {
            visible: false
        }
    },

    transitionLayer: {
        type: 'container'
    },

    /*
     * LOGO
     */
    logo: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 208,
            y: 122,
            scale: 0.65,
            texture: 'landscape_gameLogo',
        },
        portrait: {
            x: 410,
            y: 102,
            scale: 1,
            texture: 'portraitLogo',
        },
    },

    selectionContainer: {
        type: 'container',
        children: [
            'selectionLeft',
            'selectionRight'
        ]
    },

    selectionLeft: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'plaque_left_landscape',
            x: 220,
            y: 417
        },
        portrait: {
            texture: 'portrait_banner_top',
            x: 410,
            y: 170,
        }
    },
    selectionRight: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'landscape_paytable',
            x: 1217,
            y: 367
        },
        portrait: {
            texture: 'portrait_banner_info',
            x: 410,
            y: 944,
        }
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut'],
        landscape: {x: 216, y: 275, scale:0.9},
        portrait: {x: 405, y: 169, scale: 1},
    },
    winUpToIn: {
        type: 'container',
        children: ['winUpToInText'],
    },
    winUpToInText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
        align: 'center'
    },
    winUpToOut: {
        type: 'container',
        children: ['winUpToOutText'],
    },
    winUpToOutText: {
        type: 'text',
        style: 'winUpTo',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 400,
        align: 'center'
    },

    particlesLayer: {
        children: [
            'bonusTurnsContainer',
            'particlesContainer_1',
            'particlesContainer_2',
            'particlesContainer_3',
            'animationLayer',
        ],
        type: 'container',
    },

    particlesContainer_1: {
        type: 'container',
    },
    particlesContainer_2: {
        type: 'container',
    },
    particlesContainer_3: {
        type: 'container',
    },

    animationLayer: {
        landscape: {
            x: 720, y: 405
        },
        portrait: {
            x: 405, y: 614
        },
        type: 'sprite',

        anchor: 0.5
    },

    /*
     * WINNING NUMBERS
     */
    // winningNumbers: {
    //   type: 'container',
    //   children: [
    //     'winningNumbersTitle',
    //     'winningNumber1',
    //     'winningNumber2',
    //     'winningNumber3',
    //     'winningNumber4',
    //   ],
    //   landscape: { x: 16, y: 297 },
    //   portrait: { x: 106, y: 243 },
    // },
    // winningNumbersTitle: {
    //   type: 'text',
    //   string: 'luckyNumbers',
    //   style: 'winningNumbersTitle',
    //   anchor: 0.5,
    //   maxWidth: 350,
    //   landscape: { x: 311, y: 32 },
    //   portrait: { x: 299, y: 27 },
    // },
    // winningNumber1: {
    //   type: 'container',
    //   landscape: { x: 92, y: 133, scale: 1 },
    //   portrait: { x: 89, y: 120, scale: 0.914 },
    // },
    // winningNumber2: {
    //   type: 'container',
    //   landscape: { x: 238, y: 133, scale: 1 },
    //   portrait: { x: 229, y: 120, scale: 0.914 },
    // },
    // winningNumber3: {
    //   type: 'container',
    //   landscape: { x: 384, y: 133, scale: 1 },
    //   portrait: { x: 369, y: 120, scale: 0.914 },
    // },
    // winningNumber4: {
    //   type: 'container',
    //   landscape: { x: 530, y: 133, scale: 1 },
    //   portrait: { x: 509, y: 120, scale: 0.914 },
    // },


    /*
     * PLAYER NUMBERS
     */
    bonusCard: {
        type: 'sprite',
        children: ['bonusWin', 'bonusNoWin', 'bonusCover'],
        texture: 'bonusBackground',
        anchor: 0.5,
        landscape: {x: 320, y: 587},
        portrait: {x: 405, y: 496},
    },
    bonusWin: {
        type: 'container',
        children: ['bonusWinText'],
    },
    bonusWinText: {
        type: 'text',
        style: 'bonusWin',
        anchor: 0.5,
        maxWidth: 320,
    },
    bonusNoWin: {
        type: 'text',
        string: 'bonusNoWin',
        style: 'bonusNoWin',
        anchor: 0.5,
        maxWidth: 320,
    },
    bonusCover: {
        type: 'animatedSprite',
        children: ['bonusLabel'],
        textures: 'bonusCover',
        anchor: 0.5,
    },
    bonusLabel: {
        type: 'text',
        string: 'bonus',
        style: 'bonusLabel',
        anchor: 0.5,
        maxWidth: 320,
    },

    bonusSymbolLayer: {
        type: "container",
        landscape: {x: 643, y: 133, scale: 0.83},
        portrait: {x: 310, y: 284, scale: 1},
    },

    prizeValueLayer: {
        type: 'container',
        landscape: {x: 643, y: 133, scale: 0.83},
        portrait: {x: 310, y: 284, scale: 1},
    },

    /*
     * PLAYER NUMBERS
     */
    playerNumbers: {
        type: 'container',
        children: [
            'symbol1',
            'symbol2',
            'symbol3',
            'symbol4',
            'symbol5',
            'symbol6',
            'symbol7',
            'symbol8',
            'symbol9',
        ],
        landscape: {x: 643, y: 133, scale: 0.83},
        portrait: {x: 310, y: 284, scale: 1},
    },

    symbol1: {
        type: 'container',
    },
    symbol2: {
        type: 'container',
    },
    symbol3: {
        type: 'container',
    },
    symbol4: {
        type: 'container',
    },
    symbol5: {
        type: 'container',
    },
    symbol6: {
        type: 'container',
    },
    symbol7: {
        type: 'container',
    },
    symbol8: {
        type: 'container',
    },
    symbol9: {
        type: 'container',
    },

    symbolMask: {
        type: 'rectangle',
        fill: '0x000000',
        fillAlpha: 1,
        landscape: {
            x: 220,
            y: 0,
            width: 1000,
            height: 700,
            anchor: 0.5
        },
        portrait: {
            x: -100,
            y: 170,
            width: 1000,
            height: 700,
            anchor: 0.5
        },
    },
    symbolBase: {
        type: 'sprite',
        texture: 'base_landscape',
        anchor: 0.5,
        landscape: {
            x: 732,
            y: 400,
            scale: 1
        },
        portrait: {
            x: 410,
            y: 595,
            scale: 1.2
        }

    },

    scoreBoard: {
        children: [
            'scoreBoardBackground',
            'scoreBoard_fishContainer',
            'scoreBoard_flowerContainer',
            'scoreBoard_moonMaskContainer',
            'scoreBoard_parrotContainer',
            'scoreBoard_starMaskContainer',
            'scoreBoard_straightFacedContainer'
        ],
        type: 'container',
        landscape: {x: 1130, y: 190, scale: 0.8},
        portrait: {x: 750, y: 180, scale: 1},
    },

    scoreBoardBackground: {
        type: 'sprite',
        portrait: {
            x: 150,
            y: 230,
            texture: 'portraitPaytableBackground',
            anchor: 0.5,
        }
    },
    scoreBoardButton: {
        type: 'button',
        portrait: {x: 740, y: 140},
        textures: {
            enabled: 'paytableDropdown_Enabled',
            over: 'paytableDropdown_Over',
            pressed: 'paytableDropdown_Pressed',
            disabled: 'paytableDropdown_Disaabled',
        },
    },
    scoreBoardClose: {
        type: 'button',
        portrait: {x: 740, y: 140},
        textures: {
            enabled: 'portrait_PaytableClose',
            over: 'portrait_PaytableClose_Over',
            pressed: 'portrait_PaytableClose_Pressed',
            disabled: 'portrait_PaytableClose',
        },
    },
    scoreBoard_fishContainer: {
        children: [
            'scoreBoard_fishSymbol',
            'scoreBoard_fishValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 360},
        portrait: {x: 0, y: 360},
    },

    scoreBoard_fishSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_S05",
            x: 0, y: 0,
            scale:0.7
        },
        portrait: {
            texture: "paytable_S05",
            x: 0, y: 0,
            scale:0.7
        },
    },

    scoreBoard_fishValue: {
        type: 'text',
        style: 'paytableGeneral',
        wordWrap: true,
        align: 'left',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 700, maxWidth: 200},
        portrait: {x: 90, y: 0, wordWrapWidth: 400},
    },

    scoreBoard_flowerContainer: {
        children: [
            'scoreBoard_flowerSymbol',
            'scoreBoard_flowerValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 450},
        portrait: {x: 0, y: 450},
    },

    scoreBoard_flowerSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_S06",
            x: 0, y: 0,
            scale:0.7
        },
        portrait: {
            texture: "paytable_S06",
            x: 0, y: 0,
            scale:0.7
        },
    },

    scoreBoard_flowerValue: {
        type: 'text',
        style: 'paytableGeneral',
        wordWrap: true,
        align: 'left',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 700, maxWidth: 200},
        portrait: {x: 90, y: 0, wordWrapWidth: 400},
    },


    scoreBoard_moonMaskContainer: {
        children: [
            'scoreBoard_moonMaskSymbol',
            'scoreBoard_moonMaskValue',
        ],
        type: 'container',
        landscape: {x: 0, y: 90},
        portrait: {x: 0, y: 90},
    },

    scoreBoard_moonMaskSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_S02",
            x: 0, y: 0,
            scale:0.7
        },
        portrait: {
            texture: "paytable_S02",
            x: 0, y: 0,
            scale:0.7
        },
    },

    scoreBoard_moonMaskValue: {
        type: 'text',
        style: 'paytableS02',
        wordWrap: true,
        align: 'left',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 700, maxWidth: 200},
        portrait: {x: 90, y: 0, wordWrapWidth: 400},
    },


    scoreBoard_parrotContainer: {
        children: [
            'scoreBoard_parrotSymbol',
            'scoreBoard_parrotValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 270},
        portrait: {x: 0, y: 270},
    },

    scoreBoard_parrotSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_S04",
            x: 0, y: 0,
            scale:0.7
        },
        portrait: {
            texture: "paytable_S04",
            x: 0, y: 0,
            scale:0.7
        },
    },

    scoreBoard_parrotValue: {
        type: 'text',
        style: 'paytableGeneral',
        wordWrap: true,
        align: 'left',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 700, maxWidth: 200},
        portrait: {x: 90, y: 0, wordWrapWidth: 400},
    },

    scoreBoard_starMaskContainer: {
        children: [
            'scoreBoard_starMaskSymbol',
            'scoreBoard_starMaskValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 0},
        portrait: {x: 0, y: 0},
    },

    scoreBoard_starMaskSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_S01",
            x: 0, y: 0,
            scale:0.7
        },
        portrait: {
            texture: "paytable_S01",
            x: 0, y: 0,
            scale:0.7
        },
    },

    scoreBoard_starMaskValue: {
        type: 'text',
        style: 'paytableS01',
        wordWrap: true,
        align: 'left',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 700, maxWidth: 200},
        portrait: {x: 90, y: 0, wordWrapWidth: 400},
    },

    scoreBoard_straightFacedContainer: {
        children: [
            'scoreBoard_straightFacedMaskSymbol',
            'scoreBoard_straightFacedMaskValue'
        ],
        type: 'container',
        landscape: {x: 0, y: 180},
        portrait: {x: 0, y: 180},
    },

    scoreBoard_straightFacedMaskSymbol: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: "paytable_S03",
            x: 0, y: 0,
            scale:0.7
        },
        portrait: {
            texture: "paytable_S03",
            x: 0, y: 0,
            scale:0.7
        },
    },

    scoreBoard_straightFacedMaskValue: {
        type: 'text',
        style: 'paytableS03',
        wordWrap: true,
        align: 'left',
        anchor: {X: 0, y: 0.5},
        landscape: {x: 70, y: 0, wordWrapWidth: 700, maxWidth: 200},
        portrait: {x: 90, y: 0, wordWrapWidth: 400},
    },

    totalWinBar: {
        type: 'container',
        children: [
            'totalWinLabel',
            'totalWinValue'
        ],
        anchor: 0.5,
        landscape: {
            x: 720, y: 470
        },
        portrait: {
            x: 410, y: 630
        }
    },
    totalWinLabel: {
        type: 'text',
        string: 'totalWin',
        anchor: 0.5,
        style: 'totalWinLabel',
        landscape: {x: 0, y: -195},
        portrait: {x: 0, y: -195},
    },
    totalWinValue: {
        type: 'text',
        anchor: 0.5,
        style: 'totalWinValue',
        landscape: {x: 0, y: -100},
        portrait: {x: 0, y: -100},
    },

    bonusTurnsContainer: {
        children: [
            'bonusTurn1Plaque',
            'bonusTurn2Plaque',
            'bonusTurn3Plaque',
            'bonusTurnsText',
            'bonusParticles',
        ],
        type: 'container',
        landscape: {
            x: -20, y: 330,
            scale: 1
        },
        portrait: {
            x: 130,
            y: 850,
            scale: 0.6
        }
    },

    bonusTurn1Plaque: {
        type: 'sprite',
        landscape: {
            texture: 'landBonusTurns_num1',
            x: 0, y: 0
        },
        portrait: {
            texture: 'landBonusTurns_num1',
            x: 0, y: 0
        }
    },

    bonusTurn2Plaque: {
        type: 'sprite',
        landscape: {
            texture: 'landBonusTurns_num2',
            x: 0, y: 0
        },
        portrait: {
            texture: 'landBonusTurns_num2',
            x: 0, y: 0
        }
    },

    bonusTurn3Plaque: {
        type: 'sprite',
        landscape: {
            texture: 'landBonusTurns_num3',
            x: 0, y: 0
        },
        portrait: {
            texture: 'landBonusTurns_num3',
            x: 0, y: 0
        }
    },

    bonusParticles: {
        type: 'container',
        landscape: {x: 0, y: 0},
        portrait: {x: 0, y: 0}
    },

    bonusTurnsText: {
        type: 'text',
        style: 'infoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {x: 320, y: 150, wordWrapWidth: 200, fontSize: 30},
        portrait: {x: 460, y: 158, wordWrapWidth: 560, fontSize: 60},
    },


    /*
     * How To Play
     */
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1'],
    },
    howToPlayBackground: {
        type: 'sprite',
        landscape: {x: 720, y: 48, texture: 'landscape_tutorialBackground'},
        portrait: {x: 405, y: 100, texture: 'portrait_tutorialBackground'},
        anchor: {x: 0.5},
    },

    dropButton: {
        type: 'button',
        landscape: {x: 720, y: 700},
        portrait: {x: 405, y: 1070},
        string: 'button_drop',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled',
        },
    },

    howToPlayPage1: {
        type: 'text',
        string: 'page1',
        style: 'howToPlayText',
        fontSize: 30,
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {x: 720, y: 355, wordWrapWidth: 1100},
        portrait: {x: 405, y: 550, wordWrapWidth: 560},
    },

    howToPlayTitle: {
        type: 'text',
        string: 'howToPlay',
        style: 'howToPlayTitle',
        anchor: 0.5,
        y: 135,
        landscape: { x: 720 },
        portrait: { x: 405 },
    },

    winPlaqueMessage: {
        type: 'text',
        string: 'message_win',
        style: 'winPlaqueBody',
        y: -70,
        anchor: 0.5,
        portrait: { maxWidth: 700 },
        landscape: { maxWidth: 1200 },
    },
    winPlaqueValue: {
        type: 'text',
        style: 'winPlaqueValue',
        y: 70,
        anchor: 0.5,
    },

    losePlaqueMessage: {
        type: 'text',
        string: 'message_nonWin',
        style: 'losePlaqueBody',
        y: 0,
        anchor: 0.5,
        portrait: { maxWidth: 700 },
        landscape: { maxWidth: 1200 },
    },

    losePlaque: {
        landscape: {
            x:0,
            y:0
        },
        potrait: {
            x:0,
            y:0
        }
    },

});
