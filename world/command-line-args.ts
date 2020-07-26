import { cliLogLevel, LogLevel } from './command-line-logger-args';
import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));

export const cliArgs = {
  ...args,
  logLevel: cliLogLevel,
  rawCommandLine: process.argv.join(' '),
} as CliArgs;

export interface CliArgs extends ParsedArgs {
  logLevel: LogLevel;
  rawCommandLine: string;
}
