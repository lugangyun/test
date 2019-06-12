
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
