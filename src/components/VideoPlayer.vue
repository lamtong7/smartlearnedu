<template>
  <div class="video-player" :class="{ playing: isPlaying }">
    <div v-if="!isPlaying" class="video-poster" :class="course.imageClass">
      <button class="play-main" type="button" aria-label="Play lesson" @click="isPlaying = true">▶</button>
      <span class="course-icon" :style="{ color: course.accent }">{{ course.icon }}</span>
    </div>
    <video v-else controls autoplay preload="metadata">
      <source :src="source" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true
  },
  src: {
    type: String,
    default: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  }
});

const isPlaying = ref(false);
const source = computed(() => props.course.videoUrl || props.src);
</script>
