const { ccclass, property } = cc._decorator;

@ccclass
export default class ResourceButton extends cc.Component {

    normalSprite: cc.SpriteFrame;

    // onLoad () {}

    start() {
        this.normalSprite = this.node.getComponent(cc.Sprite).spriteFrame;
    }

    clickEventHandle() {
        this.node.parent.children.forEach((node) => {
            let nodeButton = node.getComponent(cc.Button);
            let nodeSprite = node.getComponent(cc.Sprite);
            let script = node.getComponent(ResourceButton);
            if (node != this.node) {
                nodeButton.normalSprite = script.normalSprite;
                nodeSprite.spriteFrame = script.normalSprite;
            }
            else {
                nodeButton.normalSprite = nodeButton.pressedSprite;
            }
        });
    }

    // update (dt) {}
}
