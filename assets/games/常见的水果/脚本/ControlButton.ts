import ResourceDatas from "./ResourceDatas";
import CommonFruit from "./CommonFruit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ControlButton extends cc.Component {

    @property(cc.Node)
    replayBtn: cc.Node = null;

    @property(cc.Node)
    leftBtn: cc.Node = null;

    @property(cc.Node)
    rightBtn: cc.Node = null;

    async clickEventHandle(event: cc.Event.EventTouch, type: string) {
        let game = CommonFruit.getInstance();
        switch (type) {
            case "play": break;
            case "replay":
                this.replayBtn.getComponent(cc.Button).interactable = false;
                await game.guideReplay();
                this.replayBtn.getComponent(cc.Button).interactable = true;
                break;
            case "next": game.nextQuestion(); break;
            case "last": game.lastQuestion(); break;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}

