const { exec } = require('child_process');

const testRailCommand = 'trcli -n -h "https://posn.testrail.io/" -u "'+process.env.TR_USER+'" -p "'+process.env.TR_PASSWORD+'" --project "'+process.env.TR_PROJECT+'" parse_junit -f "test-results/junit-report.xml" --title "Playwright Automated tests"  --case-matcher "name"';

console.log('Executing report');
exec(testRailCommand, (error, stdout, stderr) => {
    if(error){
        console.error('error trying to upload the results to testrail');
    }else{
        console.log('test report uploaded');
    }
})

console.log('Rerporting complete');