<template>
  <article class="course-card card">
    <RouterLink class="course-cover" :class="course.imageClass" :to="`/courses/${course.id}`">
      <span class="course-bookmark">▱</span>
      <span class="course-image-frame">
        <img v-if="course.imageUrl" class="course-logo-image" :src="course.imageUrl" :alt="course.imageAlt" loading="lazy" />
        <span v-else class="course-icon" :style="{ color: course.accent }">{{ course.icon }}</span>
      </span>
    </RouterLink>
    <div class="course-body">
      <span class="level-badge">{{ course.level }}</span>
      <h3 :title="courseTitle(course)">{{ courseTitle(course) }}</h3>
      <p :title="courseDescription(course)">{{ courseDescription(course) }}</p>
      <ProgressBar v-if="compact || course.enrolled" :value="course.progress" :show-label="compact" />
      <div class="course-meta">
        <span>★ {{ course.rating }} ({{ course.reviews }})</span>
        <span>◷ {{ course.duration }}</span>
        <span>{{ course.lessonsCount }} lessons</span>
      </div>
      <div class="course-footer">
        <strong class="price">{{ course.price }}</strong>
        <RouterLink class="btn btn-primary" :to="course.enrolled ? `/learning/${course.id}` : `/courses/${course.id}`">
          {{ course.enrolled ? continueLabel : enrollLabel }}
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import ProgressBar from './ProgressBar.vue';
import { useAppState } from '../composables/useAppState';

defineProps({
  course: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
});

const { state, courseTitle, courseDescription } = useAppState();
const continueLabel = computed(() => (state.language === 'km' ? 'បន្តរៀន' : 'Continue'));
const enrollLabel = computed(() => (state.language === 'km' ? 'ចុះឈ្មោះ' : 'Enroll'));
</script>
