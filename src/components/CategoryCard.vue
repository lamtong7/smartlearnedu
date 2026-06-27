<template>
  <article class="category-card card">
    <span class="category-icon">{{ category.icon }}</span>
    <div>
      <h3>{{ category.name }}</h3>
      <p>{{ category.count }} coding courses</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>
