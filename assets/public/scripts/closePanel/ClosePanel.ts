import GameTimer from "../GameTimer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // onLoad () {}

    start() { }

    show() {
        this.node.active = true;
        let closePanel = this.node.getChildByName("closePanel");
        var animation = closePanel.getComponent(cc.Animation);
        animation.play("panelPopupAnimation");
        GameTimer.stop();
    }

    // update (dt) {}
}
