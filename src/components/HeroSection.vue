<template>
  <section class="hero">
    <div class="container hero-layout">
      <div class="hero-copy">
        <span class="eyebrow">{{ t('hero.eyebrow') }}</span>
        <h1>{{ t('hero.titleA') }} <span>{{ t('hero.titleCode') }}</span><br />{{ t('hero.titleB') }}</h1>
        <p>{{ t('hero.subtitle') }}</p>
        <div class="hero-actions">
          <RouterLink class="btn btn-primary" to="/courses">{{ t('hero.start') }}</RouterLink>
          <RouterLink class="btn btn-ghost" to="/courses">{{ t('hero.explore') }}</RouterLink>
        </div>
        <div class="learner-strip">
          <div class="avatars">
            <span>DS</span>
            <span>LC</span>
            <span>DV</span>
            <span>JS</span>
          </div>
          <div><b>10K+</b><small>{{ t('hero.learners') }}</small></div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="floating-tech tech-js">JS</div>
        <div class="floating-tech tech-ts">TS</div>
        <div class="floating-tech tech-react">React</div>
        <div class="floating-tech tech-vue">Vue</div>
        <div class="code-window">
          <div class="window-tabs">
            <span class="active">index.html</span>
            <span>style.css</span>
            <span>script.js</span>
          </div>
          <pre class="code-lines"><code><span>1</span> &lt;!DOCTYPE html&gt;
<span>2</span> &lt;html lang="en"&gt;
<span>3</span>   &lt;head&gt;
<span>4</span>     &lt;title&gt;<strong>Smart Learn Code</strong>&lt;/title&gt;
<span>5</span>   &lt;/head&gt;
<span>6</span>   &lt;body&gt;
<span>7</span>     &lt;h1&gt;Learn Code. Build Anything.&lt;/h1&gt;
<span>8</span>     &lt;button&gt;Start Now&lt;/button&gt;
<span>9</span>   &lt;/body&gt;
<span>10</span> &lt;/html&gt;</code></pre>
          <button class="play-float" type="button" aria-label="Play preview">▶</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAppState } from '../composables/useAppState';

const { t } = useAppState();
</script>
