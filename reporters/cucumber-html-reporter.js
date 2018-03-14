const reporter = require('cucumber-html-reporter');
const options = {
    // theme: 'bootstrap', hierarchy
    theme: 'hierarchy',
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber-report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version":"1.0.0",
        "Test Environment": "STAGING",
    }
};

reporter.generate(options);