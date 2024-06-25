export default class SequencerAudioService {

    public static routeSound(element: HTMLElement) {
        const id = element.getAttribute('id')
        switch (id) {
            case 'trKick':
                this.playKick()
                break
            case 'trSnare':
                this.playSnare()
                break
            case 'trOpenHat':
                this.playOhh()
                break
            case 'trClosedHat':
                this.playChh()
                break
            default:
                console.log('No sound found')
        }
    }
    public static playKick() {
        const audio = new Audio('/audio/808/808kick.wav')
        audio.play()
    }
    public static playSnare() {
        const audio = new Audio('/audio/808/808snare.wav')
        audio.play()
    }
    public static playOhh() {
        const audio = new Audio('/audio/808/808ohh.wav')
        audio.play()
    }
    public static playChh() {
        const audio = new Audio('/audio/808/808chh.wav')
        audio.play()
    }
}