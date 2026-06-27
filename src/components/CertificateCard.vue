<template>
  <article class="certificate-card card" :class="{ selected }">
    <span class="certificate-icon" :style="{ background: certificate.accent }">{{ certificate.icon }}</span>
    <div>
      <h3>{{ certificate.title }}</h3>
      <p>{{ certificate.completedOn }}</p>
      <span class="status-chip">{{ certificate.status }}</span>
    </div>
    <button class="icon-button" type="button">⌄</button>
  </article>
</template>

<script setup>
defineProps({
  certificate: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
});
</script>
