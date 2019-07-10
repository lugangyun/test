import { ReportDetial } from "./dto/ReportDetail";
import { Report } from "./dto/Report";
import ServerInfo from "./ServerInfo";
import GameTimer from "./GameTimer";
import SettingPanel from "./SettingPanel";

export default abstract class GameBase {

    type: number;
    questionIndex: number;
    questionLength: number;
    reportDetail: ReportDetial;
    setting: any;

    async initial(type: number) {
        GameTimer.reset();
        GameTimer.start();
        this.questionIndex = 0;
        this.saveReportInput.details = [];
        this.reportDetail = new ReportDetial();
        this.type = type;
        await this.start();
        this.updateCounter();
        this.refresh();
    }

    get canvas() {
        return cc.director.getScene().getChildByName("Canvas");
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
    abstract refresh(): void;

    /**
     * 引导语开关
     */
    public guideSwitch() { };

    /**
     * 播放引导语
     */
    public guideReplay() { };

    public updateCounter() {
        let counter = this.canvas.getChildByName("counter");
        if (counter) {
            let counterLabel = counter.getChildByName("label").getComponent(cc.Label);
            counterLabel.string = (this.questionIndex + 1) + "/" + this.questionLength;
        }
    }

    public nextQuestion() {
        // this.record();
        if (this.questionIndex < this.questionLength - 1) {
            this.questionIndex++;
            this.updateCounter();
            this.refresh();
        }
        else {
            // this.saveReport();
        }
    }

    public lastQuestion() {
        if (this.questionIndex > 0) {
            this.questionIndex--;
            this.updateCounter();
            this.refresh();
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
