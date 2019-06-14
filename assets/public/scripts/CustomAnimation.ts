export default class CustomAnimation {
    /**
	 * props = { xOffset: 0.15 , playTimes:2}
	 */
    public static shake(obj: cc.Node, props: any = {}) {
        if (props.xOffset == undefined) {
            props.xOffset = 0.15;
        }
        if (props.time == undefined) {
            props.time = 60;
        }
        if (props.playTimes == undefined) {
            props.playTimes = 2;
        }

        return new Promise((resolve, reject) => {
            let tw = new cc.Tween();
            tw.target(obj);
            tw.to(0.06, { x: obj.x - obj.width * props.xOffset }, undefined);
            for (var i = 0; i < props.playTimes; i++) {
                tw.to(0.12, { x: obj.x + obj.width * props.xOffset }, undefined);
                tw.to(0.12, { x: obj.x - obj.width * props.xOffset }, undefined);
            }
            tw.to(0.06, { x: obj.x }, undefined);
            tw.call(resolve);
            tw.start();
        });
    }
}
