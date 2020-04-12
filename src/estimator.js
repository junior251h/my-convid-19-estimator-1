const covid19ImpactEstimator = (data) => {
    const Input = data;

    const beds = (0.35 * data.totalHospitalBeds);
    const income = data.region.avgDailyIncomeInUSD;
    const population = data.region.avgDailyIncomePopulation;

// Normalize timeToElapse to days 
function convertTimeToElapse (timeToElapse, period) {
    switch (periodType.toLowerCase()) {
        case 'days':
            period = timeToElapse
            break;
            case 'weeks':
            period = timeToElapse * 7
            break;
            period = timeToElapse * 30
            break;
            default:      
    }
    return Math.trunc(period)

}

    const days = data.timeToElapse;
    const factor = Math.trunc(days / 3);
    impact.currentlyInfected = data.reportedCases * 10;
    severeImpact.currentlyInfected = data.reportedCases * 50;

    impact.infectionsByRequestedTime = impact.currentlyInfected *(2 ** factor);
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
    impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
    severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

    const severeCases = severeImpact.severeCasesByRequestedTime;
    impact.hospitalBedsByRequestedTime = Math.ceil(beds - impact.severeCasesByRequestedTime);
    severeImpact.hospitalBedsByRequestedTime = Math.ceil(beds - severeCases);

    impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
    severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

    impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
    severeImpact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;

    const severeInfectionsByRequestedTime = severeImpact.infectionsByRequestedTime;
    impact.dollarInFlight = impact.infectionsByRequestedTime * income * population * days;
    severeImpact.dollarInFlight = severeInfectionsByRequestedTime * income * population * days;

  
    return {
        data: Input,
        impact: {},
        severeImpact: {}
    };
};

export default covid19ImpactEstimator;
