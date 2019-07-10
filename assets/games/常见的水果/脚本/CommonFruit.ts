import GameBase from "../../../public/scripts/GameBase";
import ResourceDatas from "./ResourceDatas";
import { Tools } from "../../../public/scripts/Tools";
import ChooseBox from "../../../public/scripts/template/ChooseBox";
import SheepRight from "../../../public/scripts/SheepRight";
import MakeJuice from "./MakeJuice";

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

    chooseQuestions: { text: string, sprites: cc.SpriteFrame[], answerIndex: number }[] = [];
    get chooseQuestion() {
        return this.chooseQuestions[this.questionIndex];
    }

    get datas() {
        return cc.director.getScene().getChildByName("ResourceDatas").getComponent(ResourceDatas);
    }

    setLearningQuestion(fruit: string) {
        this.learningQuestions = this.datas[fruit];
        this.questionIndex = 0;
        this.questionLength = this.learningQuestions.length;
        this.updateCounter();
        this.refresh();
    }

    createChooseFruitQuestions() {
        this.chooseQuestions = [];
        let questionsSource = this.datas.fruits.concat(this.datas.fruits);
        questionsSource = Tools.disorder(questionsSource);
        for (let data of questionsSource) {
            let targetIndex = this.datas.fruits.indexOf(data);
            let interferenceIndex = Tools.getRandomNum(0, this.datas.fruits.length - 1, [targetIndex]);
            let interferenceData = this.datas.fruits[interferenceIndex];
            let questionSprites = [data.spriteFrame, interferenceData.spriteFrame];
            questionSprites = Tools.disorder(questionSprites);
            this.chooseQuestions.push({
                text: "请找出" + data.spriteFrame.name,
                sprites: questionSprites,
                answerIndex: questionSprites.findIndex(x => x == data.spriteFrame)
            });
        }
        this.questionLength = this.chooseQuestions.length;
    }

    createChooseActionQuestions() {
        this.chooseQuestions = [];
        let questionsSource = [
            { name: "apple", right: "用水将苹果洗干净", wrong: "不洗直接吃苹果" },
            { name: "banana", right: "用手拿住香蕉蒂，将香蕉放入口中", wrong: "不剥皮吃香蕉" },
            { name: "pear", right: "用小刀将梨削皮", wrong: "不洗直接吃梨" },
            { name: "orange", right: "将橘子剥皮", wrong: "不剥皮直接吃橘子" },
            { name: "grape", right: "摘下一颗，剥皮放入口中", wrong: "不冲洗直接吃葡萄" },
            { name: "watermelon", right: "双手捧起西瓜，咬一口", wrong: "不切开直接吃" },
        ]
        for (let data of questionsSource) {
            let right = this.datas[data.name].find(x => x.spriteFrame.name == data.right).spriteFrame;
            let wrong = this.datas.error.find(x => x.spriteFrame.name == data.wrong).spriteFrame;
            let questionSprites = [right, wrong];
            questionSprites = Tools.disorder(questionSprites);
            this.chooseQuestions.push({
                text: "下图中，哪种吃水果的方式是正确的？",
                sprites: questionSprites,
                answerIndex: questionSprites.findIndex(x => x == right)
            });
        }
        this.questionLength = this.chooseQuestions.length;
    }

    async start() {
        if (this.type == CommonFruitType.learning) {
            let button = this.canvas.getChildByName("resourceButtons").children[0].getComponent(cc.Button);
            button.clickEvents[0].emit(undefined);
        }
        else if (this.type == CommonFruitType.choose) {
            this.setting = await this.showSettingPanel({
                "题目内容": ["认识水果", "吃水果"]
            });
            switch (this.setting["题目内容"]) {
                case "认识水果": this.createChooseFruitQuestions(); break;
                case "吃水果": this.createChooseActionQuestions(); break;
            }
        }
        else {
            // this.canvas.getChildByName("制作果汁").getComponent(MakeJuice).init();
        }
    }

    refresh(): void {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        if (this.type == CommonFruitType.learning) {
            let box = canvas.getChildByName("learningPictureBox");
            let controlButtons = canvas.getChildByName("controlButtons");
            let nextButton = controlButtons.getChildByName("rightBtn").getComponent(cc.Button);
            let preButton = controlButtons.getChildByName("leftBtn").getComponent(cc.Button);
            let sprite = box.getChildByName("learningPicture").getComponent(cc.Sprite);
            let label = box.getChildByName("label").getComponent(cc.Label);
            let firstSpirt = box.getChildByName("firstPicture").getComponent(cc.Sprite);
            nextButton.interactable = this.questionIndex !== this.questionLength - 1;
            preButton.interactable = this.questionIndex > 0;
            sprite.node.active = label.node.active = this.questionIndex > 0;
            firstSpirt.node.active = this.questionIndex == 0;
            if (this.questionIndex == 0) {
                firstSpirt.spriteFrame = this.learningQuestion.spriteFrame;
            } else {
                sprite.spriteFrame = this.learningQuestion.spriteFrame;
                label.string = this.learningQuestion.spriteFrame.name;
            }
            let audioId = cc.audioEngine.play(this.learningQuestion.audioClip, false, 1);
        }
        else if (this.type == CommonFruitType.choose) {
            let questionTitle = canvas.getChildByName("questionTitle");
            questionTitle.getComponent(cc.Label).string = this.chooseQuestion.text;
            let chooses = canvas.getChildByName("chooses");
            this.chooseQuestion.sprites.forEach((spriteFrame, index) => {
                chooses.children[index].getComponent(ChooseBox).init(this.judge, this);
                chooses.children[index].getChildByName("image")
                    .getComponent(cc.Sprite).spriteFrame = spriteFrame;
            })
        }
    }

    async judge(selectIndex: number) {
        let chooses = this.canvas.getChildByName("chooses");
        chooses.children.forEach((choose, index) => {
            if (index != selectIndex) {
                choose.getComponent(ChooseBox).disable();
            }
        });
        let selectTarget = chooses.children[selectIndex].getComponent(ChooseBox);
        if (this.chooseQuestion.answerIndex == selectIndex) {
            await selectTarget.right();
            await this.canvas.getChildByName("sheepRight").getComponent(SheepRight).showAsync();
        }
        else {
            await selectTarget.wrong();
        }
    }

    public guideSwitch() {
        if (this.type == CommonFruitType.choose) {
            let guideNode = this.canvas.getChildByName("questionTitle");
            guideNode.active = !guideNode.active;
        }
    };
}

enum CommonFruitType {
    learning,
    choose,
    playing
}