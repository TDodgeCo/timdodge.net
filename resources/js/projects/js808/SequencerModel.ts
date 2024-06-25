import DrumPatterns from "./data/drumPatterns"

export default class SequencerModel {
    
    public static getPattern(patternId: number) {
        const drumPattern = DrumPatterns.find((p) => p.id === patternId)
        if (!drumPattern) {
            throw new Error('Could not find the pattern')
        }
        return drumPattern
    }
    
    public static storePattern() {

    }
    
}