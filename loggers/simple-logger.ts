import {
  defaultDataFormatter,
  defaultPrefix,
  defaultPrefixAndDataMergerForLevel,
  defaultPrefixFormatter,
  FormatterOption,
  Logger,
  LoggerData,
  LogLevel,
} from './common-logger';

export class SimpleLogger implements Logger {
  private level: LogLevel = 'error';
  private prefixTemplate: string = defaultPrefix;
  private formatterOption: FormatterOption = {
    loggerLevel: 'error',
    loggerName: this.name,
    prefixTemplate: this.prefixTemplate,
  };

  constructor(public readonly name: string) {}
  public setLevel = (level: LogLevel): SimpleLogger => {
    this.level = level;
    this.formatterOption = {
      ...this.formatterOption,
      loggerLevel: level,
    };
    return this;
  };
  public setPrefixTemplate = (template: string): SimpleLogger => {
    this.prefixTemplate = template;
    this.formatterOption = {
      ...this.formatterOption,
      prefixTemplate: template,
    };
    return this;
  };

  public setPrefixFormatter = (formatter: (option: FormatterOption) => string): SimpleLogger => {
    this.formatPrefix = formatter;
    return this;
  };

  public setDataFormatter = (formatter: (data: LoggerData) => string[]): SimpleLogger => {
    this.formatData = formatter;
    return this;
  };

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  public info = (...msg: unknown[]): void => {
    if (this.level === 'verbose') {
      const formattedData = defaultPrefixAndDataMergerForLevel(
        'verbose',
        { ...this.formatterOption },
        this.formatPrefix,
        this.formatData,
        ...msg,
      );
      // eslint-disable-next-line no-console
      formattedData.forEach((line) => console.log(line));
    }
  };

  /**
   * Output warning message to console
   *
   * @param msg any data to log to the console
   */
  public warn = (...msg: unknown[]): void => {
    if (this.level === 'verbose' || this.level === 'warn') {
      const formattedData = defaultPrefixAndDataMergerForLevel(
        'warn',
        { ...this.formatterOption },
        this.formatPrefix,
        this.formatData,
        ...msg,
      );
      // eslint-disable-next-line no-console
      formattedData.forEach((line) => console.warn(line));
    }
  };

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  public error = (...msg: unknown[]): void => {
    if (this.level === 'verbose' || this.level === 'warn' || this.level === 'error') {
      const formattedData = defaultPrefixAndDataMergerForLevel(
        'error',
        { ...this.formatterOption },
        this.formatPrefix,
        this.formatData,
        ...msg,
      );
      // eslint-disable-next-line no-console
      formattedData.forEach((line) => console.error(line));
    }
  };
  private formatPrefix: (option: FormatterOption) => string = defaultPrefixFormatter;
  private formatData: (data: LoggerData) => string[] = defaultDataFormatter;
}
