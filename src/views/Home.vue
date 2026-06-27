<template>
  <div>
    <HeroSection />

    <section class="container feature-strip card">
      <article v-for="feature in features" :key="feature.titleKey">
        <span>{{ feature.icon }}</span>
        <div>
          <h3>{{ t(feature.titleKey) }}</h3>
          <p>{{ t(feature.textKey) }}</p>
        </div>
      </article>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <h2>{{ t('home.popular') }}</h2>
            <p>{{ t('home.popularText') }}</p>
          </div>
          <RouterLink class="link-more" to="/courses">{{ t('home.viewAll') }}</RouterLink>
        </div>
        <div class="grid course-grid">
          <CourseCard v-for="course in featuredCourses.slice(0, 6)" :key="course.id" :course="course" compact />
        </div>
      </div>
    </section>

    <section class="section learning-path">
      <div class="container">
        <div class="section-heading">
          <div>
            <h2>{{ t('home.path') }}</h2>
            <p>{{ t('home.pathText') }}</p>
          </div>
        </div>
        <div class="path-row card">
          <article v-for="(item, index) in path" :key="item.title" class="path-item">
            <span class="path-step">{{ index + 1 }}</span>
            <span class="path-icon">{{ item.icon }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="stats-band">
          <StatsCard v-for="stat in learningStats" :key="stat.label" :stat="stat" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <h2>{{ t('home.categories') }}</h2>
            <p>{{ t('home.categoriesText') }}</p>
          </div>
        </div>
        <div class="grid grid-4">
          <CategoryCard v-for="category in categories.slice(1)" :key="category.id" :category="category" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <h2>{{ t('home.teachers') }}</h2>
            <p>{{ t('home.teachersText') }}</p>
          </div>
        </div>
        <div class="grid grid-3">
          <TeacherCard v-for="teacher in teachers" :key="teacher.name" :teacher="teacher" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container cta-panel card">
        <div class="cta-illustration">
          <span>&lt;/&gt;</span>
        </div>
        <div>
          <h2>{{ t('home.ctaTitle') }}</h2>
          <p>{{ t('home.ctaText') }}</p>
        </div>
        <form class="cta-form">
          <input class="input" type="email" :placeholder="t('home.email')" />
          <button class="btn btn-primary" type="button">{{ t('home.getStarted') }}</button>
        </form>
      </div>
    </section>

    <section class="section testimonials">
      <div class="container">
        <div class="section-heading">
          <div>
            <h2>{{ t('home.testimonials') }}</h2>
            <p>{{ t('home.testimonialsText') }}</p>
          </div>
        </div>
        <div class="grid grid-3">
          <article v-for="item in testimonials" :key="item.name" class="card testimonial-card">
            <span>★★★★★</span>
            <p>{{ item.quote }}</p>
            <b>{{ item.name }}</b>
            <small>{{ item.role }}</small>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import HeroSection from '../components/HeroSection.vue';
import CourseCard from '../components/CourseCard.vue';
import CategoryCard from '../components/CategoryCard.vue';
import StatsCard from '../components/StatsCard.vue';
import TeacherCard from '../components/TeacherCard.vue';
import { categories, featuredCourses, learningStats, teachers, testimonials } from '../data/courses';
import { useAppState } from '../composables/useAppState';

const { t } = useAppState();

const features = [
  { titleKey: 'home.features.structured', textKey: 'home.features.structuredText', icon: '</>' },
  { titleKey: 'home.features.practice', textKey: 'home.features.practiceText', icon: '>_' },
  { titleKey: 'home.features.track', textKey: 'home.features.trackText', icon: '100' },
  { titleKey: 'home.features.challenge', textKey: 'home.features.challengeText', icon: 'GO' }
];

const path = [
  { title: 'HTML & CSS', text: 'Build the foundation of web development.', icon: '</>' },
  { title: 'JavaScript', text: 'Add interactivity to your websites.', icon: 'JS' },
  { title: 'React.js', text: 'Build modern user interfaces.', icon: 'React' },
  { title: 'Node.js', text: 'Build backend APIs and databases.', icon: 'Node' }
];
</script>
