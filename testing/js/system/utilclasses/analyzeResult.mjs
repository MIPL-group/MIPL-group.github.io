const AnalyzeStatus = {
    NotPredictable:0,
    NoCorrectPrediction:1,
    HasCorrectPrediction:2,
    IsCorrectPrediction:3,
    Other:4,
}

class AnalyzeResult{
    constructor() {
        this.predicted_programs = []
        this.predicted_actions = []
        this.predicted_status = []
    }
}

export {
    AnalyzeResult,
    AnalyzeStatus
}