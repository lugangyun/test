const { ccclass, property } = cc._decorator;

@ccclass
export default class MakeJuice extends cc.Component {

    async make(event: cc.Event.EventTouch, fruit: string) {
        console.log(fruit);
        await this.showChoppingBoard();
    }

    private get choppingBoard() {
        return this.node.getChildByName("choppingBoard");
    }

    private async showChoppingBoard() {
        return new Promise((resolve, reject) => {
            let animation = this.choppingBoard.getComponent(cc.Animation);
            animation.play("choopingBoardAppear");
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                resolve();
            });
        });
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
