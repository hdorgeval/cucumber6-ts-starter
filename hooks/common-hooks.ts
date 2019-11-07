import { cliArgs, CliArgs } from './command-line-args';
import { buildLogger, getLogger, Logger } from '../loggers/common-logger';
import { NoOpLogger } from '../loggers/no-op-logger';
import { SimpleLogger } from '../loggers/simple-logger';
import { Before, BeforeAll } from 'cucumber';

Before({ tags: '@ignore' }, async function() {
  return 'skipped';
});

Before({ tags: '@debug' }, async function() {
  this.debug = true;
});

/**
 * Before each scenario hook
 */
Before({ tags: '@simpleLogger' }, async function() {
  this.context = {
    ...this.context,
    cliArgs,
    logger: getLogger('@simpleLogger'),
  };
});

/**
 * Before each scenario hook
 */
Before({ tags: '@simpleLogger and @debug' }, async function() {
  this.context = {
    ...this.context,
    cliArgs,
    logger: getLogger('@simpleLogger@verbose'),
  };
});

BeforeAll(async function() {
  buildLogger(SimpleLogger)
    .withName('@simpleLogger')
    .withLevel(cliArgs.logLevel);
  buildLogger(SimpleLogger)
    .withName('@simpleLogger@verbose')
    .withLevel('verbose');
  buildLogger(NoOpLogger).withName('@noOpLogger');
});

export interface CommonContext {
  cliArgs: CliArgs;
  logger: Logger;
}
