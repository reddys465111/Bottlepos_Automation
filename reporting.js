const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file if it exists
require('dotenv').config({ debug: false });

// Determine which report file to use
// Priority: consolidated-report.xml > junit-report.xml > parallel-report.xml > nonparallel-report.xml
const testResultsDir = './test-results';
const consolidatedReport = path.join(testResultsDir, 'consolidated-report.xml');
const junitReport = path.join(testResultsDir, 'junit-report.xml');
const parallelReport = path.join(testResultsDir, 'parallel', 'parallel-report.xml');
const nonparallelReport = path.join(testResultsDir, 'nonparallel', 'nonparallel-report.xml');

let reportFile = null;
if (fs.existsSync(consolidatedReport)) {
    reportFile = path.resolve(consolidatedReport);
    console.log('📊 Using consolidated report');
} else if (fs.existsSync(junitReport)) {
    reportFile = path.resolve(junitReport);
    console.log('📊 Using junit report');
} else if (fs.existsSync(parallelReport)) {
    reportFile = path.resolve(parallelReport);
    console.log('📊 Using parallel report');
} else if (fs.existsSync(nonparallelReport)) {
    reportFile = path.resolve(nonparallelReport);
    console.log('📊 Using nonparallel report');
} else {
    console.error('❌ No JUnit report file found. Please run tests first.');
    console.error('   Expected files: consolidated-report.xml, junit-report.xml, parallel/parallel-report.xml, or nonparallel/nonparallel-report.xml');
    process.exit(1);
}

console.log(`📁 Report file path: ${reportFile}`);
if (!fs.existsSync(reportFile)) {
    console.error(`❌ Report file does not exist: ${reportFile}`);
    process.exit(1);
}

// Validate environment variables
if (!process.env.TR_USER || !process.env.TR_PASSWORD || !process.env.TR_PROJECT) {
    console.error('❌ Missing required environment variables:');
    if (!process.env.TR_USER) console.error('   - TR_USER');
    if (!process.env.TR_PASSWORD) console.error('   - TR_PASSWORD');
    if (!process.env.TR_PROJECT) console.error('   - TR_PROJECT');
    process.exit(1);
}

// Build command arguments as array to avoid shell interpretation of special characters
const testRailArgs = [
    '-n',
    '-h', 'https://posn.testrail.io/',
    '-u', process.env.TR_USER,
    '-p', process.env.TR_PASSWORD,
    '--project', process.env.TR_PROJECT,
    'parse_junit',
    '-f', reportFile,
    '--title', 'Playwright Automated tests',
    '--case-matcher', 'name'
];

console.log('🚀 Executing TestRail report upload...');
console.log(`📋 Command: trcli parse_junit -f "${reportFile}" ...`);

const trcliProcess = spawn('trcli', testRailArgs, { 
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'pipe']
});

let stdout = '';
let stderr = '';

trcliProcess.stdout.on('data', (data) => {
    stdout += data.toString();
});

trcliProcess.stderr.on('data', (data) => {
    stderr += data.toString();
});

trcliProcess.on('close', (code) => {
    if (code !== 0) {
        console.error('❌ Error uploading results to TestRail:');
        if (stderr) console.error('STDERR:', stderr);
        if (stdout) console.error('STDOUT:', stdout);
        process.exit(1);
    } else {
        console.log('✅ Test report uploaded successfully to TestRail');
        if (stdout) console.log(stdout);
    }
});

trcliProcess.on('error', (error) => {
    console.error('❌ Failed to start TestRail CLI:');
    console.error(error.message);
    process.exit(1);
});