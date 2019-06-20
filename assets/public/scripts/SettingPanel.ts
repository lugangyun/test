const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingPanel extends cc.Component {

    @property(cc.SpriteFrame)
    buttonNormal: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    buttonDown: cc.SpriteFrame = null;

    private textNormalColor = cc.color(0, 177, 78);
    private textDownColor = cc.color(255, 255, 255);

    private resolve: (value: any) => void;
    private settingResult: any = {};

    async show(setting: any): Promise<any> {
        this.node.active = true;
        let content = this.node.getChildByName("content");
        let contentDist = 40;
        let contentLineDist = 80;
        let buttonOffsetX = 0, buttonOffsetY = 0;
        let labelY = this.contentY0 - contentDist;
        for (let key in setting) {
            let labelNode = new cc.Node();
            labelNode.name = key;
            labelNode.addComponent(cc.Label);
            labelNode.color = cc.color(0x10, 0x79, 0xa5);
            labelNode.anchorX = 0;
            let label = labelNode.getComponent(cc.Label);
            label.fontSize = 40;
            label.string = key + "：";
            labelNode.x = this.contentX0;
            labelNode.y = labelY;
            content.addChild(labelNode);

            let choices: string[] = setting[key];
            let initX = labelNode.width;
            buttonOffsetX = initX;
            buttonOffsetY = 0;
            choices.forEach((choice, index) => {
                let buttonNode = new cc.Node();
                buttonNode.name = choice;
                let sprite = buttonNode.addComponent(cc.Sprite);
                sprite.type = cc.Sprite.Type.SLICED;
                sprite.spriteFrame = this.buttonNormal;
                buttonNode.addComponent(cc.Button);
                let button = buttonNode.getComponent(cc.Button);
                button.normalSprite = this.buttonNormal;
                button.pressedSprite = this.buttonDown;
                button.transition = cc.Button.Transition.SCALE;
                button.duration = 0.1;
                button.zoomScale = 0.8;

                let buttonLabelNode = new cc.Node();
                buttonLabelNode.name = choice;
                buttonLabelNode.color = this.textNormalColor;
                let buttonLabel = buttonLabelNode.addComponent(cc.Label);
                buttonLabel.string = choice;
                buttonLabel.fontSize = 30;

                buttonNode.width = Math.max(choice.length * buttonLabel.fontSize + 20, 100);
                if (buttonOffsetX + buttonNode.width + contentDist > content.width) {
                    buttonOffsetX = initX;
                    buttonOffsetY += contentLineDist;
                }
                buttonNode.y = -buttonOffsetY;
                buttonNode.x = buttonOffsetX + buttonNode.width / 2;
                buttonOffsetX = buttonNode.x + buttonNode.width / 2 + contentDist;

                buttonNode.addChild(buttonLabelNode);
                labelNode.addChild(buttonNode);

                let clickEvent = new cc.Component.EventHandler();
                clickEvent.target = this.node;
                clickEvent.component = "SettingPanel";
                clickEvent.handler = "settingButtonClick";
                button.clickEvents.push(clickEvent);
            });
            labelY -= contentLineDist + buttonOffsetY;
        }
        this.node.getComponent(cc.Animation).play("panelPopupAnimation");
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
        });
    }

    settingButtonClick(event: cc.Event.EventTouch, args: string) {
        let settingNode = <cc.Node>event.currentTarget;
        settingNode.parent.children.forEach((node) => {
            let nodeSprite = node.getComponent(cc.Sprite);
            let labelNode = node.getChildByName(node.name);
            let initWidth = node.width;
            if (node != settingNode) {
                nodeSprite.spriteFrame = this.buttonNormal;
                labelNode.color = this.textNormalColor;
            }
            else {
                nodeSprite.spriteFrame = this.buttonDown;
                labelNode.color = this.textDownColor;
                this.settingResult[settingNode.parent.name] = settingNode.name;
            }
            node.width = initWidth;
        });
    }

    okButtonClick(event: cc.Event.EventTouch, args: string) {
        let animation = this.node.getComponent(cc.Animation);
        animation.play("panelCloseAnimation");
        animation.on(cc.Animation.EventType.FINISHED, () => {
            animation.off(cc.Animation.EventType.FINISHED);
            this.node.active = false;
            this.resolve(this.settingResult);
        });
    }

    private get contentX0() {
        return -this.node.getChildByName("content").width / 2;
    }

    private get contentY0() {
        return this.node.getChildByName("content").height / 2;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
