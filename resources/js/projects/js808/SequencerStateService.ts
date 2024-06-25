type State = {
    bpm: number | null
    patternId: number | null
    active: boolean
    steps: number
}

export default class SequencerStateService {
    static instance: SequencerStateService

    private static bpm: number | null
    private static patternId: number | null
    private static active: boolean
    private static steps: number | null
    public static updateQueued?: boolean

    constructor() {
        
        SequencerStateService.bpm = null
        SequencerStateService.patternId = null
        SequencerStateService.active = false
        SequencerStateService.steps = null


        if (SequencerStateService.instance) {
            return SequencerStateService.instance
        }
        SequencerStateService.instance = this
        console.log('SequencerStateService instantiated')
    }

    public static init() {
        if (this.instance) {
            return true
        }
        throw new Error('SequencerStateService failed to initialize')
    }
    
    public static setState(stateObj: State) {
        console.log(`Setting state: ${JSON.stringify(stateObj, null, 4)}`)
        this.bpm = stateObj.bpm
        this.patternId = stateObj.patternId
        this.active = stateObj.active
        this.steps = stateObj.steps as number
    }

    public static getState(): State {
        const stateObj = {
            bpm: this.bpm as number,
            patternId: this.patternId as number,
            active: this.active as boolean,
            steps: this.steps as number
        }
        return stateObj as State
    }


    public static setBpm(bpm: number) {
        this.bpm = bpm
        return this.bpm
    }

    public static setPatternId(patternId: number) {
        this.patternId = patternId
        return this.patternId
    }

    public static setActive(active: boolean) {
        this.active = active
        return this.active
    }

    public static setSteps(steps: number) {
        this.steps = steps
        return this.steps
    }

    public static queueUpdate(bool: boolean) {
        this.updateQueued = bool
    }

}

new SequencerStateService()