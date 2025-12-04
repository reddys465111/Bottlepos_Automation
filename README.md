# BottlePOS Automation with Playwright

This project automates tests for BottlePOS using Playwright.

## Installation
### Prerequisites:
install NodeJS
install Git

After downloading/cloning the project navigate to the root directory of the project and execute the following command
```sh
npm install
```

## Running Tests
### Prerequisites:

Playwright must be have installed the browsers by using:
```sh
npx playwright install 
```

## Running Tests:
Navigate to the root directory of the project and execute the following command:

```sh
npx playwright test tests/
```

This command instructs Playwright to discover and run all test files within the tests folder. Playwright will default to running tests in headless mode (browser window is hidden).

## Run with a visible browser:
by default playwright run headless, to disabled headless mode add the headed parameter in the command
```sh
npx playwright test tests/ --headed
```

## Specify a different browser:
```sh
npx playwright test tests/ --project=chromium
```
(Replace chromium with your desired browser - options are defined in playwright.config.ts)

## Using filters
```sh
npx playwright test tests/ --debug --grep "@smoke"
```

## Using multiple filters
Run multiple test by using logical && and || operators
```sh
npx playwright test tests/  --grep "@smoke&&@cash" --debug
```
# Local Report
To generate a new report (ignoring the setup test) run the following command
this will execute all the tests that do not match with the tags: setup and api
```sh
 npx playwright test --reporter=html --grep-invert "@setup&&@api"
```

or

Generate a report from an existing execution
```sh
npx playwright show-report
```
# Reporting to TestRail
## Prerequisites:
Have installed Python
A TestRail account with appropriate access.
trcli library installed globally:
```sh
$ pip install trcli
```

Run the playwright tests

```sh
$ npx playwright test
```
Send the results to TestRail

```sh
$ trcli -n `
-h "https://posn.testrail.io/" `
-u "username@posnation.com" `
-p "password" `
--project "Bottle3" `
parse_junit `
-f "test-results/junit-report.xml" `
--title "Playwright Automated tests" `
 --case-matcher "name"
 ```
