import { buildLogger } from './common-logger';
import { SimpleLogger } from './simple-logger';
import { NoOpLogger } from './no-op-logger';
import { cliArgs } from '../world/command-line-args';

export * from './command-line-logger-args';
export * from './common-logger';
export * from './no-op-logger';
export * from './simple-logger';

buildLogger(SimpleLogger).withName('@simpleLogger').withLevel(cliArgs.logLevel);
buildLogger(SimpleLogger).withName('@simpleLogger@verbose').withLevel('verbose');
buildLogger(NoOpLogger).withName('@noOpLogger');
