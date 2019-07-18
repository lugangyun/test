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
                this.updateLabelColor(node);
            }
        });
    }

    public enableAll() {
        this.allNodes.forEach((node) => {
            if (node) {
                node.getComponent(cc.Button).interactable = true;
                this.updateLabelColor(node);
            }
        });
    }

    public setButtonState(type: string, enable: boolean) {
        this[type].getComponent(cc.Button).interactable = enable;
        this.updateLabelColor(this[type]);
    }

    public setNodeActive(type: string, active: boolean) {
        this[type].active = active;
    }

    private updateLabelColor(buttonNode: cc.Node) {
        let buttonComponent = buttonNode.getComponent(cc.Button);
        let labelNode = buttonNode.getChildByName("Background").getChildByName("Label");
        if (!buttonComponent.interactable) {
            labelNode.color = this.labelColor.disable;
        }
        else if (this.currentButton != buttonNode) {
            labelNode.color = this.labelColor.normal;
        }
        else {
            if (this.buttonState.down && this.buttonState.enter) {
                labelNode.color = this.labelColor.down;
            }
            else if (this.buttonState.enter) {
                labelNode.color = this.labelColor.enter;
            }
            else {
                labelNode.color = this.labelColor.normal;
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    buttonState = {
        enter: false,
        down: false
    }

    currentButton: cc.Node;

    labelColor = {
        normal: cc.color(0x19, 0xae, 0x9b),
        enter: cc.color(0xff, 0xa6, 0x33),
        down: cc.color(0x23, 0x54, 0x18),
        disable: cc.color(0x63, 0x63, 0x63)
    }

    start() {
        for (let buttonNode of this.allNodes) {
            if (buttonNode) {
                let eventHandler = new cc.Component.EventHandler();
                eventHandler.target = this.node;
                eventHandler.component = "ControlButton";
                eventHandler.handler = "clickEventHandle";
                eventHandler.customEventData = buttonNode.name;
                let buttonComponent = buttonNode.getComponent(cc.Button);
                buttonComponent.clickEvents.push(eventHandler);

                let labelNode = buttonNode.getChildByName("Background").getChildByName("Label");
                buttonNode.on(cc.Node.EventType.MOUSE_ENTER, (event: cc.Event) => {
                    this.buttonState.enter = true;
                    this.currentButton = event.target;
                    this.updateLabelColor(buttonNode);
                });
                buttonNode.on(cc.Node.EventType.MOUSE_LEAVE, (event: cc.Event) => {
                    this.buttonState.enter = false;
                    this.currentButton = event.target;
                    this.updateLabelColor(buttonNode);
                });
                buttonNode.on(cc.Node.EventType.TOUCH_START, (event: cc.Event) => {
                    this.buttonState.down = true;
                    this.currentButton = event.target;
                    this.updateLabelColor(buttonNode);
                });
                buttonNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
                    this.buttonState.down = false;
                    this.currentButton = event.target;
                    this.updateLabelColor(buttonNode);
                });
                buttonNode.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event) => {
                    this.buttonState.down = false;
                    this.currentButton = event.target;
                    this.updateLabelColor(buttonNode);
                });
            }
        }
    }

    // update (dt) {}
}
