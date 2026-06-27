<template>
  <footer class="footer">
    <div class="container footer-grid">
      <section>
        <RouterLink class="brand footer-brand brand-logo-link" to="/">
          <img class="brand-logo brand-logo-footer" src="../assets/images/smart-learn-code-logo-horizontal.svg" :alt="t('brand.name')" />
        </RouterLink>
        <p>{{ t('footer.description') }}</p>
        <div class="social-row footer-socials">
          <span>GH</span>
          <span>TW</span>
          <span>YT</span>
          <span>DC</span>
        </div>
      </section>

      <section>
        <h4>{{ t('footer.quickLinks') }}</h4>
        <div class="footer-links">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <RouterLink to="/courses">{{ t('nav.courses') }}</RouterLink>
          <RouterLink to="/learning/javascript-fundamentals">{{ t('nav.roadmap') }}</RouterLink>
          <RouterLink to="/quiz/javascript-variables">{{ t('nav.challenges') }}</RouterLink>
        </div>
      </section>

      <section>
        <h4>{{ t('footer.resources') }}</h4>
        <div class="footer-links">
          <a href="#">Documentation</a>
          <a href="#">Cheat Sheets</a>
          <a href="#">Practice</a>
          <a href="#">Help Center</a>
        </div>
      </section>

      <section>
        <h4>{{ t('footer.contact') }}</h4>
        <div class="footer-links">
          <a href="mailto:hello@smartlearncode.com">hello@smartlearncode.com</a>
          <a href="tel:+85512345678">+855 12 345 678</a>
          <span>Phnom Penh, Cambodia</span>
        </div>
      </section>
    </div>
    <div class="container footer-bottom">
      <span>{{ t('footer.rights') }}</span>
      <a href="#app">{{ t('footer.backTop') }}</a>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAppState } from '../composables/useAppState';

const { t } = useAppState();
</script>
