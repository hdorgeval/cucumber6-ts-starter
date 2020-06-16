import { cliLogLevel } from './command-line-logger-args';
import * as queryString from 'querystring';
export type LogLevel = 'verbose' | 'warn' | 'error' | 'silent';

export const defaultLogLevel: LogLevel = 'error';
export const currentLogLevel: LogLevel = cliLogLevel || defaultLogLevel;

const loggers: {
  [index: string]: Logger;
} = {};

export function getLogger(name: string): Logger {
  const foundLogger = loggers[name];
  if (foundLogger === undefined) {
    throw new Error(
      `Logger '${name}' has not been registered. Register your logger with the buildLogger() method`,
    );
  }
  return foundLogger;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildLogger<MyLogger extends Logger>(myLogger: new (name: string) => MyLogger) {
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
                withPrefixFormatter: (formatter: (option: FormatterOption) => string) => {
                  foundLogger.setPrefixFormatter(formatter);
                  return {
                    withDataFormatter: (msgFormatter: (data: LoggerData) => string[]) => {
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

export interface LoggerOption {
  loggerName: string;
  loggerLevel: LogLevel;
}
export interface FormatterOption extends LoggerOption {
  prefixTemplate: string;
}

export interface LoggerData extends FormatterOption {
  prefix: string;
  messages: unknown[];
}

export interface Logger {
  setLevel: (level: LogLevel) => Logger;
  setPrefixTemplate: (template: string) => Logger;
  setPrefixFormatter: (formatter: (option: FormatterOption) => string) => Logger;
  setDataFormatter: (formatter: (data: LoggerData) => string[]) => Logger;
  name: string;

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  info: (...msg: unknown[]) => void;

  /**
   * Output warning message to console
   *
   * @param msg any data to log to the console
   */
  warn: (...msg: unknown[]) => void;

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  error: (...msg: unknown[]) => void;
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
export function defaultPrefixFormatter(option: FormatterOption): string {
  const template: string = option.prefixTemplate;
  if (template === undefined) {
    return '';
  }

  const now: Date = new Date();
  const prefix: string = template
    .replace('yyyy', `${now.getFullYear()}`)
    .replace('mm', month(now))
    .replace('dd', day(now))
    .replace('hh', hour(now))
    .replace('mm', minute(now))
    .replace('ss', second(now))
    .replace('L', option.loggerLevel.toLocaleUpperCase());
  return prefix;
}

export const defaultPrefix = '[yyyy-mm-dd][hh:mm:ss][L]';

export function defaultDataFormatter(data: LoggerData): string[] {
  const result: string[] = [];

  const serializedMessages = data.messages.map((msg: unknown) => {
    if (msg === undefined) {
      return 'undefined';
    }

    if (typeof msg === 'string') {
      return msg;
    }
    const serializedMessage = queryString.stringify(
      msg as queryString.ParsedUrlQueryInput,
      ' ',
      '=',
      {
        encodeURIComponent: (s: string) => s,
      },
    );
    return serializedMessage;
  });

  const message = serializedMessages.join(' ').trim();

  result.push(`${data.prefix || ''} ${message}`);
  return result;
}

export function defaultPrefixAndDataMergerForLevel(
  logLevel: LogLevel,
  formatterOption: FormatterOption,
  formatPrefix: (option: FormatterOption) => string,
  formatData: (data: LoggerData) => string[],
  ...msg: unknown[]
): string[] {
  const option: FormatterOption = {
    ...formatterOption,
    loggerLevel: logLevel,
  };
  const prefix = formatPrefix(option);
  const data: LoggerData = {
    ...formatterOption,
    messages: msg,
    prefix,
  };
  const formattedData = formatData(data);
  return formattedData;
}
