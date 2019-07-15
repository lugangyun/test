import { ReportDetial } from "./dto/ReportDetail";
import { Report } from "./dto/Report";
import ServerInfo from "./ServerInfo";
import GameTimer from "./GameTimer";
import SettingPanel from "./SettingPanel";
import ControlButtonType from "./control-button/ControlButtonType";
import ControlButton from "./control-button/ControlButton";

export default abstract class GameBase {

    type: number;
    questionIndex: number;
    questionLength: number;
    reportDetail: ReportDetial;
    setting: any;

    get isFirstQuestion() {
        return this.questionIndex == 0;
    }

    get isLastQuestion() {
        return this.questionIndex == this.questionLength - 1;
    }

    isContinuePlaying = false;

    async initial(type: number) {
        GameTimer.reset();
        GameTimer.start();
        this.questionIndex = 0;
        this.saveReportInput.details = [];
        this.reportDetail = new ReportDetial();
        this.type = type;
        let buttons = this.controlButtons;
        if (buttons) {
            buttons.active = false;
        }
        await this.start();
        this.updateCounter();

        if (buttons) {
            let script = buttons.getComponent(ControlButton);
            buttons.active = true;
            script.setButtonState(ControlButtonType.last, false);
            buttons.on(ControlButtonType.playAll, async () => {
                this.isContinuePlaying = true;
                this.disableAllControlButtons();
                script.setNodeActive(ControlButtonType.playAll, false);
                script.setNodeActive(ControlButtonType.backToPlayStep, true);
                script.setButtonState(ControlButtonType.backToPlayStep, true);
                await this.gotoFirstQuestion();
                while (!this.isLastQuestion) {
                    await this.nextQuestion();
                }
                this.isContinuePlaying = false;
                this.gotoFirstQuestion();
                cc.audioEngine.stopAll();
                script.setNodeActive(ControlButtonType.playAll, true);
                script.setNodeActive(ControlButtonType.backToPlayStep, false);
                this.enableAllControlButtons();
                this.updateControlButton();
            }, this);
            buttons.on(ControlButtonType.backToPlayStep, this.backToPlayStep, this);
            buttons.on(ControlButtonType.redo, this.refreshBase, this);
            buttons.on(ControlButtonType.last, this.lastQuestion, this);
            buttons.on(ControlButtonType.next, this.nextQuestion, this);
            buttons.on(ControlButtonType.guide, () => { this.guideSwitch(); }, this);
            buttons.on(ControlButtonType.replay, this.guideReplayBase, this);
        }
        this.refreshBase();
    }

    get canvas() {
        return cc.director.getScene().getChildByName("Canvas");
    }

    get controlButtons() {
        return this.canvas.getChildByName("controlButtons");
    }

    public disableAllControlButtons() {
        let script = this.controlButtons.getComponent(ControlButton);
        script.disableAll();
    }

    public enableAllControlButtons() {
        let script = this.controlButtons.getComponent(ControlButton);
        script.enableAll();
        this.updateControlButton();
    }

    public backToPlayStep() {
        cc.audioEngine.stopAll();
        this.isContinuePlaying = false;
        let script = this.controlButtons.getComponent(ControlButton);
        script.enableAll();
        script.setNodeActive(ControlButtonType.backToPlayStep, false);
        script.setNodeActive(ControlButtonType.playAll, true);
    }

    async showSettingPanel(setting: any) {
        return await this.canvas.getChildByName("settingPanel")
            .getComponent(SettingPanel).show(setting);
    }

    /**
     * 游戏自身的初始化操作
     */
    abstract async start(): Promise<any>;

    /**
     * 游戏的题目刷新操作
     */
    abstract async refresh(): Promise<any>;

    /**
     * 引导语开关（可作为开关，也可以直接设置状态）
     */
    public guideSwitch(isShow?: boolean) { };

    /**
     * 播放引导语
     */
    public async guideReplay() { };

    public updateCounter() {
        let counter = this.canvas.getChildByName("counter");
        if (counter) {
            let counterLabel = counter.getChildByName("label").getComponent(cc.Label);
            counterLabel.string = (this.questionIndex + 1) + "/" + this.questionLength;
        }
    }

    public updateControlButton() {
        if (this.controlButtons && !this.isContinuePlaying) {
            let script = this.controlButtons.getComponent(ControlButton);
            if (this.isFirstQuestion) {
                script.setButtonState(ControlButtonType.last, false);
                script.setButtonState(ControlButtonType.next, true);
            }
            else if (this.isLastQuestion) {
                script.setButtonState(ControlButtonType.last, true);
                script.setButtonState(ControlButtonType.next, false);
            }
            else {
                script.setButtonState(ControlButtonType.last, true);
                script.setButtonState(ControlButtonType.next, true);
            }
        }
    }

    public async refreshBase() {
        cc.audioEngine.stopAll();
        this.updateCounter();
        this.updateControlButton();
        await this.refresh();
    }

    public async guideReplayBase() {
        cc.audioEngine.stopAll();
        this.guideReplay();
    }

    public async gotoFirstQuestion() {
        this.questionIndex = 0;
        await this.refreshBase();
    }

    public async nextQuestion() {
        // this.record();
        if (this.questionIndex < this.questionLength - 1) {
            this.questionIndex++;
            await this.refreshBase();
        }
        else {
            // this.saveReport();
        }
    }

    public async lastQuestion() {
        if (this.questionIndex > 0) {
            this.questionIndex--;
            await this.refreshBase();
        }
    }

    public reportDetails: ReportDetial[] = [];
    public saveReportInput: Report = new Report();
    public record() {
        this.reportDetail.reactionTime = Math.min(GameTimer.timeIndex - GameTimer.lastTimeIndex, 1);
        this.saveReportInput.details.push(this.reportDetail);
        this.reportDetail = new ReportDetial();
    }

    public reportId: string;
    public async saveReport() {
        console.log(this.saveReportInput);
        this.reportId = await ServerInfo.getInstance().saveReport(this.saveReportInput);
    }
}
