
export default class AudioHelper {
    public static playAsync(audioClip: cc.AudioClip) {
        let audioId = cc.audioEngine.play(audioClip, false, 1);
        return new Promise((resolve, reject) => {
            cc.audioEngine.setFinishCallback(audioId, resolve);
        })
    }

    public static async playQueenAsync(audioClips: cc.AudioClip[]) {
        for (var audioClip of audioClips) {
            await AudioHelper.playAsync(audioClip);
        }
    }
}
