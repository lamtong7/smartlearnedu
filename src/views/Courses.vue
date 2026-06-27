<template>
  <section class="section courses-page">
    <div class="container">
      <div class="courses-head">
        <div class="page-title">
          <h1>{{ t('courses.titleA') }} <span>{{ t('courses.titleB') }}</span></h1>
          <p>{{ t('courses.subtitle') }}</p>
        </div>
        <SearchBar v-model="search" :placeholder="t('courses.search')" />
        <button class="btn btn-ghost" type="button">{{ t('courses.filters') }}</button>
      </div>

      <div class="courses-layout">
        <aside class="filters-panel card">
          <h3>{{ t('courses.categories') }}</h3>
          <button
            v-for="category in categories"
            :key="category.id"
            class="filter-line"
            :class="{ active: selectedCategory === category.id }"
            type="button"
            @click="selectedCategory = category.id"
          >
            <span>{{ category.name }}</span>
            <b>{{ category.count }}</b>
          </button>

          <h3>{{ t('courses.level') }}</h3>
          <button
            v-for="level in levels"
            :key="level"
            class="filter-line"
            :class="{ active: selectedLevel === level }"
            type="button"
            @click="selectedLevel = level"
          >
            <span>{{ levelLabel(level) }}</span>
          </button>

          <div class="upgrade-card">
            <h3>{{ t('courses.proTitle') }}</h3>
            <p>{{ t('courses.proText') }}</p>
            <button class="btn btn-primary" type="button">{{ t('courses.upgrade') }}</button>
          </div>
        </aside>

        <main class="courses-results card">
          <div class="results-top">
            <div class="results-count">
              <span>{{ filteredCourses.length }} {{ t('courses.found') }}</span>
              <small>Page {{ currentPage }} of {{ totalPages }}</small>
            </div>
            <div class="results-tools">
              <select class="select" v-model="sort">
                <option>Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
              </select>
              <button class="page-btn" type="button" :disabled="currentPage === 1" @click="previousPage">‹</button>
              <button class="page-btn" type="button" :disabled="currentPage === totalPages" @click="nextPage">›</button>
            </div>
          </div>
          <div v-if="pagedCourses.length" class="grid course-grid">
            <CourseCard v-for="course in pagedCourses" :key="course.id" :course="course" />
          </div>
          <div v-else class="empty-state">
            {{ t('courses.empty') }}
          </div>
          <div class="pagination">
            <button class="page-btn" type="button" :disabled="currentPage === 1" @click="previousPage">‹</button>
            <button
              v-for="page in totalPages"
              :key="page"
              class="page-btn"
              :class="{ active: currentPage === page }"
              type="button"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button class="page-btn" type="button" :disabled="currentPage === totalPages" @click="nextPage">›</button>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import CourseCard from '../components/CourseCard.vue';
import SearchBar from '../components/SearchBar.vue';
import { categories, courses } from '../data/courses';
import { useAppState } from '../composables/useAppState';

const search = ref('');
const selectedCategory = ref('all');
const selectedLevel = ref('All Levels');
const sort = ref('Popular');
const currentPage = ref(1);
const pageSize = 6;
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const { state, t } = useAppState();

const filteredCourses = computed(() => {
  const text = search.value.trim().toLowerCase();
  const result = courses.filter((course) => {
    const matchesSearch = !text || `${course.title} ${course.description} ${course.level}`.toLowerCase().includes(text);
    const matchesCategory = selectedCategory.value === 'all' || course.category === selectedCategory.value;
    const matchesLevel = selectedLevel.value === 'All Levels' || course.level === selectedLevel.value;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return [...result].sort((a, b) => {
    if (sort.value === 'Highest Rated') return b.rating - a.rating;
    if (sort.value === 'Newest') return b.lessonsCount - a.lessonsCount;
    return reviewScore(b.reviews) - reviewScore(a.reviews);
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCourses.value.length / pageSize)));
const pagedCourses = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredCourses.value.slice(start, start + pageSize);
});

watch([search, selectedCategory, selectedLevel, sort], () => {
  currentPage.value = 1;
});

function reviewScore(value) {
  const text = String(value).trim().toUpperCase();
  const number = Number.parseFloat(text);
  return text.endsWith('K') ? number * 1000 : number;
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}

function levelLabel(level) {
  if (level === 'All Levels') return t('courses.allLevels');
  if (level === 'Beginner') return stateLabel('Beginner', 'មូលដ្ឋាន');
  if (level === 'Intermediate') return stateLabel('Intermediate', 'មធ្យម');
  if (level === 'Advanced') return stateLabel('Advanced', 'កម្រិតខ្ពស់');
  return level;
}

function stateLabel(english, khmer) {
  return state.language === 'km' ? khmer : english;
}
</script>
