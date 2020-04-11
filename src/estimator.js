const covid19ImpactEstimator = (data) => {
    const Input = data;

    const days = data.timeToElapse;
    const factor = Math.trunc(days / 3);
    impact.currentlyInfected = data.reportedCases * 10;
    severeImpact.currentlyInfected = data.reportedCases * 50;

    impact.infectionsByRequestedTime = impact.currentlyInfected *(2 ** factor);
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
    impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
    severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

    if (data.periodType === 'weeks') {
        data.timeToElapse *= 7;
    } else if (data.periodType === 'months') {
        data.timeToElapse *= 30;
    }

  
    return {
        data: Input,
        impact: {},
        severeImpact: {}
    };
};

export default covid19ImpactEstimator;
