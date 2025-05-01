import orchHit1 from '@/assets/sounds/orch-hit-1.mp3';
class SoundPlayer {
    audios: HTMLAudioElement[] = [];

    constructor() {
        for (let i = 1; i <= 12; i++) {
            const audio = new Audio(orchHit1);
            audio.load();
            this.audios.push(audio);
        }
    }

    public PlaySound(idx: number) {
        let i = 0;
        if (idx > 11) {
            i = 11;
        } else {
            i = idx;
        }
        this.audios[i].volume = 0.1;
        this.audios[i].currentTime = 0;
        this.audios[i].play();
    }
}
export default SoundPlayer;
