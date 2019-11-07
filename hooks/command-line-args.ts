import { currentLogLevel, LogLevel } from '../loggers/common-logger';
import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));

export const cliArgs = {
  ...args,
  logLevel: currentLogLevel,
  rawCommandLine: process.argv.join(' '),
} as CliArgs;

export interface CliArgs extends ParsedArgs {
  logLevel: LogLevel;
  rawCommandLine: string;
}
