<template>
  <button :class="buttonClasses" @click="handleClick">
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type ButtonType = "number" | "operator" | "function";

interface Props {
  label: string;
  type: ButtonType;
  isWide?: boolean;
  isActive?: boolean;
}

interface Emits {
  click: [value: string];
}

const props = withDefaults(defineProps<Props>(), {
  isWide: false,
  isActive: false,
});

const emit = defineEmits<Emits>();

const buttonClasses = computed(() => [
  "btn",
  `btn-${props.type}`,
  {
    "btn-zero": props.isWide,
    active: props.isActive,
  },
]);

function handleClick(): void {
  emit("click", props.label);
}
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 15px;
  font-size: 1.5rem;
  font-weight: 400;
  height: 70px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-family: sans-serif;
  position: relative;
  overflow: hidden;
}

.btn:hover {
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}

.btn-number {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-number:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-operator {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  font-weight: 500;
}

.btn-operator:hover {
  background: linear-gradient(135deg, #ff5252, #e55100);
}

.btn-operator.active {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.btn-function {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: 500;
}

.btn-function:hover {
  background: rgba(255, 255, 255, 0.25);
}

.btn-zero {
  grid-column: span 2;
}

.btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition:
    width 0.6s,
    height 0.6s;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.btn:active::before {
  width: 300px;
  height: 300px;
}

.btn span {
  position: relative;
  z-index: 1;
}

@media (max-width: 480px) {
  .btn {
    height: 60px;
    font-size: 1.3rem;
  }
}
</style>
