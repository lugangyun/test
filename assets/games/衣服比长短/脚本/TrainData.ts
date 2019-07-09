const { ccclass, property } = cc._decorator;

var PracticeData = cc.Class({
    name: "PracticeData",
    properties: {
        spriteFrame: cc.SpriteFrame,
        audioClip: { type: cc.AudioClip, default: null },
        way: cc.String
    }
})

@ccclass
export default class TrainData extends cc.Component {

    @property(PracticeData)
    longColth: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip, way: string }[] = [];

    @property(PracticeData)
    shortColth: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip, way: string }[] = [];

    @property(PracticeData)
    longBoot: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip, way: string }[] = [];

    @property(PracticeData)
    shortBoot: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip, way: string }[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    // update (dt) {}
}
