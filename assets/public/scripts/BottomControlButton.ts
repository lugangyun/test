import GameNameMap from "./GameNameMap";
import ServerInfo from "./ServerInfo";
import GameBase from "./GameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomControlButton extends cc.Component {

    clickEventHandle(event: cc.Event.EventTouch, args: string) {
        let gameName = ServerInfo.getInstance().trainingName;
        let gameClass = GameNameMap.map[gameName];
        let game: GameBase = gameClass.getInstance();
        let type = event.target.name;
        switch (type) {
            case "redo": game.refresh(); break;
            case "next": game.nextQuestion(); break;
            case "last": game.lastQuestion(); break;
            case "guide": game.guideSwitch(); break;
            case "replay": game.guideReplay(); break;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        console.log(ServerInfo.getInstance());
    }

    // update (dt) {}
}
