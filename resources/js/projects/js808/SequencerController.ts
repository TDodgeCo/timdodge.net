import SequencerStateService from "./SequencerStateService"
import SequencerViewService from "./SequencerViewService"

// responsible for retrieving, capturing and routing input from the sequencer controls
export default class SequencerController {
    static instance: SequencerController

    public static sequencerControlForm: HTMLFormElement
    public static bpmInput: HTMLInputElement
    public static patternSelect: HTMLSelectElement
    public static stopBtn: HTMLButtonElement
    public static playBtn: HTMLButtonElement
    public static stepsInput: HTMLSelectElement

    constructor() {
        console.log('SequencerController instantiated')
        if (SequencerController.instance) {
            return SequencerController.instance
        }
        SequencerController.instance = this

        SequencerController.sequencerControlForm = document.getElementById('js808PlayerForm') as HTMLFormElement
        SequencerController.bpmInput = document.getElementById('bpmInput') as HTMLInputElement
        SequencerController.patternSelect = document.getElementById('patternSelect') as HTMLSelectElement
        SequencerController.stepsInput = document.getElementById('stepsInput') as HTMLSelectElement
        SequencerController.stopBtn = document.getElementById('stopBtn') as HTMLButtonElement
        SequencerController.playBtn = document.getElementById('playBtn') as HTMLButtonElement
    }

    public static getFormValues() {
        const formValues = {
            bpm: parseInt(this.bpmInput.value),
            patternId: parseInt(this.patternSelect.value),
            active: SequencerStateService.getState().active,
            steps: parseInt(this.stepsInput.value)
        }
        return formValues
    }

    public static preventFormSubmit() {
        this.sequencerControlForm.addEventListener('submit', (e) => {
            e.preventDefault()
        })
    }

    public static formListener() {
        let debounceTimeout: number | null = null

        this.bpmInput.addEventListener('input', () => {
            if (debounceTimeout !== null) {
                clearTimeout(debounceTimeout)
            }

            debounceTimeout = window.setTimeout(() => {
                const bpmIsNumber = this.removeAlphaFromBpm(this.bpmInput)
                console.log(`BPM input: ${this.bpmInput.value}`)
                if (bpmIsNumber) {
                    console.log(`BPM is a number`)
                    const bpmIsInRange = this.validateAndUpdateBpm(parseInt(this.bpmInput.value))
                    if (bpmIsInRange) {
                        // return true
                        return console.log('BPM is in range')
                    }
                    return false
                }
            }, 1000)
        })

        this.playBtn.addEventListener('click', () => {
            console.log('Play button clicked')
            this.playBtn.disabled = true
            this.stopBtn.disabled = false
            this.bpmInput.disabled = true
            SequencerStateService.setActive(true)

            SequencerViewService.startPlayback()
        })

        this.stopBtn.addEventListener('click', () => {
            this.stopBtn.disabled = true
            this.playBtn.disabled = false
            this.bpmInput.disabled = false
            console.log('Stop button clicked')
            // SequencerViewService.stopPlayback()
            SequencerStateService.setActive(false)
        })

        this.patternSelect.addEventListener('change', () => {
            console.log('Pattern select changed')
            const patternId = parseInt(this.patternSelect.value)
            SequencerViewService.updateSequencerValues(patternId)
        })
    }

    private static removeAlphaFromBpm(bpmInput: HTMLInputElement) {
        if (bpmInput.value === '') {
            bpmInput.value = '60'
        }
        // Ensure the input is a number. If not, replace the value with an empty string
        bpmInput.value = bpmInput.value.replace(/[^0-9]/g, '')
        
        return true
    }

    private static validateAndUpdateBpm(bpm: number) {
        if (bpm < 60) {
            console.log('BPM is less than 60')
            SequencerStateService.setBpm(60)
        } else if (bpm > 240) {
            console.log('BPM is greater than 240')
            SequencerStateService.setBpm(240)
        } else {
            console.log('BPM is within range')
            SequencerStateService.setBpm(bpm)
        }
        console.log(`BPM set to ${SequencerStateService.getState().bpm}`)
        SequencerViewService.updateBpmValue()
        return true
    }
}
new SequencerController()