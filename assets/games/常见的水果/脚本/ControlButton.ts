import ResourceDatas from "./ResourceDatas";
import CommonFruit from "./CommonFruit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ControlButton extends cc.Component {

    clickEventHandle(event: cc.Event.EventTouch, type: string) {
        let game = CommonFruit.getInstance();
        switch (type) {
            case "play": break;
            case "replay": game.refresh(); break;
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

