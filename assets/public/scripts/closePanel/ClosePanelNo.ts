import GameTimer from "../GameTimer";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.node.on(cc.Node.EventType.MOUSE_ENTER, () => {
            this.node.scaleX = this.node.scaleY = 1.1;
        });
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, () => {
            this.node.scaleX = this.node.scaleY = 1;
        });
        this.node.on(cc.Node.EventType.MOUSE_DOWN, () => {
            this.node.scaleX = this.node.scaleY = 0.9;
        });
        this.node.on(cc.Node.EventType.MOUSE_UP, () => {
            this.node.scaleX = this.node.scaleY = 1;
            let scene = cc.director.getScene();
            let closePanelPrefab = scene.getChildByName("Canvas").getChildByName("closePanelPrefab");
            closePanelPrefab.active = true;
            let closePanel = closePanelPrefab.getChildByName("closePanel");
            var animation = closePanel.getComponent(cc.Animation);
            animation.play("panelCloseAnimation");
            animation.on(cc.Animation.EventType.FINISHED, () => {
                closePanelPrefab.active = false;
                GameTimer.start();
                animation.off(cc.Animation.EventType.FINISHED);
            });
        });
    }

    // update (dt) {}
}
