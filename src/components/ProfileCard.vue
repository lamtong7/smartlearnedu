<template>
  <article class="profile-card card">
    <div class="profile-hero">
      <div class="profile-avatar">{{ initials }}</div>
      <div>
        <h2>{{ name }}</h2>
        <span class="badge">{{ level }}</span>
        <p>{{ email }}</p>
        <p>{{ location }}</p>
      </div>
    </div>
    <blockquote>{{ quote }}</blockquote>
  </article>
</template>

<script setup>
defineProps({
  initials: {
    type: String,
    default: 'DS'
  },
  name: {
    type: String,
    default: 'Dev San'
  },
  level: {
    type: String,
    default: 'Beginner'
  },
  email: {
    type: String,
    default: 'devsan@gmail.com'
  },
  location: {
    type: String,
    default: 'Kampong Cham, Cambodia'
  },
  quote: {
    type: String,
    default: 'Learning never exhausts the mind.'
  }
});
</script>
