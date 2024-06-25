import Sequencer from './js808/Sequencer'
import DrumPatterns from './js808/data/drumPatterns'
import { DrumPattern } from "./js808/data/drumPatterns"

document.addEventListener('DOMContentLoaded', () => {
    const stepsInput = document.getElementById('stepsInput') as HTMLInputElement
    let steps = Number(stepsInput.value)
    let instruments = ['kick', 'snare', 'closedHat', 'openHat']
    const controlsForm = document.getElementById('controlsForm') as HTMLFormElement
    const sequencerHeadRow = document.getElementById('sequencerHeadRow') as HTMLElement
    const sequencerBodyRow = document.getElementById('sequencerBodyRow') as HTMLElement
    const patternIdInput = document.getElementById('patternIdInput') as HTMLInputElement
    const playButton = document.getElementById('playButton') as HTMLButtonElement
    const stopButton = document.getElementById('stopButton') as HTMLButtonElement

    if (sequencerHeadRow && sequencerBodyRow) {

        preventFormSubmit(controlsForm)

        Sequencer.initializeStateArray(steps, instruments)
        Sequencer.renderSteps(steps, instruments, sequencerHeadRow, sequencerBodyRow)
        Sequencer.createGridCellEvents(sequencerBodyRow)

        const patternData = getPatternData(Number(patternIdInput.value)) as DrumPattern

        const updatedGridState = Sequencer.updateStateArray(patternData)

        if (updatedGridState) {
            enableFormControls()
        }

    }

    function preventFormSubmit(form: HTMLFormElement) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        })
    }

    function getPatternData(patternId: number) {
        
        const pattern = DrumPatterns.find(pattern => pattern.id === patternId)

        if (!pattern) {
            console.error('Pattern not found')
            return
        }

        return pattern
    }

    function enableFormControls() {
        if (controlsForm.hasChildNodes()) {
            controlsForm.querySelectorAll('button').forEach(button => { 
                button.disabled = false
            })
            controlsForm.querySelectorAll('input').forEach(input => { 
                input.disabled = false
            })
            controlsForm.querySelectorAll('select').forEach(select => {
                select.disabled = false
            })       
        }
    }

    stepsInput.addEventListener('input', () => {
        steps = Number(stepsInput.value)
        sequencerHeadRow.innerHTML = ''
        sequencerBodyRow.innerHTML = ''
        Sequencer.renderSteps(steps, instruments, sequencerHeadRow, sequencerBodyRow)
        Sequencer.createGridCellEvents(sequencerBodyRow)
    })

    patternIdInput.addEventListener('input', () => {
        const patternData = getPatternData(Number(patternIdInput.value)) as DrumPattern
        const updatedGridState = Sequencer.updateStateArray(patternData)
        console.log('updatedGridState', updatedGridState)
        console.log('State_Array',Sequencer.State_Array)
    })

    playButton.addEventListener('click', () => {
        console.log('Play button clicked')
    })

    stopButton.addEventListener('click', () => {
        console.log('Stop button clicked')
    })

})


