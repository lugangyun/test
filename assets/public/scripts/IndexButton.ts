import ServerInfo from "./ServerInfo";
import GameBase from "./GameBase";
import GameNameMap from "./GameNameMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    gameStart(event: cc.Event.EventTouch, args: string) {
        let gameName = ServerInfo.getInstance().trainingName;
        let sceneName = `${gameName}-${this.node.name}`;
        let type = this.node.getSiblingIndex(); // 切换场景会销毁场景内对象，先保存一次

        let labelNode = new cc.Node();
        let label = labelNode.addComponent(cc.RichText);
        label.string = "<outline color=red width=4>加载中...</outline>";
        label.fontSize = 50;
        label.lineHeight = 100;
        cc.director.getScene().getChildByName("Canvas").addChild(labelNode);

        cc.director.loadScene(sceneName, () => {
            let game: GameBase = GameNameMap.map[gameName].getInstance();
            game.initial(type);
        });
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() { }

    start() {

    }

    // update (dt) {}
}
