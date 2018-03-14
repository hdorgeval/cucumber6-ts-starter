import minimist, { ParsedArgs } from "minimist";
import { currentLogLevel, LogLevel } from "../loggers/common-logger";
const args: ParsedArgs = minimist(process.argv.slice(2));

export const cliArgs  = {
  ...args,
  logLevel: currentLogLevel,
  rawCommandLine: process.argv.join(" "),
} as ICliArgs;

export interface ICliArgs extends ParsedArgs {
  logLevel: LogLevel;
  rawCommandLine: string;
}
