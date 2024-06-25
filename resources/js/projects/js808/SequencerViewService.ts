import SequencerStateService from "./SequencerStateService"
import SequencerModel from "./SequencerModel"
import SequencerAudioService from "./SequencerAudioService"

// responsible for updating the view of the sequencer and it's controls
export default class SequencerViewService {
    private static count: number
    private static subcount: number

    private static bpmInput: HTMLInputElement
    private static patternSelect: HTMLSelectElement
    private static playBtn: HTMLButtonElement
    private static stopBtn: HTMLButtonElement
    public static stepsInput: HTMLSelectElement

    public static currentBpm: HTMLSpanElement
    public static currentSteps: HTMLSpanElement
    public static currentSequence: HTMLSpanElement
    public static currentlyActive: HTMLSpanElement

    public static trKick: HTMLTableRowElement
    public static trSnare: HTMLTableRowElement
    public static trOpenHat: HTMLTableRowElement
    public static trClosedHat: HTMLTableRowElement
    public static kickChildren: Element[]
    public static snareChildren: Element[]
    public static ohChildren: Element[]
    public static chChildren: Element[]

    // Add sequencer row elements here

    constructor() {
        console.log('SequencerViewService instantiated')

        SequencerViewService.count = 1
        SequencerViewService.subcount = 1

        SequencerViewService.bpmInput = document.getElementById('bpmInput') as HTMLInputElement
        SequencerViewService.patternSelect = document.getElementById('patternSelect') as HTMLSelectElement
        SequencerViewService.playBtn = document.getElementById('playBtn') as HTMLButtonElement
        SequencerViewService.stopBtn = document.getElementById('stopBtn') as HTMLButtonElement
        SequencerViewService.stepsInput = document.getElementById('stepsInput') as HTMLSelectElement

        SequencerViewService.currentBpm = document.getElementById('currentBpm') as HTMLSpanElement
        SequencerViewService.currentSteps = document.getElementById('currentSteps') as HTMLSpanElement
        SequencerViewService.currentSequence = document.getElementById('currentSequence') as HTMLSpanElement
        SequencerViewService.currentlyActive = document.getElementById('currentlyActive') as HTMLSpanElement
        SequencerViewService.bpmInput = document.getElementById('bpmInput') as HTMLInputElement

        SequencerViewService.trKick = document.getElementById('trKick') as HTMLTableRowElement
        SequencerViewService.trSnare = document.getElementById('trSnare') as HTMLTableRowElement
        SequencerViewService.trOpenHat = document.getElementById('trOpenHat') as HTMLTableRowElement
        SequencerViewService.trClosedHat = document.getElementById('trClosedHat') as HTMLTableRowElement

        SequencerViewService.kickChildren = Array.from(SequencerViewService.trKick.children) as Element[]
        SequencerViewService.snareChildren = Array.from(SequencerViewService.trSnare.children) as Element[]
        SequencerViewService.ohChildren = Array.from(SequencerViewService.trOpenHat.children) as Element[]
        SequencerViewService.chChildren = Array.from(SequencerViewService.trClosedHat.children) as Element[]

        SequencerViewService.disableSequencerControls()
        console.log('Sequencer controls disabled until state is set')
    }

    public static updateBpmValue() {
        const state = SequencerStateService.getState()
        if (state.bpm === null) {
            throw new Error('BPM is null. Make sure the BPM input has a value.')
        }
        this.bpmInput.value = state.bpm.toString()
    }

    public static enableSequencerControls() {
        this.bpmInput.disabled = false
        this.patternSelect.disabled = false
        this.playBtn.disabled = false
        this.stopBtn.disabled = false
        this.stepsInput.disabled = false

        console.log(`Sequencer controls enabled`)
    }

    private static disableSequencerControls() {
        this.bpmInput.disabled = true
        this.patternSelect.disabled = true
        this.playBtn.disabled = true
        this.stopBtn.disabled = true
        this.stepsInput.disabled = true
    }

    public static updateSequencerValues(patternId: number) {
        const stateObj = SequencerStateService.getState()
        if (stateObj.patternId === null) {
            throw new Error('Pattern ID is null. Make sure a pattern is selected')
        }
        // SequencerStateService.setPatternId(patternId)
        const pattern = SequencerModel.getPattern(patternId)

        SequencerStateService.setState({
            bpm: pattern.bpm,
            patternId: pattern.id,
            active: stateObj.active,
            steps: stateObj.steps
        })

        console.log('updateSequencerValues is hard coding steps based on the previous stateObj value')

        // if the sequencer is running, don't force the state to update immediately. The sequencer interval always checks if the state 
        // needs to be updated at the end of the steps.
        if (stateObj.active) {
            return SequencerStateService.queueUpdate(true)
        }

        this.resetSequencerState(this.kickChildren, this.snareChildren, this.ohChildren, this.chChildren)

        this.patternSelect.value = patternId.toString()
    }

