<template>
  <div class="calculator">
    <Display :value="state.currentInput" />
    <Keypad
      :active-operator="state.operator"
      @number="inputNumber"
      @operator="setOperator"
      @decimal="inputDecimal"
      @clear="clear"
      @toggle-sign="toggleSign"
      @percentage="percentage"
      @equals="calculate"
    />
  </div>
</template>

<script setup lang="ts">
import Display from "./Display.vue";
import Keypad from "./Keypad.vue";
import { useCalculator } from "../composables/useCalculator";

const { state, inputNumber, inputDecimal, clear, toggleSign, percentage, setOperator, calculate } =
  useCalculator();
</script>

<style scoped>
.calculator {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 480px) {
  .calculator {
    padding: 20px;
    margin: 10px;
  }
}
</style>
