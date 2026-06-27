<template>
  <article class="quiz-card card">
    <div class="quiz-card-head">
      <span class="badge">Question {{ number }} of {{ total }}</span>
      <span class="badge">{{ points }} Points</span>
    </div>
    <h3>{{ question.text }}</h3>
    <div class="quiz-options">
      <button
        v-for="(answer, index) in question.answers"
        :key="answer"
        class="quiz-option"
        :class="{ selected: selected === index }"
        type="button"
        @click="$emit('select', index)"
      >
        <span>{{ String.fromCharCode(65 + index) }}</span>
        {{ answer }}
      </button>
    </div>
    <div class="quiz-explanation">
      <b>Explanation</b>
      <p>{{ question.explanation }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  },
  selected: {
    type: Number,
    default: null
  },
  number: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    default: 5
  }
});

defineEmits(['select']);
</script>
