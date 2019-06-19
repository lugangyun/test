const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingPanel extends cc.Component {

    @property(cc.SpriteFrame)
    buttonNormal: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    buttonDown: cc.SpriteFrame = null;

    async show(setting: any): Promise<any> {
        console.log(this.buttonNormal)
        this.node.getComponent(cc.Animation).play("panelPopupAnimation");
        let content = this.node.getChildByName("content");
        let lineHeight = content.height / Object.getOwnPropertyNames(setting).length;
        let contentDist = 40;
        let contentLineDist = 80;
        let offsetX = 0, offsetY = this.contentY0 - contentDist;
        for (let key in setting) {
            let labelNode = new cc.Node();
            labelNode.addComponent(cc.Label);
            labelNode.color = cc.color(0x10, 0x79, 0xa5);
            labelNode.anchorX = 0;
            let label = labelNode.getComponent(cc.Label);
            label.fontSize = 40;
            label.string = key + "：";
            labelNode.x = this.contentX0;
            labelNode.y = offsetY;
            content.addChild(labelNode);

            let choices: string[] = setting[key];
            let initX = labelNode.x + labelNode.width;
            offsetX = initX;
            choices.forEach((choice, index) => {
                let buttonNode = new cc.Node();
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
                buttonLabelNode.color = cc.color(0, 177, 78);
                let buttonLabel = buttonLabelNode.addComponent(cc.Label);
                buttonLabel.string = choice;
                buttonLabel.fontSize = 30;

                buttonNode.width = Math.max(choice.length * buttonLabel.fontSize + 20, 100);
                if (offsetX + buttonNode.width + contentDist > content.width / 2) {
                    offsetX = initX;
                    offsetY -= contentLineDist;
                }
                buttonNode.y = offsetY;
                buttonNode.x = offsetX + buttonNode.width / 2;
                offsetX = buttonNode.x + buttonNode.width / 2 + contentDist;

                buttonNode.addChild(buttonLabelNode);
                content.addChild(buttonNode);
            });
            offsetY -= contentLineDist;
        }
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
