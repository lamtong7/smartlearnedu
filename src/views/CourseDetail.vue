<template>
  <section class="section">
    <div class="container">
      <div class="breadcrumbs">{{ t('nav.home') }} › {{ t('nav.courses') }} › {{ courseTitle(course) }}</div>
      <div class="course-detail-hero">
        <VideoPlayer :course="course" />
        <div class="detail-copy">
          <span class="badge">Bestseller</span>
          <h1>{{ courseTitle(course) }}</h1>
          <p>{{ courseDescription(course) }}</p>
          <div class="course-meta">
            <span>★ {{ course.rating }} ({{ course.reviews }} reviews)</span>
            <span>{{ course.students }} students</span>
            <span>{{ course.duration }} total</span>
          </div>
          <div class="instructor-mini">
            <span>{{ course.instructor.avatar }}</span>
            <div>
              <b>{{ course.instructor.name }}</b>
              <p>{{ course.instructor.role }}</p>
            </div>
          </div>
        </div>
        <aside class="purchase-card card">
          <div class="price-row">
            <strong>{{ course.price }}</strong>
            <span v-if="course.oldPrice">{{ course.oldPrice }}</span>
          </div>
          <RouterLink class="btn btn-primary" :to="`/learning/${course.id}`">{{ state.language === 'km' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Enroll Now' }}</RouterLink>
          <button class="btn btn-ghost" type="button">Add to Wishlist</button>
          <p>30-Day Money-Back Guarantee</p>
          <h3>This course includes:</h3>
          <ul>
            <li v-for="item in course.includes" :key="item">{{ item }}</li>
          </ul>
        </aside>
      </div>

      <div class="detail-layout">
        <main class="detail-main">
          <div class="tabs">
            <button class="tab-btn active" type="button">Overview</button>
            <button class="tab-btn" type="button">Curriculum</button>
            <button class="tab-btn" type="button">Instructor</button>
            <button class="tab-btn" type="button">Reviews</button>
          </div>

          <section class="card detail-section">
            <h2>What you'll learn</h2>
            <div class="learn-grid">
              <p v-for="item in course.whatYouLearn" :key="item">✓ {{ item }}</p>
            </div>
            <h2>Course Description</h2>
            <p>{{ courseDescription(course) }}</p>
            <ul class="clean-list">
              <li>Start from the basics and advance to modern coding.</li>
              <li>Hands-on projects and real-world examples.</li>
              <li>Clean, easy-to-understand explanations.</li>
              <li>Learn at your own pace with lifetime access.</li>
            </ul>
          </section>

          <section class="card detail-section">
            <h2>Projects you'll build</h2>
            <div class="grid grid-4">
              <article v-for="project in course.projects" :key="project" class="mini-project">
                <div class="project-thumb"></div>
                <h3>{{ project }}</h3>
                <p>Build a practical coding project with guided steps.</p>
              </article>
            </div>
          </section>

          <section class="card detail-section">
            <div class="section-heading compact">
              <h2>What students are saying</h2>
              <RouterLink to="/courses">View all reviews →</RouterLink>
            </div>
            <div class="grid grid-3">
              <article class="review-card" v-for="item in reviews" :key="item.name">
                <b>{{ item.name }}</b>
                <span>★★★★★</span>
                <p>{{ item.text }}</p>
              </article>
            </div>
          </section>
        </main>

        <aside class="curriculum-card card">
          <div class="section-heading compact">
            <div>
              <h2>Course Curriculum</h2>
              <p>{{ course.lessonsCount }} lessons • {{ course.duration }}</p>
            </div>
            <a href="#">Expand All</a>
          </div>
          <div v-for="(section, index) in course.curriculum" :key="section.title" class="curriculum-group">
            <button type="button">
              <b>{{ index + 1 }}. {{ section.title }}</b>
              <span>{{ section.duration }}</span>
            </button>
            <ul>
              <li v-for="lesson in section.lessons" :key="lesson">{{ lesson }} <span>04:30</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import VideoPlayer from '../components/VideoPlayer.vue';
import { findCourse } from '../data/courses';
import { useAppState } from '../composables/useAppState';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const course = computed(() => findCourse(props.id));
const { state, t, courseTitle, courseDescription } = useAppState();
const reviews = [
  { name: 'Sarah Johnson', text: 'Excellent course. The instructor explains concepts clearly.' },
  { name: 'Michael Chen', text: 'The best JavaScript course for beginners. Well structured and easy to follow.' },
  { name: 'David Wilson', text: 'Very practical and helpful. The projects are amazing.' }
];
</script>
