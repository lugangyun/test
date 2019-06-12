import ServerInfo from "./ServerInfo";
import GameBase from "./GameBase";
import GameNameMap from "./GameNameMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    gameStart(event: cc.Event.EventTouch, args: string) {
        let type = parseInt(args);
        let gameName = ServerInfo.getInstance().trainingNameEn;
        let sceneName = gameName + this.node.name
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
