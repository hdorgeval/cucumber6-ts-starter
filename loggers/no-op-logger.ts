import { Logger } from './common-logger';

export class NoOpLogger implements Logger {
  constructor(public readonly name: string) {}
  public setLevel = () => {
    return this;
  };
  public setPrefixTemplate = () => {
    return this;
  };

  public setPrefixFormatter = () => {
    return this;
  };

  public setDataFormatter = () => {
    return this;
  };

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public info = () => {};

  /**
   * Output warning message to console
   *
   * @param msg any data to log to the console
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public warn = () => {};

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public error = () => {};
}
