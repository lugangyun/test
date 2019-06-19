import ServerInfo from "./ServerInfo";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    async init() {
        let info = ServerInfo.getInstance();
        await info.getSetting();
        await info.getTrainingInfo();
        cc.director.loadScene(info.trainingName + "-主页");
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("onload");
        this.init();
    }

    start() {

    }

    // update (dt) {}
}
