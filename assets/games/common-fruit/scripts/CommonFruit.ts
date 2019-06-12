import GameBase from "../../../public/scripts/GameBase";

export default class CommonFruit extends GameBase {

    private static _instance: CommonFruit;

    public static getInstance(): CommonFruit {
        if (!this._instance) {
            this._instance = new CommonFruit();
        }
        return this._instance;
    }

    start(): void {

    }

    refresh(): void {

    }

}

enum CommonFruitType {
    learning,
    choose,
    playing
}