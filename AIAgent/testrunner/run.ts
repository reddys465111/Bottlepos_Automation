import { execSync } from "child_process";
import fs from "fs";
import { saveFailure } from "../llm/rag";
import { classifyFailure } from "../analyzer/failureClassifier";

const testPath =
  process.argv[2] ||
  process.env.TEST_PATH || "";

const retryOnly = process.env.RETRY_ONLY === "true";

console.log(
  "🚀 Starting test run:",
  retryOnly ? "Failed tests only" : (testPath || "All tests")
);

// 📥 Get failed tests from Playwright JSON report
function getFailedTests(): string[] {
  const reportPath = "test-results/parallel/results.json";

  if (!fs.existsSync(reportPath)) {
    console.log("⚠️ No results.json found");
    return [];
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

  const failed: string[] = [];

  for (const suite of report.suites || []) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        if (test.status === "failed") {
          // ✅ Use test.title (more precise than spec.title)
          failed.push(test.title);
        }
      }
    }
  }

  console.log("❌ FAILED TESTS:", failed);
  return failed;
}

// 🔐 Escape regex special chars (VERY IMPORTANT)
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ▶ Run Playwright tests
function runTest(failedOnly: boolean = false) {
  let command = "";

  if (failedOnly) {
    const failedTests = getFailedTests();

    if (failedTests.length === 0) {
      console.log("✅ No failed tests to re-run");
      return;
    }

    const grepPattern = failedTests
      .map(escapeRegex)
      .join("|");

    command = `npx playwright test -c playwright.parallel.config.ts --grep='${grepPattern}'`;

    console.log("🔁 Re-running failed tests with grep:", grepPattern);
  } else {
    command = `npx playwright test -c playwright.parallel.config.ts`;
    console.log("▶ Running full test suite...");
  }

  execSync(command, {
    stdio: "inherit",
  });
}

// 🧠 MAIN EXECUTION
(async () => {
  try {
    if (!retryOnly) {
      // ✅ First run (ALL tests)
      runTest(false);
      console.log("✅ Initial run completed");
    } else {
      // ✅ Retry ONLY failed tests
      runTest(true);
      console.log("🔁 Retry run completed");
      process.exit(0);
    }

  } catch (error: any) {
    console.log("❌ Tests failed");

    const failure = {
      type: "UNKNOWN",
      message: error.message,
      testPath: testPath || "ALL",
      time: new Date().toISOString(),
    };

    // 💾 Save last failure
    fs.mkdirSync("agent/failures", { recursive: true });
    fs.writeFileSync(
      "agent/failures/last-failure.json",
      JSON.stringify(failure, null, 2)
    );

    //  Save to RAG memory
    saveFailure(JSON.stringify(failure));

    // 🔍 Classify failure
    const classification = classifyFailure(failure.message);
    console.log(" Failure type:", classification.type);

    if (classification.type === "LOCATOR") {
      console.log("🛠 Locator issue detected → healing will trigger in retry");
    } else {
      console.log("⚠️ Non-locator failure");
    }

    // 🔁 Retry ONLY failed tests
    try {
      runTest(true);
    } catch {
      console.log("❌ Re-run still failing");
    }

    process.exit(1);
  }
})();