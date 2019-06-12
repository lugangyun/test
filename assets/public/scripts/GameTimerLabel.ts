import GameTimer from "./GameTimer";
import { Tools } from "./Tools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let label = this.node.getComponent(cc.Label);
        label.string = "00:00";
        this.schedule(() => {
            if (GameTimer.isRunning) {
                GameTimer.timeIndex++;
                let min = Tools.padLeadingZeros(Math.floor(GameTimer.timeIndex / 60), 2);
                let sec = Tools.padLeadingZeros(Math.floor(GameTimer.timeIndex % 60), 2);
                label.string = min + ":" + sec;
            }
        }, 1, cc.macro.REPEAT_FOREVER, 0);
    }

    // update (dt) {}
}
