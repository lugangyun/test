import AudioHelper from "../../../public/scripts/AudioHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MakeJuice extends cc.Component {

    @property(cc.Node)
    fruitBox: cc.Node = null;

    @property(cc.Node)
    glassBox: cc.Node = null;

    @property(cc.Node)
    backButton: cc.Node = null;

    @property({ type: cc.AudioClip })
    chooseFruitAudio: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    chooseGlassAudio: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    doneAudio: cc.AudioClip = null;

    private currentFruit: string;
    private currentPlayerNode: cc.Node;

    private videoEndHandle: () => void;

    private getPlayerComponent(nodeName: string) {
        this.currentPlayerNode = this.node.getChildByName(nodeName);
        return this.currentPlayerNode.getComponent(cc.VideoPlayer);
    }

    async ready(event: cc.Event.EventTouch, args: string) {
        this.currentFruit = event.target.name;
        await this.showBox(BoxType.fruit, false);
        let playerComponent = this.getPlayerComponent(this.currentFruit);
        this.videoEndHandle = async () => {
            await this.showVideoPlayer(false);
            playerComponent.stop();
            this.showBox(BoxType.glass, true);
        };
        await this.showVideoPlayer(true);
        playerComponent.play();
    }

    async backButtonClickHandle() {
        this.glassRepeat = 0;
        this.backButton.active = false;
        await this.showVideoPlayer(false);
        this.showBox(BoxType.fruit, true);
    }

    private glassRepeat = 0;
    async showGlass(event: cc.Event.EventTouch, args: string) {
        let glassIndex = args;
        await this.showBox(BoxType.glass, false);
        let playerComponent = this.getPlayerComponent(this.currentFruit + "杯" + glassIndex);

        this.videoEndHandle = async () => {
            if (this.glassRepeat < 8) {
                this.glassRepeat++;
                playerComponent.currentTime = 0;
                playerComponent.play();
            }
            else {
                this.backButton.active = true;
            }
        }
        AudioHelper.playAsync(this.doneAudio);
        await this.showVideoPlayer(true);
        playerComponent.play();
    }

    async showVideoPlayer(show: boolean) {
        let animation = this.currentPlayerNode.getComponent(cc.Animation);
        animation.play(show ? "播放器弹出" : "播放器收起");
        return new Promise((resolve, reject) => {
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                resolve();
            });
        });
    }

    async videoComplete(target: cc.VideoPlayer, eventType: cc.VideoPlayer.EventType) {
        if (eventType == cc.VideoPlayer.EventType.COMPLETED) {
            this.videoEndHandle();
        }
    }

    private async showBox(boxType: BoxType, show: boolean) {
        let box: cc.Node;
        let tip: cc.AudioClip;
        switch (boxType) {
            case BoxType.fruit: box = this.fruitBox; tip = this.chooseFruitAudio; break;
            case BoxType.glass: box = this.glassBox; tip = this.chooseGlassAudio; break;
        }
        if (show) {
            box.active = true;
        }
        let animation = box.getComponent(cc.Animation);
        animation.play(show ? "水果选择框弹出" : "水果选择框收起");
        return new Promise((resolve, reject) => {
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                if (show) {
                    AudioHelper.playAsync(tip);
                }
                else {
                    box.active = false;
                }
                resolve();
            });
        });
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.node.children.forEach((node) => {
            node.active = true;
            node.scale = 0;
        });
        this.fruitBox.children.forEach((node) => {
            let button = node.getComponent(cc.Button);
            if (button) {
                let eventHandler = new cc.Component.EventHandler();
                eventHandler.target = this.node;
                eventHandler.component = "MakeJuice";
                eventHandler.handler = "ready";
                eventHandler.customEventData = node.name;
                button.clickEvents.push(eventHandler);
            }
        });
        this.glassBox.children.forEach((node, index) => {
            let button = node.getComponent(cc.Button);
            if (button) {
                let eventHandler = new cc.Component.EventHandler();
                eventHandler.target = this.node;
                eventHandler.component = "MakeJuice";
                eventHandler.handler = "showGlass";
                eventHandler.customEventData = index.toString();
                button.clickEvents.push(eventHandler);
            }
        });
        this.showBox(BoxType.fruit, true);
        this.backButton.active = false;
    }

    // update(dt) {}
}

enum BoxType {
    fruit,
    glass
}