import GameBase from "../../../public/scripts/GameBase";
import { Tools } from "../../../public/scripts/Tools";
import ChooseBox from "../../../public/scripts/template/ChooseBox";
import SheepRight from "../../../public/scripts/SheepRight";
import ResourceData from "./ResourceData";
import TrainData from "./TrainData";

export default class ClothCompareLength extends GameBase {

    private static _instance: ClothCompareLength;
    private storeClothingArr;

    public static getInstance(): ClothCompareLength {
        if (!this._instance) {
            this._instance = new ClothCompareLength();
        }
        return this._instance;
    }

    learningQuestions: { spriteFrame: cc.SpriteFrame }[] = [];
    get learningQuestion() {
        return this.learningQuestions[this.questionIndex];
    }

    chooseQuestions: { text: string, sprites: cc.SpriteFrame[], answerIndex: number }[] = [];
    get chooseQuestion() {
        return this.chooseQuestions[this.questionIndex];
    }

    get datas() {
        return cc.director.getScene().getChildByName("resourceDatas").getComponent(ResourceData);
    }
    get trainDatas() {
        return cc.director.getScene().getChildByName("resourceDatas").getComponent(TrainData);
    }

    setLearningQuestion(fruit: string) {
        this.learningQuestions = this.datas[fruit];
        this.questionIndex = 0;
        this.questionLength = this.learningQuestions.length;
        this.updateCounter();
        this.refresh();
    }
    setLearningLength(clothing: string) {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        this.storeClothingArr = this.datas[clothing];
        var lengthContent = canvas.getChildByName("lengthContent");
        var showChange = lengthContent.getChildByName("showChange");
        var plus1 = showChange.getChildByName("plus1");
        var less = showChange.getChildByName("less");
        var plus = showChange.getChildByName("plus");
        var less1 = showChange.getChildByName("less1");
        var leftSpirte = lengthContent.getChildByName("leftCloth");
        var rightSpirte = lengthContent.getChildByName("rightCloth");
        var textSame = showChange.getChildByName("textSame");
        leftSpirte.getComponent(cc.Sprite).spriteFrame = this.storeClothingArr[0].spriteFrame;
        rightSpirte.getComponent(cc.Sprite).spriteFrame = this.storeClothingArr[1].spriteFrame;
        plus.getComponent(cc.Button).interactable = false;
        less1.getComponent(cc.Button).interactable = false;
        plus1.getComponent(cc.Button).interactable = true;
        less.getComponent(cc.Button).interactable = true;
        textSame.active = false;
    }
    switchPicture(type: number) {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        var lengthContent = canvas.getChildByName("lengthContent");
        var showChange = lengthContent.getChildByName("showChange");
        var less = showChange.getChildByName("less");
        var plus = showChange.getChildByName("plus");
        var less1 = showChange.getChildByName("less1");
        var plus1 = showChange.getChildByName("plus1");
        var textLong = showChange.getChildByName("textLong");
        var textShort = showChange.getChildByName("textShort");
        var textSame = showChange.getChildByName("textSame");
        var playAudio = showChange.getChildByName("playAudio");
        var playAudio1 = showChange.getChildByName("playAudio1");
        var leftSpirteNode = lengthContent.getChildByName("leftCloth");
        var rightSpirteNode = lengthContent.getChildByName("rightCloth");
        var leftSpirte = leftSpirteNode.getComponent(cc.Sprite);
        var rightSpirte = rightSpirteNode.getComponent(cc.Sprite);
        if (type == 1) {
            this.setImage(leftSpirte, 1);
            less.getComponent(cc.Button).interactable = false;
            plus.getComponent(cc.Button).interactable = true;
            if (!this.judgeEqual(rightSpirte, 1)) {
                textLong.getComponent(cc.Label).string = "短";
                textShort.getComponent(cc.Label).string = "长";
                textSame.active = false;
                textLong.active = true;
                textShort.active = true;
                playAudio.active = true;
                playAudio1.active = true;
            } else {
                playAudio.active = false;
                playAudio1.active = false;
                textSame.active = true;
                textLong.active = false;
                textShort.active = false;
            }
        }
        if (type == 2) {
            this.setImage(leftSpirte, 0);
            less.getComponent(cc.Button).interactable = true;
            plus.getComponent(cc.Button).interactable = false;
            if (!this.judgeEqual(rightSpirte, 0)) {
                textLong.getComponent(cc.Label).string = "长";
                textShort.getComponent(cc.Label).string = "短";
                playAudio.active = true;
                playAudio1.active = true;
                textSame.active = false;
                textLong.active = true;
                textShort.active = true;
            } else {
                textSame.active = true;
                textLong.active = false;
                textShort.active = false;
                playAudio.active = false;
                playAudio1.active = false;
            }
        }
        if (type == 3) {
            this.setImage(rightSpirte, 1);
            less1.getComponent(cc.Button).interactable = false;
            plus1.getComponent(cc.Button).interactable = true;
            if (!this.judgeEqual(leftSpirte, 1)) {
                textShort.getComponent(cc.Label).string = "短";
                textLong.getComponent(cc.Label).string = "长";
                textSame.active = false;
                textLong.active = true;
                textShort.active = true;
                playAudio.active = true;
                playAudio1.active = true;
            } else {
                textSame.active = true;
                textLong.active = false;
                textShort.active = false;
                playAudio.active = false;
                playAudio1.active = false;
            }
        }
        if (type == 4) {
            this.setImage(rightSpirte, 0);
            less1.getComponent(cc.Button).interactable = true;
            plus1.getComponent(cc.Button).interactable = false;
            if (!this.judgeEqual(leftSpirte, 0)) {
                textShort.getComponent(cc.Label).string = "长";
                textLong.getComponent(cc.Label).string = "短";
                textSame.active = false;
                textLong.active = true;
                textShort.active = true;
                playAudio.active = true;
                playAudio1.active = true;
            } else {
                textSame.active = true;
                textLong.active = false;
                textShort.active = false;
                playAudio.active = false;
                playAudio1.active = false;
            }
        }
    }
    playAudio() {

    }
    judgeEqual(sprite: cc.Sprite, currentIdx): boolean {
        var index = 0;
        this.storeClothingArr.forEach((element, idx) => {
            if (element.spriteFrame == sprite.spriteFrame) {
                index = idx;
            }
        });
        return index == currentIdx;
    }
    setImage(sprite: cc.Sprite, idx: number) {
        sprite.spriteFrame = this.storeClothingArr[idx].spriteFrame;
    }

