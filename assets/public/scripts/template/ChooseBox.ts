import ServerInfo from "../ServerInfo";
import CustomAnimation from "../CustomAnimation";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChooseBox extends cc.Component {

    @property({ type: cc.AudioClip })
    rightAudio: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    wrongAudio: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    clickCallback: (selectIndex: number) => any;
    thisObject: any;

    init(clickCallback: (selectIndex: number) => any, thisObject: any) {
        this.draw(0x37b6d6);
        let checkMark = this.node.getChildByName("checkMark");
        checkMark.scale = 0;
        this.clickCallback = clickCallback;
        this.thisObject = thisObject;
    }

    setImage(spriteFrame: cc.SpriteFrame) {
        let sprite = this.node.getChildByName("image").getComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
    }

    async right() {
        return new Promise((resolve, reject) => {
            this.draw(0x00e600);
            let animation = this.node.getChildByName("checkMark").getComponent(cc.Animation);
            animation.play("checkMark");
            let audioId = cc.audioEngine.play(this.rightAudio, false, 1);
            cc.audioEngine.setFinishCallback(audioId, resolve);
        })
    }

    async wrong() {
        return new Promise((resolve, reject) => {
            this.draw(0xff0000);
            CustomAnimation.shake(this.node);
            let audioId = cc.audioEngine.play(this.wrongAudio, false, 1);
            cc.audioEngine.setFinishCallback(audioId, resolve);
        });
    }

    disable() {
        this.draw(0x959595);
    }

    draw(color: number) {
        let graphics = this.node.getComponent(cc.Graphics);
        graphics.strokeColor = cc.color(color >> 16, (color & 0x00FF00) >> 8, color & 0x0000FF, 255);
        graphics.roundRect(-this.node.width / 2, -this.node.height / 2, this.node.width, this.node.height, 10);
        graphics.fill();
        graphics.stroke();
    }

    clickEventHandle() {
        this.clickCallback.call(this.thisObject, this.node.getSiblingIndex());
    }
}