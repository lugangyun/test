
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteFrame)
    pearSprite: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    appleSprite: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    grapeSprite: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    orangeSprite: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    watermelonSprite: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    bananaSprite: cc.SpriteFrame[] = [];

    @property(cc.AudioClip)
    pearAudio: cc.AudioClip[] = [];

    @property(cc.AudioClip)
    appleAudio: cc.AudioClip[] = [];

    @property(cc.AudioClip)
    grapeAudio: cc.AudioClip[] = [];

    @property(cc.AudioClip)
    orangeAudio: cc.AudioClip[] = [];

    @property(cc.AudioClip)
    watermelonAudio: cc.AudioClip[] = [];

    @property(cc.AudioClip)
    bananaAudio: cc.AudioClip[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
