<template>
  <section class="register-page">
    <div class="register-header">
      <RouterLink class="brand large-brand brand-logo-link" to="/">
        <img class="brand-logo brand-logo-auth" src="../assets/images/smart-learn-code-logo-horizontal.svg" :alt="t('brand.name')" />
      </RouterLink>
      <p>{{ t('hero.eyebrow') }}</p>
    </div>

    <div class="register-card card">
      <div class="auth-settings">
        <button type="button" @click="toggleTheme">{{ t('common.theme') }}: {{ themeLabel }}</button>
        <button type="button" @click="toggleLanguage">{{ t('common.language') }}: {{ languageLabel }}</button>
      </div>
      <div class="auth-logo">
        <img class="auth-logo-image" src="../assets/images/smart-learn-code-logo.svg" :alt="t('brand.name')" />
        <h1>{{ t('register.title') }}</h1>
        <p>{{ t('register.subtitle') }}</p>
      </div>
      <p v-if="message" class="auth-message">{{ message }}</p>
      <form class="form-grid" @submit.prevent="submitRegister">
        <label>
          {{ t('register.fullName') }}
          <input v-model="form.name" class="input" type="text" :placeholder="t('register.fullName')" required />
        </label>
        <label>
          {{ t('register.email') }}
          <input v-model="form.email" class="input" type="email" :placeholder="t('register.email')" required />
        </label>
        <label>
          {{ t('register.password') }}
          <input v-model="form.password" class="input" type="password" :placeholder="t('register.password')" required />
        </label>
        <div class="strength-bar">
          <span></span><span></span><span></span><span></span>
        </div>
        <label>
          {{ t('register.confirm') }}
          <input v-model="form.confirmPassword" class="input" type="password" :placeholder="t('register.confirm')" required />
        </label>
        <label class="check-row">
          <input v-model="form.accepted" type="checkbox" required />
          {{ t('register.terms') }}
        </label>
        <button class="btn btn-primary full-btn" type="submit">{{ t('register.button') }}</button>
      </form>
      <div class="divider">OR</div>
      <div class="social-row">
        <button class="btn btn-white" type="button">Google</button>
        <button class="btn btn-white" type="button">GitHub</button>
        <button class="btn btn-white" type="button">Facebook</button>
      </div>
      <p class="center-text"><RouterLink :to="{ name: 'login', query: route.query }">{{ t('register.hasAccount') }}</RouterLink></p>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAppState } from '../composables/useAppState';

const route = useRoute();
const router = useRouter();
const { t, themeLabel, languageLabel, createAccount, toggleTheme, toggleLanguage } = useAppState();
const message = ref(route.query.reason === 'account-required' ? t('auth.required') : '');
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  accepted: true
});

function submitRegister() {
  if (form.password !== form.confirmPassword) {
    message.value = t('register.confirm');
    return;
  }

  createAccount(form);
  router.push(String(route.query.redirect || '/dashboard'));
}
</script>
