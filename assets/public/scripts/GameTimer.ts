export default class GameTimer {
    public static timeIndex: number = 0;
    public static lastTimeIndex: number = 0;
    public static isRunning: boolean = false;

    public static start() {
        this.isRunning = true;
    }

    public static stop() {
        this.isRunning = false;
    }

    public static reset() {
        this.stop();
        this.timeIndex = 0;
        this.lastTimeIndex = 0;
    }

    public static record() {
        this.lastTimeIndex = this.timeIndex;
    }

}
