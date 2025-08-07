import { ref, onMounted, onUnmounted } from "vue";
import type { Operator, CalculatorState } from "../types";
import { INITIAL_STATE } from "../types";

export function useCalculator() {
  const state = ref<CalculatorState>({ ...INITIAL_STATE });

  function inputNumber(num: string): void {
    if (state.value.waitingForNewInput) {
      state.value.currentInput = num;
      state.value.waitingForNewInput = false;
    } else {
      state.value.currentInput = state.value.currentInput === "0" ? num : state.value.currentInput + num;
    }
  }

  function inputDecimal(): void {
    if (state.value.waitingForNewInput) {
      state.value.currentInput = "0.";
      state.value.waitingForNewInput = false;
    } else if (state.value.currentInput.indexOf(".") === -1) {
      state.value.currentInput += ".";
    }
  }

  function clear(): void {
    state.value = { ...INITIAL_STATE };
  }

  function toggleSign(): void {
    if (state.value.currentInput !== "0") {
      state.value.currentInput = state.value.currentInput.startsWith("-")
        ? state.value.currentInput.slice(1)
        : "-" + state.value.currentInput;
    }
  }

  function percentage(): void {
    const value = parseFloat(state.value.currentInput.replace(/,/g, "")) / 100;
    state.value.currentInput = value.toString();
  }

  function setOperator(op: Operator): void {
    if (state.value.previousInput !== "" && state.value.operator !== "" && !state.value.waitingForNewInput) {
      calculate();
    }

    state.value.previousInput = state.value.currentInput.replace(/,/g, "");
    state.value.operator = op;
    state.value.waitingForNewInput = true;
  }

  function calculate(): void {
    if (state.value.previousInput === "" || state.value.operator === "" || state.value.waitingForNewInput) {
      return;
    }

    const prev = parseFloat(state.value.previousInput);
    const current = parseFloat(state.value.currentInput.replace(/,/g, ""));
    let result: number;

    switch (state.value.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = current !== 0 ? prev / current : NaN;
        break;
      default:
        return;
    }

    if (isNaN(result) || !isFinite(result)) {
      state.value.currentInput = "Error";
    } else {
      // Round to avoid floating point precision issues
      result = Math.round((result + Number.EPSILON) * 100000000000000) / 100000000000000;
      state.value.currentInput = result.toString();
    }

    state.value.previousInput = "";
    state.value.operator = "";
    state.value.waitingForNewInput = true;
  }

  // Keyboard support
  function handleKeydown(e: KeyboardEvent): void {
    e.preventDefault();

    if (e.key >= "0" && e.key <= "9") {
      inputNumber(e.key);
    } else if (e.key === ".") {
      inputDecimal();
    } else if (e.key === "+") {
      setOperator("+");
    } else if (e.key === "-") {
      setOperator("-");
    } else if (e.key === "*") {
      setOperator("×");
    } else if (e.key === "/") {
      setOperator("÷");
    } else if (e.key === "Enter" || e.key === "=") {
      calculate();
    } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
      clear();
    } else if (e.key === "%") {
      percentage();
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });

  return {
    state,
    inputNumber,
    inputDecimal,
    clear,
    toggleSign,
    percentage,
    setOperator,
    calculate,
  };
}
