const { ccclass, property } = cc._decorator;

var ClothData = cc.Class({
    name: "clothData",
    properties: {
        spriteFrame: cc.SpriteFrame,
        height: 1
    }
})

@ccclass
export default class ResourceDatas extends cc.Component {

    @property(ClothData)
    cloth: { spriteFrame: cc.SpriteFrame, height: number }[] = [];

    @property(ClothData)
    pants: { spriteFrame: cc.SpriteFrame, height: number }[] = [];

    @property(ClothData)
    skirt: { spriteFrame: cc.SpriteFrame, height: number }[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    // update (dt) {}
}
