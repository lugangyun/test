import ControlButtonType from "./ControlButtonType";

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

    get allNodes() {
        return [this.redo, this.last, this.next, this.guide, this.replay];
    }

    async clickEventHandle(event: cc.Event.EventTouch, args: string) {
        let type = event.target.name;
        let buttonEvent = new cc.Event.EventCustom(type, true);
        this.node.dispatchEvent(buttonEvent);
    }

    public disableAll() {
        this.allNodes.forEach((node) => {
            node.getComponent(cc.Button).interactable = false;
        });
    }

    public enableAll() {
        this.allNodes.forEach((node) => {
            node.getComponent(cc.Button).interactable = true;
        });
    }

    public setButtonState(type: string, enable: boolean) {
        switch (type) {
            case ControlButtonType.redo:
                this.redo.getComponent(cc.Button).interactable = enable;
                break;
            case ControlButtonType.next:
                this.next.getComponent(cc.Button).interactable = enable;
                break;
            case ControlButtonType.last:
                this.last.getComponent(cc.Button).interactable = enable;
                break;
            case ControlButtonType.guide:
                this.guide.getComponent(cc.Button).interactable = enable;
                break;
            case ControlButtonType.replay:
                this.replay.getComponent(cc.Button).interactable = enable;
                break;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start() { }

    // update (dt) {}
}
