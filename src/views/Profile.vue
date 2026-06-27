<template>
  <div class="app-page">
    <Sidebar />
    <main class="app-main">
      <header class="app-topbar slim">
        <div>
          <h1>My Profile</h1>
          <p>Manage your account information and track your learning journey.</p>
        </div>
        <button class="btn btn-primary" type="button">Edit Profile</button>
      </header>

      <div class="profile-screen">
        <section class="profile-main">
          <ProfileCard />
          <div class="tabs">
            <button class="tab-btn active" type="button">Overview</button>
            <button class="tab-btn" type="button">Settings</button>
            <button class="tab-btn" type="button">Security</button>
            <button class="tab-btn" type="button">Notifications</button>
          </div>

          <div class="kpi-grid">
            <StatsCard v-for="stat in profileStats" :key="stat.label" :stat="stat" />
          </div>

          <div class="profile-grid">
            <section class="card profile-form">
              <h2>Account Information</h2>
              <form class="form-grid">
                <label>
                  Full Name
                  <input class="input" type="text" value="Dev San" />
                </label>
                <label>
                  Email
                  <input class="input" type="email" value="devsan@gmail.com" />
                </label>
                <label>
                  Bio
                  <textarea class="textarea">I'm passionate about web development and learning new technologies.</textarea>
                </label>
                <button class="btn btn-primary" type="button">Save</button>
              </form>
            </section>

            <section class="card">
              <h2>Skills</h2>
              <div class="skill-list">
                <p v-for="skill in skills" :key="skill.name">
                  <span>{{ skill.name }}</span>
                  <ProgressBar :value="skill.value" :label="`${skill.value}%`" />
                </p>
              </div>
            </section>
          </div>

          <div class="grid grid-2">
            <section class="card">
              <h2>Recent Courses</h2>
              <div class="resource-list">
                <a v-for="course in enrolledCourses.slice(0, 4)" :key="course.id" href="#">{{ course.title }} - {{ course.progress }}%</a>
              </div>
            </section>
            <section class="card">
              <h2>Achievements</h2>
              <div class="timeline">
                <p><b>First Steps</b><span>Completed your first course</span></p>
                <p><b>Consistent Learner</b><span>Learned for 7 days in a row</span></p>
                <p><b>Quiz Master</b><span>Scored 90% or higher in a quiz</span></p>
                <p><b>Knowledge Seeker</b><span>Completed 4 courses</span></p>
              </div>
            </section>
          </div>
        </section>

        <aside class="learning-side">
          <div class="card ring-card">
            <h3>Learning Progress</h3>
            <div class="progress-ring"><b>80%</b><span>Overall Progress</span></div>
            <ProgressBar :value="80" label="Completed 4 of 5 courses" />
          </div>
          <div class="card">
            <h3>Study Streak</h3>
            <div class="big-number">15 Days</div>
            <p>Keep it up.</p>
          </div>
          <div class="card stat-list">
            <h3>Account Information</h3>
            <p><span>Full Name</span><b>Dev San</b></p>
            <p><span>Email</span><b>devsan@gmail.com</b></p>
            <p><span>Phone</span><b>+855 12 345 678</b></p>
            <p><span>Language</span><b>English</b></p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import ProfileCard from '../components/ProfileCard.vue';
import StatsCard from '../components/StatsCard.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { enrolledCourses } from '../data/courses';

const profileStats = [
  { label: 'Courses Enrolled', value: '5', icon: 'cap' },
  { label: 'Courses Completed', value: '4', icon: 'done' },
  { label: 'Total Learning Time', value: '16h', icon: 'time' },
  { label: 'Total Points', value: '820', icon: 'star' }
];

const skills = [
  { name: 'HTML', value: 90 },
  { name: 'CSS', value: 80 },
  { name: 'JavaScript', value: 75 },
  { name: 'Python', value: 60 }
];
</script>
