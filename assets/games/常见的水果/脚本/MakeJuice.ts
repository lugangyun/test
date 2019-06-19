const { ccclass, property } = cc._decorator;

@ccclass
export default class MakeJuice extends cc.Component {

    init() {
        this.node.children.forEach(node => node.active = false);
    }

    async ready(event: cc.Event.EventTouch, fruit: string) {
        this.choppingBoard.active = true;
        await this.showChoppingBoard();
        this.node.getChildByName(fruit).active = true;
        return new Promise((resolve, reject) => {
            let animation = this.node.getComponent(cc.Animation);
            animation.play(fruit + "Ready");
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                resolve();
            });
        });
    }

    async make(event: cc.Event.EventTouch, fruit: string) {
        return new Promise((resolve, reject) => {
            let animation = this.node.getComponent(cc.Animation);
            animation.play(fruit + "Make");
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                resolve();
            });
        });
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
