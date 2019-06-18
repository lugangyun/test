const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingPanel extends cc.Component {

    @property(cc.SpriteFrame)
    buttonNormal: cc.SpriteFrame;

    @property(cc.SpriteFrame)
    buttonDown: cc.SpriteFrame;

    async show(setting: any): Promise<any> {
        this.node.getComponent(cc.Animation).play("panelPopupAnimation");
        let content = this.node.getChildByName("content");
        let lineNum = 0;
        for (let key in setting) {
            lineNum++;
            let labelNode = new cc.Node();
            labelNode.addComponent(cc.Label);
            labelNode.color = cc.color(0x10, 0x79, 0xa5);
            labelNode.anchorX = labelNode.anchorY = 0;
            let label = labelNode.getComponent(cc.Label);
            label.fontSize = 40;
            label.string = key;
            content.addChild(labelNode);
            let choices: string[] = setting[key];
            choices.forEach((choice, index) => {

            });
        }
        console.log(content);

    }

    private get x0() {
        return -this.node.width / 2;
    }

    private get y0() {
        return this.node.height / 2;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
