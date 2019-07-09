import ClothCompareLength from "./ClothCompareLength";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChangeQuestion extends cc.Component {



    onLoad() {
    }

    start() {

    }
    clickEventHandle(e: cc.Event, data) {
        this.node.parent.children.forEach((node, index) => {
            if (this.node == node) {
                this.node.color = new cc.Color(252, 178, 0, 255);
                if(data == 1) {
                    console.log(666);
                }else {
                    ClothCompareLength.getInstance().setLearningLength(node.name.replace("Label", ""));
                }
            } else {
                node.color = new cc.Color(16, 121, 165, 255);
            }
        })
    }

    // update (dt) {}
}
