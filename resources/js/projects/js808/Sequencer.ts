// import { State } from "source-map-support"
import { DrumPattern } from "./data/drumPatterns"

type StepInstrumentsData = {
    intrumentIndex: number,
    instrumentName: string,
    isActive: boolean
}

interface SequencerStepData {
    stepIndex: number,
    stepInstrumentsData: StepInstrumentsData[]
}

export default class Sequencer {
    public static State_Array: SequencerStepData[] = []

    public static renderSteps(steps: number, instruments: string[], sequencerHeadRow: HTMLElement, sequencerBodyRow: HTMLElement) {
        // create the header row of the table based on the number of steps
        for (let i = 0; i < steps + 1; i++) {

            const th = document.createElement('th')
            th.classList.add('mx-2', 'px-3', 'py-3.5', 'text-xl', 'font-bold', 'text-gray-900')
            if (i === 0) {
                th.classList.add('invisible')
            }
            if (i > 0 && i < 10) {
                th.innerHTML = `<span class="invisible">0</span>${i}`
            } else {
                th.textContent = `${i}`
            }

            sequencerHeadRow.appendChild(th)
        }
        // create the tbody rows based on the number of instruments and steps
        instruments.forEach((instrument, index) => {
            const tr = document.createElement('tr')
            for (let i = 0; i <= steps; i++) {

                const td = document.createElement('td')
                if (i === 0) {
                    td.classList.add('px-3', 'py-3.5', 'text-2xl', 'font-bold', 'text-right', 'text-gray-900', 'whitespace-nowrap')
                    td.textContent = instrument.toUpperCase()
                } else {
                    td.classList.add('pxy-3', 'py-3.5', 'text-sm', 'font-medium', 'text-gray-900', 'border-2', 'border-black', 'relative', 'overflow-hidden', 'whitespace-nowrap')
                    td.id = `${index}-${i}`
                    td.innerHTML = `<div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 bg-blend-multiply opacity-0 transition cursor-cell duration-100 ease-in-out hover:opacity-80"></div>`
                    // td.innerHTML = `<div class="animate-ping hidden absolute h-full w-full rounded-full bg-sky-400 opacity-75 hover:inline-flex"></div>`
                }
                tr.appendChild(td)

            }
            sequencerBodyRow.appendChild(tr)
        })
    }

    public static createGridCellEvents(sequencerBodyRow: HTMLElement) {
        // NOTE: This is much simpler than it looks. Just adds a click event listener to each cell in the sequencer grid.
        let children = sequencerBodyRow.childNodes
        if (children) {
            children.forEach(child => {
                let sequenceRow = child.childNodes
                if (sequenceRow) {
                    sequenceRow.forEach(sequenceCell => {
                        if (sequenceCell instanceof HTMLElement) {
                            sequenceCell.addEventListener('click', () => {
                                console.log(`Sequence Cell ID: ${sequenceCell.id} clicked`)
                                sequenceCell.classList.toggle('bg-black')
                            })
                        }
                    })
                } // just realized none of this is necessary. I can just add the event listener to the table and check the target.

            })
        }
    }

    public static initializeStateArray(steps: number, instruments: string[]): SequencerStepData[] {

        for (let i = 0; i < steps; i++) {
            let stepInstrumentsData: StepInstrumentsData[] = []
            for (let j = 0; j < instruments.length; j++) {
                let stepInstrumentDataArr: StepInstrumentsData = {
                    intrumentIndex: j,
                    instrumentName: instruments[j],
                    isActive: false
                }
                stepInstrumentsData.push(stepInstrumentDataArr)
            }
            let sequencerStepData: SequencerStepData = {
                stepIndex: i,
                stepInstrumentsData: stepInstrumentsData
            }
            this.State_Array.push(sequencerStepData)
        }
        return this.State_Array
    }

    /**
     * This method is a bit of a nightmare lol
     * Basically, we're iterating over both the State_Array and the keys of the pattern object argument 
     * to see if the stepIndex is included in the sequencer pattern of the instrument of the current index.
     * If it is, we toggle the isActive property on the instrumentData object in the State_Array, 
     * and add a class to the cell in the sequencer grid. Will write another method or function to handle the 
     * view logic down the road.
     * 
     * 
     * @param stepIndex = the index of the cell columns in the sequencer grid
     * @param instrumentData = the data object for the current instrument row in the sequencer grid
     * @param pattern = the drum pattern object that we're comparing the current sequencer state to
     * @param State_Array = the current sequencer state - the source of truth for the sequencer grid
     * 
     * @returns the updated State_Array
     * 
     * This method is at the top of my list for refactoring, but for now it works well enough.
     */
    public static updateStateArray(pattern: DrumPattern): SequencerStepData[] {

        // Get the instrument names as an array of strings
        const keys = Object.keys(pattern.patterns)

        this.State_Array.forEach((step) => {
            keys.forEach((key, index) => {

                const instrumentData = step.stepInstrumentsData[index]
                pattern.patterns[key].includes(step.stepIndex)
                    ? instrumentData.isActive = instrumentData.isActive = true : instrumentData.isActive = false

                // this should really be a separate method or function
                const cell = document.getElementById(`${index}-${step.stepIndex}`)
                if (instrumentData.isActive) {
                    if (cell) {
                        cell.classList.add('bg-black')
                    }
                } else {
                    if (cell) {
                        cell.classList.remove('bg-black')
                    }
                }

            })
        })
        return this.State_Array
    }

    
        

}