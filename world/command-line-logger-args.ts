import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));

export type LogLevel = 'verbose' | 'warn' | 'error' | 'silent';

// get the command-line option --logLevel
export const cliLogLevel: LogLevel = args.logLevel || 'silent';
