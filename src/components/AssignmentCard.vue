<template>
  <article class="assignment-card card">
    <div class="assignment-meta">
      <span>Due Date<br /><b>{{ dueDate }}</b></span>
      <span>Points<br /><b>{{ points }}</b></span>
      <span>Status<br /><b>{{ status }}</b></span>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <ol>
      <li v-for="item in tasks" :key="item">{{ item }}</li>
    </ol>
  </article>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Variables & Data Types Assignment'
  },
  description: {
    type: String,
    default: 'Write a JavaScript program that declares variables, uses different data types, and logs output to the console.'
  },
  dueDate: {
    type: String,
    default: 'May 30, 2025'
  },
  points: {
    type: String,
    default: '100 Points'
  },
  status: {
    type: String,
    default: 'Not Submitted'
  },
  tasks: {
    type: Array,
    default: () => [
      'Declare a variable for your name and age.',
      'Declare a Boolean variable for student status.',
      'Declare a variable for your favorite programming language.',
      'Log all variables to the console.',
      'Perform and log the sum of your age and 5.'
    ]
  }
});
</script>
