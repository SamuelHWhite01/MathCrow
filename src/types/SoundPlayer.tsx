const soundModules = import.meta.glob('../assets/sounds/orch-hit-*.mp3', { eager: true });
const soundPaths = Object.entries(soundModules)
  .sort(([a], [b]) => {
    // Extract the numbers from the filenames
    const numA = parseInt(a.match(/(\d+)\.mp3$/)?.[1] || '0');
    const numB = parseInt(b.match(/(\d+)\.mp3$/)?.[1] || '0');
    return numA - numB;
  })
  .map(([, mod]: [string, any]) => mod.default);
class SoundPlayer {
    audios: HTMLAudioElement[] = [];

    constructor() {
        this.audios = soundPaths.map((src) => {
            const audio = new Audio(src);
            audio.load();
            return audio;
          });
    }

    public playSound(index: number) {
        let i = 0;
        if (index > 11) {
            i = 11;
        } else {
            i = index;
        }
        this.audios[i].volume = 0.1;
        this.audios[i].currentTime = 0;
        this.audios[i].play();
    }
}
export default SoundPlayer;
