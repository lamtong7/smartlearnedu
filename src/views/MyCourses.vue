<template>
  <div class="app-page">
    <Sidebar />
    <main class="app-main">
      <header class="app-topbar">
        <div>
          <h1>My Courses</h1>
          <p>Continue learning and track your progress.</p>
        </div>
        <SearchBar v-model="search" placeholder="Search courses..." />
        <div class="user-chip"><span>DS</span><b>Dev San</b><small>Beginner</small></div>
      </header>

      <div class="my-courses-layout">
        <section>
          <div class="tabs">
            <button class="tab-btn active" type="button">All Courses</button>
            <button class="tab-btn" type="button">In Progress</button>
            <button class="tab-btn" type="button">Completed</button>
            <button class="tab-btn" type="button">Wishlist</button>
          </div>
          <div class="my-course-list">
            <article v-for="course in visibleCourses" :key="course.id" class="my-course-card card">
              <div class="course-cover" :class="course.imageClass">
                <span class="course-icon" :style="{ color: course.accent }">{{ course.icon }}</span>
              </div>
              <div>
                <span class="level-badge">{{ course.status }}</span>
                <h2>{{ courseTitle(course) }}</h2>
                <p>{{ courseDescription(course) }}</p>
                <div class="course-meta">
                  <span>{{ course.level }}</span>
                  <span>{{ course.duration }}</span>
                  <span>{{ course.lessonsCount }} Lessons</span>
                </div>
                <ProgressBar :value="course.progress" />
              </div>
              <div class="course-action">
                <b>{{ course.progress }}%</b>
                <span>Complete</span>
                <RouterLink class="btn btn-primary" :to="`/learning/${course.id}`">
                  {{ course.progress ? 'Continue' : 'Start Course' }} ▶
                </RouterLink>
              </div>
            </article>
          </div>
        </section>

        <aside class="dashboard-side">
          <div class="card ring-card">
            <h3>Overall Progress</h3>
            <div class="progress-ring"><b>46%</b><span>Completed</span></div>
            <p>You've completed 4 of 9 courses.</p>
          </div>
          <div class="card">
            <h3>Course Stats</h3>
            <div class="stat-list">
              <p><span>Total Courses</span><b>9</b></p>
              <p><span>In Progress</span><b>4</b></p>
              <p><span>Completed</span><b>2</b></p>
              <p><span>Total Hours</span><b>16h 10m</b></p>
            </div>
          </div>
          <div class="card quote-card">
            <p>Learning never exhausts the mind.</p>
            <span>Leonardo da Vinci</span>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import SearchBar from '../components/SearchBar.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { enrolledCourses } from '../data/courses';
import { useAppState } from '../composables/useAppState';

const search = ref('');
const { courseTitle, courseDescription } = useAppState();
const visibleCourses = computed(() => {
  const text = search.value.toLowerCase();
  return enrolledCourses.filter((course) => course.title.toLowerCase().includes(text));
});
</script>
