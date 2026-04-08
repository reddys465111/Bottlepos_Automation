const fs = require('fs');
const path = require('path');

/**
 * Preserve existing XML reports before Playwright runs
 * This prevents Playwright from deleting them when it cleans test-results directory
 */
function preserveReports() {
  const testResultsDir = './test-results';
  const parallelReport = path.join(testResultsDir, 'parallel-report.xml');
  const nonparallelReport = path.join(testResultsDir, 'nonparallel-report.xml');
  const backupDir = path.join(testResultsDir, '.backup');
  
  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Backup parallel report if it exists
  if (fs.existsSync(parallelReport)) {
    const backupPath = path.join(backupDir, 'parallel-report.xml');
    fs.copyFileSync(parallelReport, backupPath);
    console.log('📦 Backed up parallel-report.xml');
  }
  
  // Backup nonparallel report if it exists
  if (fs.existsSync(nonparallelReport)) {
    const backupPath = path.join(backupDir, 'nonparallel-report.xml');
    fs.copyFileSync(nonparallelReport, backupPath);
    console.log('📦 Backed up nonparallel-report.xml');
  }
}

/**
 * Restore preserved XML reports after Playwright runs
 */
function restoreReports() {
  const testResultsDir = './test-results';
  const backupDir = path.join(testResultsDir, '.backup');
  const parallelBackup = path.join(backupDir, 'parallel-report.xml');
  const nonparallelBackup = path.join(backupDir, 'nonparallel-report.xml');
  const parallelReport = path.join(testResultsDir, 'parallel-report.xml');
  const nonparallelReport = path.join(testResultsDir, 'nonparallel-report.xml');
  
  // Restore parallel report if backup exists and current doesn't
  if (fs.existsSync(parallelBackup) && !fs.existsSync(parallelReport)) {
    fs.copyFileSync(parallelBackup, parallelReport);
    console.log('📦 Restored parallel-report.xml');
  }
  
  // Restore nonparallel report if backup exists and current doesn't
  if (fs.existsSync(nonparallelBackup) && !fs.existsSync(nonparallelReport)) {
    fs.copyFileSync(nonparallelBackup, nonparallelReport);
    console.log('📦 Restored nonparallel-report.xml');
  }
  
  // Clean up backup directory
  if (fs.existsSync(backupDir)) {
    try {
      fs.rmSync(backupDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  }
}

// Export functions
module.exports = { preserveReports, restoreReports };

// If run directly, preserve reports
if (require.main === module) {
  const command = process.argv[2];
  if (command === 'preserve') {
    preserveReports();
  } else if (command === 'restore') {
    restoreReports();
  }
}
