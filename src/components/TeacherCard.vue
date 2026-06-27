<template>
  <article class="teacher-card card">
    <span class="teacher-avatar">{{ teacher.initials }}</span>
    <h3>{{ teacher.name }}</h3>
    <p>{{ teacher.role }}</p>
  </article>
</template>

<script setup>
defineProps({
  teacher: {
    type: Object,
    required: true
  }
});
</script>