    createChooseFruitQuestions() {
        this.chooseQuestions = [];
        let questionsSource = this.trainDatas.longColth.concat(this.trainDatas.longColth);
        let questionInterfere = this.trainDatas.shortColth.concat(this.trainDatas.shortColth);
        questionsSource = Tools.disorder(questionsSource);
        questionInterfere = Tools.disorder(questionInterfere);
        for (let data of questionsSource) {
            let targetIndex = questionsSource.indexOf(data);
            let interferenceIndex = Tools.getRandomNum(0, questionsSource.length - 1, [targetIndex]);
            let interferenceData = questionInterfere[interferenceIndex];
            let questionSprites = [data.spriteFrame, interferenceData.spriteFrame];
            questionSprites = Tools.disorder(questionSprites);
            this.chooseQuestions.push({
                text: "请找出长的",
                sprites: questionSprites,
                answerIndex: questionSprites.findIndex(x => x == data.spriteFrame)
            });
        }
        this.questionLength = this.chooseQuestions.length;
    }


    createChooseActionQuestions() {

    }

    async start() {
        if (this.type == CompareLengthType.training) {
            this.setting = await this.showSettingPanel({
                "出题规则": ["比长", "比短"],
                "题目内容": ["已学习", "未学习"],
                "素材类型": ["卡通", "真实"]
            });
            switch (this.setting["出题规则"]) {
                case "比长": this.createChooseFruitQuestions(); break;
                case "比短": this.createChooseActionQuestions(); break;
            }
        }
    }

    refresh(): void {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        if (this.type == CompareLengthType.learning) {
            var topBtnGrounp = canvas.getChildByName("topBtnGrounp");
            var childSong = topBtnGrounp.getChildByName("childSong");
            childSong.getComponent(cc.Button).clickEvents[0].emit([1]);
        }
        if (this.type == CompareLengthType.training) {
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
        //this.nextQuestion()
    }
}
}

enum CompareLengthType {
    learning,
    training,
    playing,
    writing
}