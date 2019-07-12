import { ReportDetial } from "./dto/ReportDetail";
import { Report } from "./dto/Report";
import ServerInfo from "./ServerInfo";
import GameTimer from "./GameTimer";
import SettingPanel from "./SettingPanel";
import BottomControlButton from "./control-button/BottomControlButton";
import ControlButtonType from "./control-button/ControlButtonType";

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
        return this.questionIndex == this.questionLength - 2;
    }

    async initial(type: number) {
        GameTimer.reset();
        GameTimer.start();
        this.questionIndex = 0;
        this.saveReportInput.details = [];
        this.reportDetail = new ReportDetial();
        this.type = type;
        let buttons = this.bottomControlButtons;
        if (buttons) {
            buttons.active = false;
        }
        await this.start();
        this.updateCounter();

        if (buttons) {
            let script = buttons.getComponent(BottomControlButton);
            let controlButtonTransition = async (operation: () => Promise<any>) => {
                script.disableAll();
                await operation.call(this);
                script.enableAll();
                this.updateControlButton();
            }
            buttons.active = true;
            script.setButtonState(ControlButtonType.last, false);
            buttons.on(ControlButtonType.redo, async () => {
                controlButtonTransition(this.refresh);
            }, this);
            buttons.on(ControlButtonType.last, async () => {
                controlButtonTransition(this.lastQuestion);
            }, this);
            buttons.on(ControlButtonType.next, async () => {
                controlButtonTransition(this.nextQuestion);
            }, this);
            buttons.on(ControlButtonType.guide, () => { this.guideSwitch(); }, this);
            buttons.on(ControlButtonType.replay, async () => {
                controlButtonTransition(this.guideReplay);
            }, this);
            controlButtonTransition(this.refresh);
        }
        else {
            this.refresh();
        }
    }

    get canvas() {
        return cc.director.getScene().getChildByName("Canvas");
    }

    get bottomControlButtons() {
        return this.canvas.getChildByName("bottomControlButtons");
    }

    public disableAllControlButtons() {
        let script = this.bottomControlButtons.getComponent(BottomControlButton);
        script.disableAll();
    }

    public enableAllControlButtons() {
        let script = this.bottomControlButtons.getComponent(BottomControlButton);
        script.enableAll();
        this.updateControlButton();
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
        if (this.bottomControlButtons) {
            let script = this.bottomControlButtons.getComponent(BottomControlButton);
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

    public async nextQuestion() {
        // this.record();
        if (this.questionIndex < this.questionLength - 1) {
            this.questionIndex++;
            this.updateCounter();
            await this.refresh();
        }
        else {
            // this.saveReport();
        }
    }

    public async lastQuestion() {
        if (this.questionIndex > 0) {
            this.questionIndex--;
            this.updateCounter();
            await this.refresh();
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
