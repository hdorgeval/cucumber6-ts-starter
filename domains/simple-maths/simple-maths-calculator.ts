import { CommonContext } from '../../hooks/common-hooks';
import { Logger } from '../../loggers/common-logger';
import { NoOpLogger } from '../../loggers/no-op-logger';

export class SimpleMathsCalculator implements Calculator {
  private currentValue = 0;
  private logger: Logger;
  constructor(private context: SimpleMathsContext) {
    this.logger = this.context.logger || new NoOpLogger('noop');
  }
  public startWith(value: number): Calculator {
    this.logger.info(`startWith(${value})`);
    this.currentValue = value;
    return this;
  }
  public incrementBy(value: number): Calculator {
    this.logger.info(`incrementBy(${value})`);
    this.currentValue += value;
    return this;
  }
  public get result(): number {
    this.logger.info(`get result() => ${this.currentValue}`);
    return this.currentValue;
  }
}

export interface Calculator {
  startWith: (value: number) => Calculator;
  result: number;
  incrementBy: (value: number) => Calculator;
}

export interface SimpleMathsContext extends CommonContext {
  calculator: Calculator;
}
