import {expect} from "chai";
import { Before, Given, Then, When } from "cucumber";
import { ISimpleMathsContext, SimpleMathsCalculator } from "../../domains/simple-maths/simple-maths-calculator";

// tslint:disable:only-arrow-functions

Given("I have a simple maths calculator", async function() {
    const ctx: ISimpleMathsContext = this.context;
    ctx.logger.info("Given I have a simple maths calculator");
    this.context.calculator = new SimpleMathsCalculator(ctx);
});

Given("a variable set to {int}", async function(value: number) {
    const ctx: ISimpleMathsContext = this.context;
    ctx.logger.info(`Given a variable set to ${value}`);
    ctx.calculator.startWith(value);
});

When("I increment the variable by {int}", async function(value: number) {
    const ctx: ISimpleMathsContext = this.context;
    ctx.logger.info(`When I increment the variable by ${value}`);
    ctx.calculator.incrementBy(value);
  });

Then("the variable should contain {int}", async function(value: number) {
    const ctx: ISimpleMathsContext = this.context;
    ctx.logger.info(`Then the variable should contain ${value}`);
    expect(ctx.calculator.result).equals(value);
  });

/**
 * Before each scenario hook
 */
Before({tags: "@foo"}, async function() {
    this.foo = true;
});
