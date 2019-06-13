import GameTimer from "../GameTimer";
import ServerInfo from "../ServerInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ClosePanel extends cc.Component {

    // onLoad () {}

    start() { }

    show() {
        this.node.active = true;
        let panel = this.node.getChildByName("panel");
        var animation = panel.getComponent(cc.Animation);
        animation.play("panelPopupAnimation");
        GameTimer.stop();
    }

    noButtonClick() {
        let panel = this.node.getChildByName("panel");
        let animation = panel.getComponent(cc.Animation);
        animation.play("panelCloseAnimation");
        animation.on(cc.Animation.EventType.FINISHED, () => {
            this.node.active = false;
            GameTimer.start();
            animation.off(cc.Animation.EventType.FINISHED);
        });
    }

    yesButtonClick() {
        cc.director.loadScene(ServerInfo.getInstance().trainingNameEn + "Index");
    }

    // update (dt) {}
}
