const { ccclass, property } = cc._decorator;

@ccclass
export default class SheepRight extends cc.Component {

    @property({ type: cc.AudioClip })
    rightAudio: cc.AudioClip = null;

    async showAsync() {
        return new Promise((resolve, reject) => {
            this.node.active = true;
            let animation = this.node.getChildByName("sheep").getComponent(cc.Animation);
            animation.play("sheepRight");
            let audioId = cc.audioEngine.play(this.rightAudio, false, 1);
            cc.audioEngine.setFinishCallback(audioId, () => {
                this.node.active = false;
                resolve()
            });
        });
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
