const { ccclass, property } = cc._decorator;

var FruitData = cc.Class({
    name: "FruitData",
    properties: {
        spriteFrame: cc.SpriteFrame,
        audioClip: { type: cc.AudioClip, default: null }
    }
})

@ccclass
export default class ResourceDatas extends cc.Component {

    @property(FruitData)
    fruits: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    @property(FruitData)
    pear: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    @property(FruitData)
    apple: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    @property(FruitData)
    grape: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    @property(FruitData)
    orange: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    @property(FruitData)
    watermelon: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    @property(FruitData)
    banana: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    @property(FruitData)
    error: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    // update (dt) {}
}
