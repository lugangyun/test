import ClosePanel from "./ClosePanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    showClosePanel() {
        let closePanel = cc.director.getScene().getChildByName("Canvas")
            .getChildByName("closePanel").getComponent(ClosePanel);
        closePanel.show();
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
