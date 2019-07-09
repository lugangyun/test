import CommonFruit from "./ClothCompareLength";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SwitchMode extends cc.Component {
    normalSprite: cc.SpriteFrame;

    onLoad() {
        this.normalSprite = this.node.getComponent(cc.Sprite).spriteFrame;
    }

    start() {

    }

    clickEventHandle(e: cc.Event, data) {
        var canvas = cc.director.getScene().getChildByName("Canvas");
        var contentChoose = canvas.getChildByName("contentChoose");
        var songGroup = contentChoose.getChildByName("songGroup");
        var lengthGroup = contentChoose.getChildByName("lengthGroup");
        var mainContent = canvas.getChildByName("mainContent");
        var lengthContent = canvas.getChildByName("lengthContent");
        this.node.parent.children.forEach((node) => {
            let nodeButton = node.getComponent(cc.Button);
            let nodeSprite = node.getComponent(cc.Sprite);
            let script = node.getComponent(SwitchMode);
            if (node != this.node) {
                nodeButton.normalSprite = script.normalSprite;
                nodeSprite.spriteFrame = script.normalSprite;
            }
            else {
                nodeButton.normalSprite = nodeButton.pressedSprite;
                //CommonFruit.getInstance().setLearningQuestion(node.name.replace("Btn", ""));
            }
        });
        if (data == 1) {
            var labelGroup = songGroup.getComponentsInChildren(cc.Label);
            mainContent.active = true;
            lengthContent.active = false;
            songGroup.active = true;
            lengthGroup.active = false;
            labelGroup.forEach((item, index) => {
                if (index == 0) {
                    item.node.color = new cc.Color(252, 178, 0, 255);
                }
            })
        } else {
            var labelGroup = lengthGroup.getComponentsInChildren(cc.Label);
            lengthContent.active = true;
            mainContent.active = false;
            songGroup.active = false;
            lengthGroup.active = true;
            labelGroup.forEach((item, index) => {
                if (index == 0) {
                    item.node.color = new cc.Color(252, 178, 0, 255);
                    item.node.getComponent(cc.Button).clickEvents[0].emit(["click"]);
                }
            })
        }
    }

    // update (dt) {}
}
