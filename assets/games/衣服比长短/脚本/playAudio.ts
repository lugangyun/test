import ClothCompareLength from "./ClothCompareLength";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayAudio extends cc.Component {

    // @property(cc.AudioClip)
    // audioName: cc.AudioClip = null;
    onLoad() {
    }

    start() {

    }

    clickEventHandle(e: cc.Event) {
        //cc.audioEngine.play(this.audioName, false, 1);
    }

    // update (dt) {}
}
