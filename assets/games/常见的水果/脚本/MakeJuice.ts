const { ccclass, property } = cc._decorator;

@ccclass
export default class MakeJuice extends cc.Component {

    init() {
        this.node.children.forEach(node => node.active = false);
    }

    async ready(event: cc.Event.EventTouch, args: string) {
        let fruit = (<cc.Node>event.currentTarget).name;
        this.choppingBoard.active = true;
        await this.showChoppingBoard();
        this.node.getChildByName(fruit).active = true;
        return new Promise((resolve, reject) => {
            let animation = this.node.getComponent(cc.Animation);
            animation.play("准备" + fruit);
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                resolve();
            });
        });
    }

    async make(event: cc.Event.EventTouch, args: string) {
        let fruit = args;
        return new Promise((resolve, reject) => {
            let animation = this.node.getComponent(cc.Animation);
            animation.play(`制作${fruit}汁`);
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                resolve();
            });
        });
    }

    private get choppingBoard() {
        return this.node.getChildByName("砧板");
    }

    private async showChoppingBoard() {
        return new Promise((resolve, reject) => {
            let animation = this.choppingBoard.getComponent(cc.Animation);
            animation.play("砧板出现");
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
