<template>
  <div class="app-page">
    <Sidebar />
    <main class="app-main">
      <header class="app-topbar slim">
        <div class="breadcrumbs">{{ state.language === 'km' ? 'វគ្គរបស់ខ្ញុំ' : 'My Courses' }} › {{ courseTitle(course) }} › 03. Variables and Data Types</div>
        <div class="user-chip"><span>DS</span><b>Dev San</b><small>Beginner</small></div>
      </header>

      <div class="learning-screen">
        <section class="learning-main card">
          <div class="lesson-header">
            <span class="badge">Lesson 03 of {{ course.lessonsCount }}</span>
            <h1>Variables and Data Types</h1>
            <p>Learn how to store and manage data in JavaScript using variables and understand different data types.</p>
            <div class="lesson-actions">
              <button class="btn btn-ghost" type="button">‹ Previous</button>
              <button class="btn btn-primary" type="button">Next ›</button>
            </div>
          </div>

          <div class="tabs">
            <button class="tab-btn active" type="button">Lesson Content</button>
            <button class="tab-btn" type="button">Notes</button>
            <button class="tab-btn" type="button">Discussions</button>
          </div>

          <VideoPlayer :course="course" />

          <div class="lesson-workspace-grid">
            <section class="card lesson-panel">
              <div class="section-heading compact">
                <div>
                  <h2>Lesson List</h2>
                  <p>{{ lessonList.length }} lessons in this course section</p>
                </div>
              </div>
              <div class="lesson-list">
                <LessonCard
                  v-for="(lesson, index) in lessonList"
                  :key="lesson"
                  :lesson="lesson"
                  :index="index"
                  :duration="index === 2 ? '18 min' : '12 min'"
                  :active="index === 2"
                />
              </div>
            </section>

            <section class="card lesson-panel">
              <div class="section-heading compact">
                <div>
                  <h2>Lesson Notes</h2>
                  <p>Write quick notes while watching the lesson.</p>
                </div>
              </div>
              <textarea class="textarea" v-model="notes" placeholder="Example: let can be reassigned, const cannot be reassigned..."></textarea>
              <div class="form-actions">
                <button class="btn btn-primary" type="button">Save Notes</button>
                <RouterLink class="btn btn-ghost" to="/assignment">Open Assignment</RouterLink>
              </div>
            </section>
          </div>

          <article class="lesson-article card">
            <h2>1. What is a Variable?</h2>
            <p>A variable is a container for storing data values. In JavaScript, you can declare variables using <code>let</code>, <code>const</code>, or <code>var</code>.</p>
            <pre><code>let name = "Smart Learn Code";
const age = 20;
var isStudent = true;

console.log(name);
console.log(age);
console.log(isStudent);</code></pre>
          </article>

          <article class="lesson-article card">
            <h2>2. Data Types in JavaScript</h2>
            <p>JavaScript has different data types that define the kind of value a variable can hold.</p>
            <div class="datatype-grid">
              <span><b>String</b><small>"Hello"</small></span>
              <span><b>Number</b><small>42, 3.14</small></span>
              <span><b>Boolean</b><small>true, false</small></span>
              <span><b>Null</b><small>null</small></span>
              <span><b>Undefined</b><small>undefined</small></span>
            </div>
            <div class="tip-box"><b>Tip</b> Use <code>const</code> by default and only use <code>let</code> when you plan to reassign the variable.</div>
          </article>

          <div class="lesson-bottom card">
            <RouterLink to="/learning/javascript-fundamentals">‹ Previous Lesson</RouterLink>
            <ProgressBar :value="75" label="Course Progress" />
            <RouterLink to="/quiz/javascript-variables">Next: Quiz ›</RouterLink>
          </div>
        </section>

        <aside class="learning-side">
          <div class="card ring-card">
            <h3>Your Progress</h3>
            <div class="progress-ring"><b>{{ course.progress }}%</b><span>Complete</span></div>
            <ProgressBar :value="course.progress" label="Lesson Progress" />
          </div>

          <div class="card">
            <h3>Lesson Topics</h3>
            <div class="topic-list">
              <span class="done">What is a Variable?</span>
              <span class="done">Declaring Variables</span>
              <span class="active">Data Types Overview</span>
              <span>Type Conversion</span>
              <span>Practice Quiz</span>
            </div>
          </div>

          <div class="card">
            <h3>Resources</h3>
            <div class="resource-list">
              <a v-for="resource in course.resources" :key="resource" href="#">{{ resource }}</a>
            </div>
          </div>

          <div class="card help-card">
            <h3>Need Help?</h3>
            <p>Stuck on this lesson?</p>
            <button class="btn btn-ghost" type="button">Ask AI Tutor</button>
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
import VideoPlayer from '../components/VideoPlayer.vue';
import ProgressBar from '../components/ProgressBar.vue';
import LessonCard from '../components/LessonCard.vue';
import { findCourse } from '../data/courses';
import { useAppState } from '../composables/useAppState';

const props = defineProps({
  id: {
    type: String,
    default: 'javascript-fundamentals'
  }
});

const course = computed(() => findCourse(props.id));
const { state, courseTitle } = useAppState();
const notes = ref('Use const by default. Use let only when the value needs to change.');
const lessonList = computed(() => course.value.curriculum.flatMap((section) => section.lessons).slice(0, 6));
</script>
