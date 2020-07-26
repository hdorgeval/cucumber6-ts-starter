import { SimpleMathsCalculator } from '../../domains/simple-maths/simple-maths-calculator';
import { expect } from 'chai';
import { Before, Given, Then, When } from 'cucumber';

Given('I have a simple maths calculator', async function () {
  // Uncomment below line if no reporter is declared on the CLI
  // this.logger.info('Given I have a simple maths calculator');
  this.calculator = new SimpleMathsCalculator();
});

Given('a variable set to {int}', async function (value: number) {
  // Uncomment below line if no reporter is declared on the CLI
  // this.logger.info(`Given a variable set to ${value}`);
  this.calculator.startWith(value);
});

When('I increment the variable by {int}', async function (value: number) {
  // Uncomment below line if no reporter is declared on the CLI
  // this.logger.info(`When I increment the variable by ${value}`);
  this.calculator.incrementBy(value);
});

Then('the variable should contain {int}', async function (value: number) {
  // Uncomment below line if no reporter is declared on the CLI
  // this.logger.info(`Then the variable should contain ${value}`);
  expect(this.calculator.result).to.equals(value);
});

/**
 * Before each scenario hook
 */
Before({ tags: '@foo' }, async function () {
  this.foo = true;
});
