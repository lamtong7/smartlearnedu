<template>
  <div class="app-page">
    <Sidebar />
    <main class="app-main">
      <header class="app-topbar">
        <div>
          <h1>Good Evening, <span>Dev!</span></h1>
          <p>Keep learning, keep growing. You're doing great.</p>
        </div>
        <SearchBar v-model="search" placeholder="Search courses..." />
        <div class="user-chip"><span>DS</span><b>Dev San</b><small>Beginner</small></div>
      </header>

      <div class="dashboard-grid">
        <section class="dashboard-content">
          <div class="kpi-grid">
            <StatsCard v-for="stat in dashboardStats" :key="stat.label" :stat="stat" />
          </div>

          <section class="card continue-card">
            <div class="course-cover course-js">
              <span class="course-icon">JS</span>
            </div>
            <div>
              <div class="section-heading compact">
                <h2>JavaScript Fundamentals</h2>
                <span>75% Complete</span>
              </div>
              <ProgressBar :value="75" />
              <p>Learn the basic concepts of JavaScript step by step.</p>
              <RouterLink class="btn btn-primary" to="/learning/javascript-fundamentals">Continue Learning →</RouterLink>
            </div>
          </section>

          <section>
            <div class="section-heading compact">
              <h2>Recommended for You</h2>
              <RouterLink to="/courses">See all</RouterLink>
            </div>
            <div class="grid course-grid">
              <CourseCard v-for="course in courses.slice(1, 7)" :key="course.id" :course="course" compact />
            </div>
          </section>
        </section>

        <aside class="dashboard-side">
          <div class="card ring-card">
            <h3>Weekly Goal</h3>
            <div class="progress-ring"><b>80%</b><span>4 of 5 hours</span></div>
            <p>Great job. You're almost reaching your goal.</p>
          </div>
          <div class="card">
            <h3>Recent Achievements</h3>
            <div class="timeline">
              <p><b>First Steps</b><span>Complete your first lesson</span></p>
              <p><b>Streak Master</b><span>Maintain a 7-day streak</span></p>
              <p><b>Quick Learner</b><span>Complete 5 lessons in a day</span></p>
              <p><b>Course Explorer</b><span>Enroll in 5 courses</span></p>
            </div>
          </div>
          <div class="card quote-card">
            <p>The expert in anything was once a beginner.</p>
            <span>Helen Hayes</span>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import SearchBar from '../components/SearchBar.vue';
import StatsCard from '../components/StatsCard.vue';
import CourseCard from '../components/CourseCard.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { courses } from '../data/courses';

const search = ref('');
const dashboardStats = [
  { label: 'Courses Enrolled', value: '12', icon: 'cap' },
  { label: 'Overall Progress', value: '68%', icon: 'target' },
  { label: 'Day Streak', value: '15', icon: 'fire' },
  { label: 'Hours Learned', value: '42', icon: 'clock' }
];
</script>
