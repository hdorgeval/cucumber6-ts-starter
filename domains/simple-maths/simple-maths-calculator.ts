export class SimpleMathsCalculator implements Calculator {
  private currentValue = 0;

  public startWith(value: number): Calculator {
    this.currentValue = value;
    return this;
  }
  public incrementBy(value: number): Calculator {
    this.currentValue += value;
    return this;
  }
  public get result(): number {
    return this.currentValue;
  }
}

export interface Calculator {
  startWith: (value: number) => Calculator;
  result: number;
  incrementBy: (value: number) => Calculator;
}
