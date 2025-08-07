<template>
  <div class="display">
    <div class="display-text">{{ displayValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: string;
}

const props = defineProps<Props>();

function formatNumber(num: string): string {
  if (num === "") return "0";

  const numFloat = parseFloat(num);
  if (Math.abs(numFloat) >= 1e21 || (Math.abs(numFloat) < 1e-6 && numFloat !== 0)) {
    return numFloat.toExponential(2);
  }

  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const displayValue = computed(() => formatNumber(props.value));
</script>

<style scoped>
.display {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px 20px;
  margin-bottom: 25px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.display-text {
  color: white;
  font-family: sans-serif;
  font-size: 3rem;
  font-weight: 300;
  text-align: right;
  word-break: break-all;
  line-height: 1.2;
}

@media (max-width: 480px) {
  .display-text {
    font-size: 2.5rem;
  }
}
</style>
