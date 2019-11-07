import { LogLevel } from '../loggers/common-logger';
import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));

// get the command-line option --logLevel
export const cliLogLevel: LogLevel = args.logLevel;
