import { SimpleMathsCalculator } from '../../domains/simple-maths/simple-maths-calculator';
import expect from 'expect';
import { Before, Given, Then, When } from 'cucumber';

Given('I have a simple maths calculator', async function () {
  this.calculator = new SimpleMathsCalculator();
});

Given('a variable set to {int}', async function (value: number) {
  this.calculator.startWith(value);
});

When('I increment the variable by {int}', async function (value: number) {
  this.calculator.incrementBy(value);
});

Then('the variable should contain {int}', async function (value: number) {
  expect(this.calculator.result).toBe(value);
});

/**
 * Before each scenario hook
 */
Before({ tags: '@foo' }, async function () {
  this.foo = true;
});
