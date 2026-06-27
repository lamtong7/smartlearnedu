<template>
  <section class="auth-page">
    <div class="auth-art">
      <div class="brand large-brand brand-logo-link">
        <img class="brand-logo brand-logo-auth" src="../assets/images/smart-learn-code-logo-horizontal.svg" :alt="t('brand.name')" />
      </div>
      <h1>Code. Learn.<br />Build the Future.</h1>
      <p>{{ t('hero.subtitle') }}</p>
      <div class="auth-device">
        <pre><code>function learn() {
  const skills = ['HTML', 'CSS', 'JavaScript'];
  skills.forEach((skill) => {
    console.log('Keep Learning ' + skill);
  });
}</code></pre>
      </div>
      <div class="auth-mini-stats">
        <span>Learn<br />Step by Step</span>
        <span>Practice<br />Every Day</span>
        <span>Track<br />Progress</span>
        <span>Achieve<br />Goals</span>
      </div>
    </div>

    <div class="auth-card">
      <div class="auth-settings">
        <button type="button" @click="toggleTheme">{{ t('common.theme') }}: {{ themeLabel }}</button>
        <button type="button" @click="toggleLanguage">{{ t('common.language') }}: {{ languageLabel }}</button>
      </div>
      <div class="auth-logo">
        <img class="auth-logo-image" src="../assets/images/smart-learn-code-logo.svg" :alt="t('brand.name')" />
        <h2>{{ t('login.title') }}</h2>
        <p>{{ t('login.subtitle') }}</p>
      </div>
      <p v-if="message" class="auth-message">{{ message }}</p>
      <form class="form-grid" @submit.prevent="submitLogin">
        <label>
          {{ t('login.email') }}
          <input v-model="email" class="input" type="email" :placeholder="t('home.email')" />
        </label>
        <label>
          {{ t('login.password') }}
          <input v-model="password" class="input" type="password" :placeholder="t('login.password')" />
        </label>
        <label class="check-row">
          <input type="checkbox" checked />
          {{ t('login.remember') }}
        </label>
        <button class="btn btn-primary full-btn" type="submit">{{ t('login.button') }}</button>
      </form>
      <div class="divider">or continue with</div>
      <div class="social-stack">
        <button class="btn btn-white" type="button">Continue with Google</button>
        <button class="btn btn-white" type="button">Continue with GitHub</button>
        <button class="btn btn-white" type="button">Continue with Facebook</button>
      </div>
      <RouterLink class="auth-link" :to="{ name: 'register', query: route.query }">{{ t('login.noAccount') }}</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAppState } from '../composables/useAppState';

const route = useRoute();
const router = useRouter();
const { t, themeLabel, languageLabel, loginWithExistingAccount, toggleTheme, toggleLanguage } = useAppState();
const email = ref('');
const password = ref('');
const message = ref(route.query.reason === 'account-required' ? t('auth.required') : '');

function submitLogin() {
  const result = loginWithExistingAccount(email.value);
  if (!result.ok) {
    message.value = result.message;
    return;
  }

  router.push(String(route.query.redirect || '/dashboard'));
}
</script>
