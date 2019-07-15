import ControlButtonType from "./ControlButtonType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ControlButton extends cc.Component {

    @property(cc.Node)
    playAll: cc.Node = null;

    @property(cc.Node)
    backToPlayStep: cc.Node = null;

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
        return [this.playAll, this.backToPlayStep, this.redo, this.last, this.next, 
            this.guide, this.replay];
    }

    async clickEventHandle(event: cc.Event.EventTouch, args: string) {
        let type = event.target.name;
        let buttonEvent = new cc.Event.EventCustom(type, true);
        this.node.dispatchEvent(buttonEvent);
    }

    public disableAll() {
        this.allNodes.forEach((node) => {
            if (node) {
                node.getComponent(cc.Button).interactable = false;
            }
        });
    }

    public enableAll() {
        this.allNodes.forEach((node) => {
            if (node) {
                node.getComponent(cc.Button).interactable = true;
            }
        });
    }

    public setButtonState(type: string, enable: boolean) {
        this[type].getComponent(cc.Button).interactable = enable;
    }

    public setNodeActive(type: string, active: boolean) {
        this[type].active = active;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        for (let buttonNode of this.allNodes) {
            if (buttonNode) {
                let eventHandler = new cc.Component.EventHandler();
                eventHandler.target = this.node;
                eventHandler.component = "ControlButton";
                eventHandler.handler = "clickEventHandle";
                eventHandler.customEventData = buttonNode.name;
                buttonNode.getComponent(cc.Button).clickEvents.push(eventHandler);
            }
        }
    }

    // update (dt) {}
}
