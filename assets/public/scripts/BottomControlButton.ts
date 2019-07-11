import GameNameMap from "./GameNameMap";
import ServerInfo from "./ServerInfo";
import GameBase from "./GameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomControlButton extends cc.Component {

    @property(cc.Node)
    redo: cc.Node = null;

    @property(cc.Node)
    last: cc.Node = null;

    @property(cc.Node)
    next: cc.Node = null;

    @property(cc.Node)
    guide: cc.Node = null;

    @property(cc.Node)
    replay: cc.Node = null;

    async clickEventHandle(event: cc.Event.EventTouch, args: string) {
        let gameName = ServerInfo.getInstance().trainingName;
        let gameClass = GameNameMap.map[gameName];
        let game: GameBase = gameClass.getInstance();
        let type = event.target.name;
        switch (type) {
            case "redo": game.refresh(); break;
            case "next": game.nextQuestion(); break;
            case "last": game.lastQuestion(); break;
            case "guide": game.guideSwitch(); break;
            case "replay":
                this.replay.getComponent(cc.Button).interactable = false;
                await game.guideReplay();
                this.replay.getComponent(cc.Button).interactable = true;
                break;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start() { }

    // update (dt) {}
}
