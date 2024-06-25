type DrumPattern = {
    id: number
    name: string
    bpm: number
    patterns: {
        kick: number[]
        snare: number[]
        closedHat: number[]
        openHat: number[]
    }
}

const DrumPatterns: DrumPattern[] = [
    {
        id: 1,
        name: '2 Step',
        bpm: 174,
        patterns: {
            kick: [1, 11],
            snare: [5, 13],
            closedHat: [1, 3, 5, 7, 9, 11, 13, 15],
            openHat: [2, 12]
        }
    },
    {
        id: 2,
        name: 'Steppa',
        bpm: 170,
        patterns: {
            kick: [1],
            snare: [5, 10],
            closedHat: [1, 3, 5, 7, 9, 11, 13, 15],
            openHat: [2, 11]
        }
    },
    {
        id: 3,
        name: '4 on the Floor',
        bpm: 145,
        patterns: {
            kick: [1, 5, 9, 13],
            snare: [5, 13],
            closedHat: [1, 5, 9, 13],
            openHat: [3, 7, 11, 15]
        }
    }
]

export default DrumPatterns

export type { DrumPattern }