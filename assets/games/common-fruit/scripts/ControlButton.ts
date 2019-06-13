import ResourceDatas from "./ResourceDatas";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ControlButton extends cc.Component {

    data: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[]

    set fruitName(value: string) {
        this.data = cc.director.getScene().getComponent(ResourceDatas)[value];
        console.log(this.data);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
