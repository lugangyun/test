const { ccclass, property } = cc._decorator;

@ccclass
export default class MakeJuice extends cc.Component {

    @property(cc.Node)
    videoPlayer: cc.Node = null;

    @property(cc.Node)
    fruitBox: cc.Node = null;

    @property(cc.Node)
    glassBox: cc.Node = null;

    private currentData: { name: string, time: number[] };

    private videoEndTime: number;
    private videoEndHandle: () => void;

    async ready(event: cc.Event.EventTouch, args: string) {
        let fruit = event.target.name;
        await this.showBox(BoxType.fruit, false);
        let playerComponent = this.videoPlayer.getComponent(cc.VideoPlayer);
        let data = this.videoDatas.find(x => x.name == fruit);
        this.currentData = data;
        playerComponent.currentTime = data.time[0];
        this.videoEndTime = data.time[1];
        this.videoEndHandle = async () => {
            playerComponent.pause();
            await this.showVideoPlayer(false);
            this.showBox(BoxType.glass, true);
        };
        await this.showVideoPlayer(true);
        playerComponent.play();
    }

    async showGlass(event: cc.Event.EventTouch, args: string) {
        let glassIndex = +args;
        await this.showBox(BoxType.glass, false);
        let playerComponent = this.videoPlayer.getComponent(cc.VideoPlayer);
        playerComponent.currentTime = this.currentData.time[glassIndex];
        this.videoEndTime = this.currentData.time[glassIndex + 1];
        this.videoEndHandle = async () => {
            playerComponent.pause();
            await this.showVideoPlayer(false);
            this.showBox(BoxType.fruit, true);
        }
        await this.showVideoPlayer(true);
        playerComponent.play();
    }

    async showVideoPlayer(show: boolean) {
        let animation = this.videoPlayer.getComponent(cc.Animation);
        animation.play(show ? "播放器弹出" : "播放器收起");
        return new Promise((resolve, reject) => {
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                resolve();
            });
        });
    }

    async videoComplete(target: cc.VideoPlayer, eventType: cc.VideoPlayer.EventType) {
        // if (eventType == cc.VideoPlayer.EventType.STOPPED) {
        //     this.videoPlayer.active = false;
        //     await this.showFruitBox(true);
        // }
    }

    private async showBox(boxType: BoxType, show: boolean) {
        let box: cc.Node;
        switch (boxType) {
            case BoxType.fruit: box = this.fruitBox; break;
            case BoxType.glass: box = this.glassBox; break;
        }
        if (show) {
            box.active = true;
        }
        let animation = box.getComponent(cc.Animation);
        animation.play(show ? "水果选择框弹出" : "水果选择框收起");
        return new Promise((resolve, reject) => {
            animation.on(cc.Animation.EventType.FINISHED, () => {
                animation.off(cc.Animation.EventType.FINISHED);
                if (!show) {
                    box.active = false;
                }
                resolve();
            });
        });
    }

    private videoDatas = [
        {
            name: "西瓜",
            time: [0, 8.8, 9.2, 9.6, 10]
        },
        {
            name: "香蕉",
            time: [11, 20, 20.4, 20.8, 21.2]
        },
        {
            name: "苹果",
            time: [21.2, 30.4, 30.8, 31.2, 31.6]
        },
        {
            name: "梨",
            time: [31.6, 41.8, 42.2, 42.6, 43]
        },
        {
            name: "橘子",
            time: [43, 52, 52.4, 52.8, 53.2]
        },
        {
            name: "葡萄",
            time: [53.2, 62.8, 63.2, 63.6]
        }
    ]

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.videoPlayer.active = true;
        this.videoPlayer.scale = 0;
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
    }

    update(dt) {
        if (this.videoPlayer.active) {
            let video = this.videoPlayer.getComponent(cc.VideoPlayer);
            if (video.isPlaying() && video.currentTime >= this.videoEndTime) {
                this.videoEndHandle();
            }
        }
    }
}

enum BoxType {
    fruit,
    glass
}