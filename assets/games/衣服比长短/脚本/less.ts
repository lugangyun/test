import ClothCompareLength from "./ClothCompareLength";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Less extends cc.Component {
    onLoad() {
    }

    start() {

    }

    clickEventHandle(e: cc.Event, data) {
        ClothCompareLength.getInstance().switchPicture(data);
    }

    // update (dt) {}
}
