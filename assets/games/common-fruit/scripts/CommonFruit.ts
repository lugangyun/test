import GameBase from "../../../public/scripts/GameBase";
import ResourceDatas from "./ResourceDatas";

export default class CommonFruit extends GameBase {

    private static _instance: CommonFruit;

    public static getInstance(): CommonFruit {
        if (!this._instance) {
            this._instance = new CommonFruit();
        }
        return this._instance;
    }

    learningQuestions: { spriteFrame: cc.SpriteFrame, audioClip: cc.AudioClip }[] = [];
    get learningQuestion() {
        return this.learningQuestions[this.questionIndex];
    }

    setLearningQuestion(fruit: string) {
        let datas = cc.director.getScene().getChildByName("ResourceDatas")
            .getComponent(ResourceDatas);
        this.learningQuestions = datas[fruit];
        this.questionIndex = 0;
        this.questionLength = this.learningQuestions.length;
        this.updateCounter();
        this.refresh();
    }

    start(): void {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        if (this.type == CommonFruitType.learning) {
            let button = canvas.getChildByName("resourceButtons").children[0].getComponent(cc.Button);
            button.clickEvents[0].emit(undefined);
        }
    }

    refresh(): void {
        let scene = cc.director.getScene();
        if (this.type == CommonFruitType.learning) {
            let box = scene.getChildByName("Canvas").getChildByName("learningPictureBox");
            let controlButtons = scene.getChildByName("Canvas").getChildByName("controlButtons");
            let nextButton = controlButtons.getChildByName("rightBtn").getComponent(cc.Button);
            let preButton = controlButtons.getChildByName("leftBtn").getComponent(cc.Button);
            let sprite = box.getChildByName("learningPicture").getComponent(cc.Sprite);
            let label = box.getChildByName("label").getComponent(cc.Label);
            let firstSpirt =  box.getChildByName("firstPicture").getComponent(cc.Sprite);
            if(this.questionIndex === this.questionLength -1) {
                nextButton.interactable = false;
            }else {
                nextButton.interactable = true;
            }
            if (!this.questionIndex) {
                preButton.interactable = false;
                sprite.node.active = false;
                label.node.active = false;
                firstSpirt.node.active = true;
                firstSpirt.spriteFrame = this.learningQuestion.spriteFrame;
            } else {
                preButton.interactable = true;
                sprite.node.active = true;
                label.node.active = true;
                firstSpirt.node.active = false;
                sprite.spriteFrame = this.learningQuestion.spriteFrame;
                label.string = this.learningQuestion.spriteFrame.name;
            }
            let audioId = cc.audioEngine.play(this.learningQuestion.audioClip, false, 1);
        }
    }

}

enum CommonFruitType {
    learning,
    choose,
    playing
}