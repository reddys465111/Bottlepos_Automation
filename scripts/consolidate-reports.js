const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Consolidate JUnit reports from parallel and non-parallel test runs
 * This version ensures ALL tests are included without any filtering
 */
function consolidateReports() {
  const testResultsDir = './test-results';
  const parallelReport = path.join(testResultsDir, 'parallel-report.xml');
  const nonparallelReport = path.join(testResultsDir, 'nonparallel-report.xml');
  const consolidatedReport = path.join(testResultsDir, 'consolidated-report.xml');
  
  // Ensure test-results directory exists
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }

  // Check if both reports exist
  const parallelExists = fs.existsSync(parallelReport);
  const nonparallelExists = fs.existsSync(nonparallelReport);

  if (!parallelExists && !nonparallelExists) {
    console.log('⚠️  No reports found to consolidate');
    return;
  }

  let consolidatedContent = '';
  let totalTests = 0;
  let totalFailures = 0;
  let totalErrors = 0;
  let totalSkipped = 0;
  let totalTime = 0;
  
  // Start with testsuites wrapper
  consolidatedContent += '<?xml version="1.0" encoding="UTF-8"?>\n';
  consolidatedContent += '<testsuites>\n';

  // Add parallel report if it exists
  if (parallelExists) {
    console.log('📊 Adding parallel test results...');
    const parallelContent = fs.readFileSync(parallelReport, 'utf8');
    
    // Extract all testsuite content (handle multiple testsuites)
    const testsuiteMatches = parallelContent.match(/<testsuite[^>]*>[\s\S]*?<\/testsuite>/g);
    if (testsuiteMatches) {
      consolidatedContent += '  <!-- Parallel Tests -->\n';
      testsuiteMatches.forEach(testsuite => {
        consolidatedContent += '  ' + testsuite + '\n';
        
        // Extract stats from testsuite
        const testsMatch = testsuite.match(/tests="(\d+)"/);
        const failuresMatch = testsuite.match(/failures="(\d+)"/);
        const errorsMatch = testsuite.match(/errors="(\d+)"/);
        const skippedMatch = testsuite.match(/skipped="(\d+)"/);
        const timeMatch = testsuite.match(/time="([\d.]+)"/);
        
        if (testsMatch) totalTests += parseInt(testsMatch[1]);
        if (failuresMatch) totalFailures += parseInt(failuresMatch[1]);
        if (errorsMatch) totalErrors += parseInt(errorsMatch[1]);
        if (skippedMatch) totalSkipped += parseInt(skippedMatch[1]);
        if (timeMatch) totalTime += parseFloat(timeMatch[1]);
      });
    }
  }

  // Add non-parallel report if it exists
  if (nonparallelExists) {
    console.log('📊 Adding non-parallel test results...');
    const nonparallelContent = fs.readFileSync(nonparallelReport, 'utf8');
    
    // Extract all testsuite content (handle multiple testsuites)
    const testsuiteMatches = nonparallelContent.match(/<testsuite[^>]*>[\s\S]*?<\/testsuite>/g);
    if (testsuiteMatches) {
      consolidatedContent += '  <!-- Non-Parallel Tests -->\n';
      testsuiteMatches.forEach(testsuite => {
        consolidatedContent += '  ' + testsuite + '\n';
        
        // Extract stats from testsuite
        const testsMatch = testsuite.match(/tests="(\d+)"/);
        const failuresMatch = testsuite.match(/failures="(\d+)"/);
        const errorsMatch = testsuite.match(/errors="(\d+)"/);
        const skippedMatch = testsuite.match(/skipped="(\d+)"/);
        const timeMatch = testsuite.match(/time="([\d.]+)"/);
        
        if (testsMatch) totalTests += parseInt(testsMatch[1]);
        if (failuresMatch) totalFailures += parseInt(failuresMatch[1]);
        if (errorsMatch) totalErrors += parseInt(errorsMatch[1]);
        if (skippedMatch) totalSkipped += parseInt(skippedMatch[1]);
        if (timeMatch) totalTime += parseFloat(timeMatch[1]);
      });
    }
  }

  // Close testsuites wrapper
  consolidatedContent += '</testsuites>\n';

  // Write consolidated report
  fs.writeFileSync(consolidatedReport, consolidatedContent);
  console.log('✅ Consolidated report created: ' + consolidatedReport);
  console.log(`📈 Total Tests: ${totalTests}, Failures: ${totalFailures}, Errors: ${totalErrors}, Skipped: ${totalSkipped}, Time: ${totalTime.toFixed(2)}s`);

  // Create a simple HTML summary
  createHtmlSummary();
}

/**
 * Create a simple HTML summary of test results
 */
function createHtmlSummary() {
  const testResultsDir = './test-results';
  const htmlSummary = path.join(testResultsDir, 'test-summary.html');
  
  const parallelExists = fs.existsSync(path.join(testResultsDir, 'parallel-report.xml'));
  const nonparallelExists = fs.existsSync(path.join(testResultsDir, 'nonparallel-report.xml'));
  
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Test Results Summary</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background-color: #f0f0f0; padding: 10px; border-radius: 5px; }
        .section { margin: 20px 0; }
        .link { color: #0066cc; text-decoration: none; }
        .link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 Test Results Summary</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="section">
        <h2>📊 Reports Available</h2>
        <ul>
`;


    htmlContent += `
            <li>
                <a href="../reports/parallel-html/index.html" class="link">📈 Parallel Tests HTML Report</a>
                <br><small>JUnit XML: <a href="parallel-report.xml" class="link">parallel-report.xml</a></small>
            </li>`;
  


    htmlContent += `
            <li>
                <a href="../reports/nonparallel-html/index.html" class="link">📋 Non-Parallel Tests HTML Report</a>
                <br><small>JUnit XML: <a href="nonparallel-report.xml" class="link">nonparallel-report.xml</a></small>
            </li>`;
  

  htmlContent += `
        </ul>
    </div>
    
   
    <div class="section">
        <h2>🚀 Quick Actions</h2>
        <p>
            
            <a href="consolidated-report.xml" class="link">Download Consolidated XML</a>
        </p>
    </div>
</body>
</html>`;

  fs.writeFileSync(htmlSummary, htmlContent);
  console.log('📄 HTML summary created: ' + htmlSummary);
}

// Run consolidation if this script is executed directly
if (require.main === module) {
  consolidateReports();
}

module.exports = { consolidateReports, createHtmlSummary };
