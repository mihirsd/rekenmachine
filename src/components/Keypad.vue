<template>
  <div class="buttons">
    <!-- First row -->
    <Button label="C" type="function" @click="emit('clear')" />
    <Button label="±" type="function" @click="emit('toggleSign')" />
    <Button label="%" type="function" @click="emit('percentage')" />
    <Button label="÷" type="operator" :is-active="activeOperator === '÷'" @click="emit('operator', '÷')" />

    <!-- Second row -->
    <Button label="7" type="number" @click="emit('number', '7')" />
    <Button label="8" type="number" @click="emit('number', '8')" />
    <Button label="9" type="number" @click="emit('number', '9')" />
    <Button label="×" type="operator" :is-active="activeOperator === '×'" @click="emit('operator', '×')" />

    <!-- Third row -->
    <Button label="4" type="number" @click="emit('number', '4')" />
    <Button label="5" type="number" @click="emit('number', '5')" />
    <Button label="6" type="number" @click="emit('number', '6')" />
    <Button label="−" type="operator" :is-active="activeOperator === '-'" @click="emit('operator', '-')" />

    <!-- Fourth row -->
    <Button label="1" type="number" @click="emit('number', '1')" />
    <Button label="2" type="number" @click="emit('number', '2')" />
    <Button label="3" type="number" @click="emit('number', '3')" />
    <Button label="+" type="operator" :is-active="activeOperator === '+'" @click="emit('operator', '+')" />

    <!-- Fifth row -->
    <Button label="0" type="number" :is-wide="true" @click="emit('number', '0')" />
    <Button label="." type="number" @click="emit('decimal')" />
    <Button label="=" type="operator" @click="emit('equals')" />
  </div>
</template>

<script setup lang="ts">
import type { Operator } from "../types";
import Button from "./Button.vue";

interface Props {
  activeOperator: string;
}

interface Emits {
  number: [value: string];
  operator: [value: Operator];
  decimal: [];
  clear: [];
  toggleSign: [];
  percentage: [];
  equals: [];
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
</style>
