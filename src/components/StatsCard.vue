<template>
  <article class="stats-card card">
    <span class="stats-icon">{{ stat.icon }}</span>
    <b>{{ stat.value }}</b>
    <small>{{ stat.label }}</small>
  </article>
</template>

<script setup>
defineProps({
  stat: {
    type: Object,
    required: true
  }
});
</script>
