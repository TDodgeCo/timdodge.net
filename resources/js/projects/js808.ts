import SequencerController from './js808/SequencerController'
import SequencerStateService from './js808/SequencerStateService'
import SequencerViewService from './js808/SequencerViewService'
// import SequencerAudioService from './js808/SequencerAudioService'

/**
 * SequencerController is responsible for retrieving, capturing and routing input from the sequencer controls to the state manager and view service
 * SequencerStateService is responsible for managing the overall state of the sequencer
 * SequencerViewService is responsible for updating the view of the sequencer
 */

document.addEventListener('DOMContentLoaded', () => {
    // initialize the sequencer state and service classes
    const stateInitialized = SequencerStateService.init()
    SequencerController.preventFormSubmit()
    new SequencerViewService()

    if (stateInitialized) {
        // state is initialized with some null values. If the state successfully initializes, set the true state values from the form values
        const initialFormValues = SequencerController.getFormValues()
        SequencerStateService.setState(initialFormValues)

        // paint the sequencer with the correct state from the selected drum pattern
        SequencerViewService.setSequencerState()

        // the view service disables inputs until the state is set. Once the state is set, enable the inputs.
        SequencerViewService.enableSequencerControls()
    } else {
        throw new Error('SequencerStateService failed to initialize')
    }

    // finally, listen for changes to the form inputs
    SequencerController.formListener()
})