    public static setSequencerState() {
        console.log('Setting sequencer state')
        const stateObj = SequencerStateService.getState()
        const patternId = stateObj.patternId

        if (patternId === null) {
            throw new Error('Pattern ID is null. Make sure a pattern is selected')
        }

        const sequence = SequencerModel.getPattern(patternId)

        if (!sequence) {
            throw new Error('Could not find the pattern')
        }

        SequencerStateService.setBpm(sequence.bpm)

        this.bpmInput.value = sequence.bpm.toString()

        // this.resetSequencerState(kickChildren, snareChildren, ohChildren, chChildren)

        Object.entries(sequence.patterns).forEach(([key, value]) => {
            switch (key) {
                case 'kick':
                    value.forEach((v: number) => {
                        this.kickChildren[v].classList.add('bg-black')
                    })
                    break
                case 'snare':
                    value.forEach((v: number) => {

                        this.snareChildren[v].classList.add('bg-black')
                    })
                    break
                case 'oh':
                    value.forEach((v: number) => {
                        this.ohChildren[v].classList.add('bg-black')
                    })
                    break
                case 'ch':
                    value.forEach((v: number) => {
                        this.chChildren[v].classList.add('bg-black')
                    })
                    break
            }
        })
        if (SequencerStateService.updateQueued) {
            SequencerStateService.queueUpdate(false)
            return this.startPlayback()
        }
    }

    public static startPlayback() {
        console.log('Starting playback')
        const stateObj = SequencerStateService.getState()

        if (stateObj.bpm === null || stateObj.steps === null) {
            throw new Error('BPM or steps is null. Make sure there is a value for both of these inputs. If there is a value, it is not being set in the state object.')
        }

        const { bpm, steps } = stateObj
        const kickChildren = this.kickChildren
        const snareChildren = this.snareChildren
        const ohChildren = this.ohChildren
        const chChildren = this.chChildren
        const interval = ((60 / bpm) * 4) / 16 * 1000

        console.log(`BPM: ${bpm}, Steps: ${steps}, Interval: ${interval}`)

        const sequencerInterval = setInterval(() => {
            const isUpdateQueued = SequencerStateService.updateQueued
            // is the sequencer active?
            if (!SequencerStateService.getState().active) {
                this.count = 1
                this.subcount = 1

                console.log('Sequencer stopped')
                this.resetSequencerState(this.kickChildren, this.snareChildren, this.ohChildren, this.chChildren)
                return clearInterval(sequencerInterval)
            }

            if (this.count === steps + 1) {
                // end of sequence
                this.count = 1
                this.subcount = steps
                // check if the sequence has been updated
                if (isUpdateQueued) {
                    this.resetSequencerState(this.kickChildren, this.snareChildren, this.ohChildren, this.chChildren)
                    return clearInterval(sequencerInterval)
                }

            } else if (this.count === 1) {
                // beginning of sequence
                this.subcount = 1
            } else {
                // middle of sequence
                this.subcount = this.count - 1
            }

            [kickChildren, snareChildren, ohChildren, chChildren].forEach((children) => {
                this.playAudio(children[this.count], 'bg-black')
                this.toggleClass(children[this.count], 'bg-black', 'bg-primary-500')
                this.toggleClass(children[this.count], 'border-4', 'border-2')
                setTimeout(() => {
                    if (children[this.subcount].classList.contains('bg-primary-500')) {
                        children[this.subcount].classList.remove('bg-primary-500')
                        children[this.subcount].classList.add('bg-black')
                    }
                    children[this.subcount].classList.remove('border-4')
                    children[this.subcount].classList.add('border-2')
                }, interval)
            })
            this.count++
        }, interval)
    }

    public static stopPlayback() {
        console.log('Stopping playback')
        SequencerStateService.setActive(false)
        this.resetSequencerState(this.kickChildren, this.snareChildren, this.ohChildren, this.chChildren)
        // this.setSequencerState()
    }

    public static resetSequencerState(kickChildren: Element[], snareChildren: Element[], ohChildren: Element[], chChildren: Element[]) {
        
        [kickChildren, snareChildren, ohChildren, chChildren].forEach((children) => {
            children.forEach((child) => {
                if (child.classList.contains('border-4')) {
                    this.addRemoveClass(child, 'border-2', 'border-4')
                }
                if (child.classList.contains('bg-primary-500')) {
                    // console.log(`Removing bg-primary-500 from ${index}`)
                    this.addRemoveClass(child, 'bg-black', 'bg-primary-500')
                }
                if (child.classList.contains('bg-black')) {
                    // console.log(`Removing bg-black from ${index}`)
                    child.classList.remove('bg-black')
                }
            })
        })
        this.setSequencerState()
    }

    private static toggleClass(element: Element, classA: string, classB: string) {
        if (element.classList.contains(classA)) {
            element.classList.remove(classA)
            element.classList.add(classB)
        } else if (element.classList.contains(classB)) {
            element.classList.remove(classB)
            element.classList.add(classA)
        }
    }

    private static addRemoveClass(element: Element, addClass: string, removeClass: string) {
        element.classList.remove(removeClass)
        element.classList.add(addClass)
    }

    private static playAudio(element: Element, activeClass: string) {
        if (element.classList.contains(activeClass)) {
            return SequencerAudioService.routeSound(element.parentElement as HTMLElement)
        }
        return
    }

}