<template>
  <article class="lesson-card card" :class="{ active }">
    <span class="lesson-number">{{ index + 1 }}</span>
    <div>
      <h3>{{ lesson }}</h3>
      <p>{{ duration }}</p>
    </div>
    <span class="badge">{{ active ? 'Current' : 'Open' }}</span>
  </article>
</template>

<script setup>
defineProps({
  lesson: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    default: '12 min'
  },
  active: {
    type: Boolean,
    default: false
  }
});
</script>
