<template>
  <aside class="app-sidebar">
    <RouterLink class="brand sidebar-brand brand-logo-link" to="/dashboard">
      <img class="brand-logo brand-logo-sidebar" src="../assets/images/smart-learn-code-logo-horizontal.svg" :alt="t('brand.name')" />
    </RouterLink>

    <nav class="side-nav">
      <RouterLink to="/dashboard">⌂ {{ t('sidebar.dashboard') }}</RouterLink>
      <RouterLink to="/my-courses">▣ {{ t('sidebar.myCourses') }}</RouterLink>
      <RouterLink to="/learning/javascript-fundamentals">▤ {{ t('sidebar.learning') }}</RouterLink>
      <RouterLink to="/quiz/javascript-variables">◈ {{ t('sidebar.quiz') }}</RouterLink>
      <RouterLink to="/assignment">□ {{ t('sidebar.assignments') }}</RouterLink>
      <RouterLink to="/certificates">◎ {{ t('sidebar.certificates') }}</RouterLink>
      <RouterLink to="/profile">⚙ {{ t('sidebar.profile') }}</RouterLink>
    </nav>

    <div class="side-settings">
      <button type="button" @click="toggleTheme">{{ t('common.theme') }}: {{ themeLabel }}</button>
      <button type="button" @click="toggleLanguage">{{ t('common.language') }}: {{ languageLabel }}</button>
    </div>

    <div class="side-upgrade">
      <div class="side-upgrade-icon">◆</div>
      <h3>{{ t('sidebar.upgradeTitle') }}</h3>
      <p>{{ t('sidebar.upgradeText') }}</p>
      <button class="btn btn-primary" type="button">{{ t('sidebar.upgradeButton') }}</button>
    </div>

    <div class="side-help">
      <span>{{ t('sidebar.help') }}</span>
      <a href="#">{{ t('sidebar.helpLink') }}</a>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAppState } from '../composables/useAppState';

const { t, themeLabel, languageLabel, toggleTheme, toggleLanguage } = useAppState();
</script>
