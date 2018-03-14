import { IFormatterOption, ILogger, ILoggerData, LogLevel } from "./common-logger";
// tslint:disable:no-console
// tslint:disable:member-ordering
// tslint:disable:no-empty
export class NoOpLogger implements ILogger {
  constructor(public readonly name: string) {
  }
  public setLevel = (_: LogLevel) => {
    return this;
  }
  public setPrefixTemplate = (_: string) => {
    return this;
  }

  public setPrefixFormatter = (_: (option: IFormatterOption) => string) => {
    return this;
  }

  public setDataFormatter = (_: (data: ILoggerData) => string[]) => {
    return this;
  }

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  public info = (..._: any[]) => {
  }

  /**
   * Output warning message to console
   *
   * @param msg any data to log to the console
   */
  public warn = (..._: any[]) => {
  }

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  public error = (..._: any[]) => {
  }
}
