import { Before, BeforeAll } from "cucumber";
import { buildLogger, ILogger } from "../loggers/common-logger";
import { NoOpLogger } from "../loggers/no-op-logger";
import { SimpleLogger } from "../loggers/simple-logger";
import { cliArgs, ICliArgs } from "./command-line-args";

// tslint:disable:only-arrow-functions
Before({tags: "@ignore"}, async function() {
    return "skipped";
});

BeforeAll(async function() {
    buildLogger(SimpleLogger)
        .withName("@simpleLogger")
        .withLevel(cliArgs.logLevel);
    buildLogger(NoOpLogger)
        .withName("@noOpLogger");
});

export interface ICommonContext {
    cliArgs: ICliArgs;
    logger: ILogger;
}