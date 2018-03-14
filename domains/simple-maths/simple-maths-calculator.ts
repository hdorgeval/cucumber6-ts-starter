import { ICommonContext } from "../../hooks/common-hooks";
import { ILogger } from "../../loggers/common-logger";
import { NoOpLogger } from "../../loggers/no-op-logger";

export class SimpleMathsCalculator implements ICalculator {
    private currentValue: number = 0;
    private logger: ILogger;
    constructor(private context: ISimpleMathsContext) {
        this.logger = this.context.logger || new NoOpLogger("noop");
    }
    public startWith(value: number): ICalculator {
        this.logger.info(`startWith(${value})`);
        this.currentValue = value;
        return this;
    }
    public incrementBy(value: number): ICalculator {
        this.logger.info(`incrementBy(${value})`);
        this.currentValue += value;
        return this;
    }
    public get result(): number {
        this.logger.info(`get result() => ${this.currentValue}`);
        return this.currentValue;
    }
  }

export interface ICalculator {
      startWith: (value: number) => ICalculator;
      result: number;
      incrementBy: (value: number) => ICalculator;
  }

export interface ISimpleMathsContext extends ICommonContext {
    calculator: ICalculator;
}
