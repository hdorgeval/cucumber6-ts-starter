import { defaultDataFormatter, defaultPrefix, defaultPrefixAndDataMergerForLevel,
          defaultPrefixFormatter, IFormatterOption, ILogger, ILoggerData, LogLevel } from "./common-logger";
// tslint:disable:no-console
// tslint:disable:member-ordering
export class SimpleLogger implements ILogger {
  private level: LogLevel = "error";
  private prefixTemplate: string = defaultPrefix;
  private formatterOption: IFormatterOption = {
    loggerLevel: "error",
    loggerName: this.name,
    prefixTemplate: this.prefixTemplate,
  };

  constructor(public readonly name: string) {
  }
  public setLevel = (level: LogLevel) => {
    this.level = level;
    this.formatterOption = {
      ...this.formatterOption,
      loggerLevel: level,
    };
    return this;
  }
  public setPrefixTemplate = (template: string) => {
    this.prefixTemplate = template;
    this.formatterOption = {
      ...this.formatterOption,
      prefixTemplate: template,
    };
    return this;
  }

  public setPrefixFormatter = (formatter: (option: IFormatterOption) => string) => {
    this.formatPrefix = formatter;
    return this;
  }

  public setDataFormatter = (formatter: (data: ILoggerData) => string[]) => {
    this.formatData = formatter;
    return this;
  }

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  public info = (...msg: any[]) => {
    if (this.level === "verbose") {
      const formattedData = defaultPrefixAndDataMergerForLevel("verbose", {...this.formatterOption},
                                    this.formatPrefix, this.formatData, ...msg);
      formattedData.forEach((line) => console.log(line));
    }
  }

  /**
   * Output warning message to console
   *
   * @param msg any data to log to the console
   */
  public warn = (...msg: any[]) => {
    if (this.level === "verbose" || this.level === "warn") {
      const formattedData = defaultPrefixAndDataMergerForLevel("warn", {...this.formatterOption},
                                    this.formatPrefix, this.formatData, ...msg);
      formattedData.forEach((line) => console.warn(line));
    }
  }

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  public error = (...msg: any[]) => {
    if (this.level === "verbose" || this.level === "warn" || this.level === "error") {
      const formattedData = defaultPrefixAndDataMergerForLevel("error", {...this.formatterOption},
                                      this.formatPrefix, this.formatData, ...msg);
      formattedData.forEach((line) => console.error(line));
    }
  }
  private formatPrefix: ((option: IFormatterOption) => string) = defaultPrefixFormatter;
  private formatData: ((data: ILoggerData) => string[]) = defaultDataFormatter;
}
