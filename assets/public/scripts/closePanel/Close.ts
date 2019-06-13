import GameTimer from "../GameTimer";
import ServerInfo from "../ServerInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // onLoad () {}

    start() { }

    show() {
        let popup = this.node.getChildByName("popup");
        popup.active = true;
        let panel = popup.getChildByName("panel");
        var animation = panel.getComponent(cc.Animation);
        animation.play("panelPopupAnimation");
        GameTimer.stop();
    }

    noButtonClick() {
        let popup = this.node.getChildByName("popup");
        popup.active = true;
        let panel = popup.getChildByName("panel");
        let animation = panel.getComponent(cc.Animation);
        animation.play("panelCloseAnimation");
        animation.on(cc.Animation.EventType.FINISHED, () => {
            popup.active = false;
            GameTimer.start();
            animation.off(cc.Animation.EventType.FINISHED);
        });
    }

    yesButtonClick() {
        cc.director.loadScene(ServerInfo.getInstance().trainingNameEn + "Index");
    }

    // update (dt) {}
}
