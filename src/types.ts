export type Operator = "+" | "-" | "×" | "÷" | "";

export interface CalculatorState {
  currentInput: string;
  previousInput: string;
  operator: Operator;
  waitingForNewInput: boolean;
}

export const INITIAL_STATE: CalculatorState = {
  currentInput: "0",
  previousInput: "",
  operator: "",
  waitingForNewInput: false,
};
