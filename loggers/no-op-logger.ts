import { Logger } from './common-logger';

export class NoOpLogger implements Logger {
  constructor(public readonly name: string) {}
  public setLevel = (): NoOpLogger => {
    return this;
  };
  public setPrefixTemplate = (): NoOpLogger => {
    return this;
  };

  public setPrefixFormatter = (): NoOpLogger => {
    return this;
  };

  public setDataFormatter = (): NoOpLogger => {
    return this;
  };

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public info = (): void => {};

  /**
   * Output warning message to console
   *
   * @param msg any data to log to the console
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public warn = (): void => {};

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public error = (): void => {};
}
