<template>
  <div class="app-page">
    <Sidebar />
    <main class="app-main">
      <header class="app-topbar slim">
        <div class="breadcrumbs">My Courses › JavaScript Fundamentals › Quiz</div>
        <div class="user-chip"><span>DS</span><b>Dev San</b><small>Beginner</small></div>
      </header>

      <div class="quiz-screen">
        <section class="quiz-main">
          <div class="card quiz-intro">
            <span class="badge">Quiz {{ currentIndex + 1 }} of {{ quiz.questions.length }}</span>
            <h1>{{ quiz.title }}</h1>
            <p>Test your understanding of variables and data types in JavaScript.</p>
            <div class="quiz-info-row">
              <span><b>{{ formattedTime }}</b><small>Time Remaining</small></span>
              <span><b>{{ quiz.questions.length }} Questions</b><small>Total Questions</small></span>
              <span><b>{{ quiz.passingScore }}%</b><small>Passing Score</small></span>
            </div>
            <ProgressBar :value="answeredPercent" :show-label="false" />
          </div>

          <QuizCard
            :question="currentQuestion"
            :selected="answers[currentQuestion.id]"
            :number="currentIndex + 1"
            :total="quiz.questions.length"
            @select="selectAnswer"
          />

          <div class="quiz-actions">
            <button class="btn btn-ghost" type="button" @click="previousQuestion">← Previous</button>
            <button class="btn btn-ghost" type="button">Mark for Review</button>
            <button class="btn btn-primary" type="button" @click="nextQuestion">{{ isLast ? 'Submit' : 'Next →' }}</button>
          </div>
        </section>

        <aside class="learning-side">
          <div class="card ring-card">
            <h3>Quiz Progress</h3>
            <div class="progress-ring"><b>{{ answeredPercent }}%</b><span>Completed</span></div>
            <ProgressBar :value="answeredPercent" :label="`${answeredCount} of ${quiz.questions.length} answered`" />
          </div>
          <div class="card">
            <h3>Question Navigation</h3>
            <div class="question-grid">
              <button
                v-for="(question, index) in quiz.questions"
                :key="question.id"
                type="button"
                :class="{ active: index === currentIndex, answered: answers[question.id] !== undefined }"
                @click="currentIndex = index"
              >
                {{ index + 1 }}
              </button>
            </div>
          </div>
          <div class="card stat-list">
            <h3>Quiz Summary</h3>
            <p><span>Total Questions</span><b>{{ quiz.questions.length }}</b></p>
            <p><span>Answered</span><b>{{ answeredCount }}</b></p>
            <p><span>Not Answered</span><b>{{ quiz.questions.length - answeredCount }}</b></p>
            <p><span>Time Remaining</span><b>{{ formattedTime }}</b></p>
          </div>
          <div class="card help-card">
            <h3>Tip</h3>
            <p>Read each question carefully before selecting your answer.</p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import ProgressBar from '../components/ProgressBar.vue';
import QuizCard from '../components/QuizCard.vue';
import { findQuiz } from '../data/quizzes';

const props = defineProps({
  id: {
    type: String,
    default: 'javascript-variables'
  }
});

const quiz = computed(() => findQuiz(props.id));
const currentIndex = ref(0);
const secondsLeft = ref(quiz.value.timeLimit);
const answers = reactive({});
let timerId;

const currentQuestion = computed(() => quiz.value.questions[currentIndex.value]);
const answeredCount = computed(() => Object.keys(answers).length);
const answeredPercent = computed(() => Math.round((answeredCount.value / quiz.value.questions.length) * 100));
const isLast = computed(() => currentIndex.value === quiz.value.questions.length - 1);
const formattedTime = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60).toString().padStart(2, '0');
  const seconds = (secondsLeft.value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
});

function selectAnswer(index) {
  answers[currentQuestion.value.id] = index;
}

function nextQuestion() {
  if (!isLast.value) {
    currentIndex.value += 1;
  }
}

function previousQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
}

onMounted(() => {
  timerId = window.setInterval(() => {
    if (secondsLeft.value > 0) {
      secondsLeft.value -= 1;
    }
  }, 1000);
});

onBeforeUnmount(() => {
  window.clearInterval(timerId);
});
</script>
