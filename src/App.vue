<template>
  <div class="app-shell">
    <Navbar v-if="showChrome" />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer v-if="showChrome" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const chromeHiddenPaths = ['/login', '/register', '/dashboard', '/my-courses', '/learning', '/quiz', '/assignment', '/certificates', '/profile'];
const showChrome = computed(() => !chromeHiddenPaths.some((path) => route.path.startsWith(path)));
</script>
