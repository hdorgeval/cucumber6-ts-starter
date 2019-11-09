# cucumber-ts-starter
Starter project to write and debug cucumber-js features in TypeScript language.

## After cloning the repo

* run the command `npm install`.

## To execute the tests locally

* run the command `npm test`.

## To debug a scenario in Visual Studio Code

* tag the scenario with `@only` and `@debug`
* set the breakpoints in the typescript code
* Start debugging

## To run only specific scenarios

* tag the scenario(s) with `@only`

## To ignore a scenario

* tag the scenario with `@ignore`

## To check for typescript and linting errors

* run the command `npm run build`.

## To view the html report of the last run

* run the command `npm run report`.

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