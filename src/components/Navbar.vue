<template>
  <header class="navbar">
    <div class="container nav-inner">
      <RouterLink class="brand brand-logo-link" to="/">
        <img class="brand-logo brand-logo-nav" src="../assets/images/smart-learn-code-logo-horizontal.svg" :alt="t('brand.name')" />
      </RouterLink>

      <button class="icon-button menu-button" type="button" @click="isOpen = !isOpen" aria-label="Toggle navigation">
        <span>≡</span>
      </button>

      <nav class="nav-links" :class="{ open: isOpen }">
        <RouterLink to="/" @click="isOpen = false">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/courses" @click="isOpen = false">{{ t('nav.courses') }}</RouterLink>
        <RouterLink to="/learning/javascript-fundamentals" @click="isOpen = false">{{ t('nav.roadmap') }}</RouterLink>
        <RouterLink to="/quiz/javascript-variables" @click="isOpen = false">{{ t('nav.challenges') }}</RouterLink>
        <RouterLink to="/profile" @click="isOpen = false">{{ t('nav.about') }}</RouterLink>
      </nav>

      <div class="nav-actions">
        <button class="icon-button" type="button" :aria-label="t('common.theme')" :title="themeLabel" @click="toggleTheme">
          {{ state.theme === 'dark' ? '☾' : '☀' }}
        </button>
        <button class="lang-toggle" type="button" :aria-label="t('common.language')" @click="toggleLanguage">
          {{ state.language === 'km' ? 'EN' : 'ខ្មែរ' }}
        </button>
        <template v-if="hasAccount">
          <RouterLink class="profile-menu" to="/profile" :title="state.user?.email || t('sidebar.profile')">
            <span class="profile-menu-avatar">{{ userInitials }}</span>
            <span class="profile-menu-text">
              <b>{{ state.user?.name || 'Dev San' }}</b>
              <small>{{ state.user?.email || 'Smart Learn Code' }}</small>
            </span>
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink class="btn btn-ghost" to="/login">{{ t('nav.login') }}</RouterLink>
          <RouterLink class="btn btn-primary" to="/register">{{ t('nav.signup') }}</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAppState } from '../composables/useAppState';

const isOpen = ref(false);
const { state, hasAccount, t, themeLabel, toggleTheme, toggleLanguage } = useAppState();
const userInitials = computed(() => {
  const name = state.user?.name || state.user?.email || 'Dev San';
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'DS';
});
</script>
