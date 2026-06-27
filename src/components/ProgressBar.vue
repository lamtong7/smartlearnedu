<template>
  <div class="progress-wrap">
    <div class="progress-track">
      <span class="progress-fill" :style="{ width: `${value}%`, background: color }"></span>
    </div>
    <div v-if="showLabel" class="progress-label">
      <span>{{ label }}</span>
      <span>{{ value }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: 'Progress'
  },
  color: {
    type: String,
    default: 'linear-gradient(90deg, #8b5cf6, #2563eb)'
  },
  showLabel: {
    type: Boolean,
    default: true
  }
});
</script>
