import { Before, BeforeAll } from "cucumber";
import { buildLogger, getLogger, ILogger } from "../loggers/common-logger";
import { NoOpLogger } from "../loggers/no-op-logger";
import { SimpleLogger } from "../loggers/simple-logger";
import { cliArgs, ICliArgs } from "./command-line-args";

// tslint:disable:only-arrow-functions
Before({tags: "@ignore"}, async function() {
    return "skipped";
});

Before({tags: "@debug"}, async function() {
    this.debug = true;
});

/**
 * Before each scenario hook
 */
Before({tags: "@simpleLogger"}, async function() {
    this.context = {
        ...this.context,
        cliArgs,
        logger: getLogger("@simpleLogger"),
    };
});

/**
 * Before each scenario hook
 */
Before({tags: "@simpleLogger and @debug"}, async function() {
    this.context = {
        ...this.context,
        cliArgs,
        logger: getLogger("@simpleLogger@verbose"),
    };
});

BeforeAll(async function() {
    buildLogger(SimpleLogger)
        .withName("@simpleLogger")
        .withLevel(cliArgs.logLevel);
    buildLogger(SimpleLogger)
        .withName("@simpleLogger@verbose")
        .withLevel("verbose");
    buildLogger(NoOpLogger)
        .withName("@noOpLogger");
});

export interface ICommonContext {
    cliArgs: ICliArgs;
    logger: ILogger;
}
