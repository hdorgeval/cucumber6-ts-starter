import * as queryString from "querystring";
import { cliLogLevel } from "./command-line-logger-args";
export type LogLevel =
| "verbose"
| "warn"
| "error"
| "silent";

export const defaultLogLevel: LogLevel = "error";
export const currentLogLevel: LogLevel = cliLogLevel || defaultLogLevel;

const loggers: {
  [index: string]: ILogger,
} = {};

export function getLogger(name: string): ILogger {
  const foundLogger = loggers[name];
  if (foundLogger === undefined) {
    throw new Error(`Logger '${name}' has not been registered. Register your logger with the buildLogger() method`);
  }
  return foundLogger;
}

export function buildLogger<MyLogger extends ILogger>(myLogger: new (name: string) => MyLogger)  {
  return {
    withName: (name: string) => {
      const foundLogger = loggers[name] || new myLogger(name);
      loggers[name] = foundLogger;
      return {
        withLevel: (level: LogLevel) => {
          foundLogger.setLevel(level);
          return {
            withTemplatePrefix: (template: string) => {
              foundLogger.setPrefixTemplate(template);
              return {
                withPrefixFormatter: (formatter: (option: IFormatterOption) => string) => {
                  foundLogger.setPrefixFormatter(formatter);
                  return {
                    withDataFormatter: (msgFormatter: (data: ILoggerData) => string[]) => {
                      foundLogger.setDataFormatter(msgFormatter);
                    },
                  };
                },
              };
            },
          };
        },
      };
    },
  };
}

export interface ILoggerOption {
  loggerName: string;
  loggerLevel: LogLevel;
}
export interface IFormatterOption extends ILoggerOption {
  prefixTemplate: string;
}

export interface ILoggerData extends IFormatterOption {
  prefix: string;
  messages: any[];
}

export interface ILogger {
  setLevel: (level: LogLevel) => ILogger;
  setPrefixTemplate: (template: string) => ILogger;
  setPrefixFormatter: (formatter: (option: IFormatterOption) => string) => ILogger;
  setDataFormatter: (formatter: (data: ILoggerData) => string[]) => ILogger;
  name: string;

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  info: (...msg: any[]) => void;

  /**
   * Output warning message to console
   *
   * @param msg any data to log to the console
   */
  warn: (...msg: any[]) => void;

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  error: (...msg: any[]) => void;
}

// export function getLogger(name: string): ILogger {
//   buildLogger(SimpleLogger)
//     .withName("test")
//     .withLevel("verbose")
//     .withTemplatePrefix("")
//     .withPrefixFormatter(() => "")
//     .withDataFormatter(() => [""]);
//   return loggers[name];
// }

export function defaultPrefixFormatter(option: IFormatterOption): string {
  const template: string = option.prefixTemplate;
  if (template === undefined) {
    return "";
  }

  const now: Date = new Date();
  const prefix: string =
      template
        .replace("yyyy", `${now.getFullYear()}`)
        .replace("mm", month(now))
        .replace("dd", day(now))
        .replace("hh", hour(now))
        .replace("mm", minute(now))
        .replace("ss", second(now))
        .replace("L", option.loggerLevel.toLocaleUpperCase());
  return prefix;
}

function month(date: Date): string {
  const result = date.getMonth() + 1;
  if (result >= 10) {
    return `${result}`;
  }
  return `0${result}`;
}

function day(date: Date): string {
  const result = date.getDate();
  if (result >= 10) {
    return `${result}`;
  }
  return `0${result}`;
}

function hour(date: Date): string {
  const result = date.getHours();
  if (result >= 10) {
    return `${result}`;
  }
  return `0${result}`;
}

function minute(date: Date): string {
  const result = date.getMinutes();
  if (result >= 10) {
    return `${result}`;
  }
  return `0${result}`;
}

function second(date: Date): string {
  const result = date.getSeconds();
  if (result >= 10) {
    return `${result}`;
  }
  return `0${result}`;
}

export const defaultPrefix: string = "[yyyy-mm-dd][hh:mm:ss][L]";

export function defaultDataFormatter(data: ILoggerData): string[] {
  const result: string[] = [];

  const serializedMessages = data.messages.map((msg: string) => {
    if (typeof msg === "string") {
      return msg;
    }
    const serializedMessage = queryString.stringify(msg, " ", "=", {encodeURIComponent: ( s: string ) => s });
    return serializedMessage;
  });

  const message = serializedMessages
                    .join(" ")
                    .trim();

  result.push(`${data.prefix || ""} ${message}`);
  return result;
}

export function defaultPrefixAndDataMergerForLevel(logLevel: LogLevel,
                                                   formatterOption: IFormatterOption,
                                                   formatPrefix: (option: IFormatterOption) => string,
                                                   formatData: (data: ILoggerData) => string[],
                                                   ...msg: any[]): string[] {
  const option: IFormatterOption = {
    ...formatterOption,
    loggerLevel: logLevel,
  };
  const prefix = formatPrefix(option);
  const data: ILoggerData = {
    ...formatterOption,
    messages: msg,
    prefix,
  };
  const formattedData = formatData(data);
  return formattedData;
}
