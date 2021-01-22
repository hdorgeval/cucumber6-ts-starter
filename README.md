# cucumber-ts-starter

[![Build Status](https://travis-ci.org/hdorgeval/cucumber6-ts-starter.svg?branch=master)](https://travis-ci.org/hdorgeval/cucumber6-ts-starter)
[![Build status](https://ci.appveyor.com/api/projects/status/sp6mbbyjgbw7sc9o?svg=true)](https://ci.appveyor.com/project/hdorgeval/cucumber6-ts-starter)

Starter project to write and debug cucumber-js v6 features in TypeScript language.

!!! this template is intended to work with cucumber-js v6 only. For cucumber-js v7 this template has been migrated in [cucumber7-ts-starter](https://github.com/hdorgeval/cucumber7-ts-starter) !!!

## After cloning the repo

* run the command `npm install`.

## To execute the tests locally

* run the command `npm test`.

## To debug a scenario in Visual Studio Code

* tag the scenario with `@debug`
* set the breakpoints in the typescript code
* Start debugging

## To run only specific scenarios

* tag the scenario(s) with `@only`
* run the command `npm run only`.

## To ignore a scenario

* tag the scenario with `@ignore`

## To check for typescript, linting and gherkin errors

* run the command `npm run build`.

## To view the html report of the last run

* run the command `npm run report`.

## To view the steps usage

* run the command `npm run steps-usage`.

## To create a new step

* first write the Given/When/Then sentence:
  ```gherkin
  Given I push "foo" on "bar"
  ```

* tag the scenario with `@only`

* run the npm script:
  ```sh
  npm run snippets
  ```

* the script will report the missing step(s): you just need to copy and paste them in the step definitions file:

  ```sh
  Given('I push {string} on {string}', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
  ```

## To use a custom option on the CLI

* add your custom option to the CLI that starts cucumber:
```sh
./node_modules/.bin/cucumber-js features/**/*.feature --foo=bar 
```
* use it at runtime:
```js
if (this.cliArgs.foo === 'bar') {
  // custom code for option --foo=bar
}
```

## To use a custom World Objet

* cutomize the given Custom World Object : [custom-world](world/custom-world.ts)