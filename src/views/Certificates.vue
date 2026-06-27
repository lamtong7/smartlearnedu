<template>
  <div class="app-page">
    <Sidebar />
    <main class="app-main">
      <header class="app-topbar slim">
        <div>
          <div class="breadcrumbs">Dashboard › Certificates</div>
          <h1>My Certificates</h1>
          <p>View and download your earned certificates.</p>
        </div>
        <SearchBar v-model="search" placeholder="Search certificates..." />
        <div class="user-chip"><span>DS</span><b>Dev San</b><small>Beginner</small></div>
      </header>

      <div class="certificates-screen">
        <section class="certificates-main">
          <div class="tabs">
            <button class="tab-btn active" type="button">All Certificates</button>
            <button class="tab-btn" type="button">Completed</button>
            <button class="tab-btn" type="button">In Progress</button>
          </div>

          <div class="kpi-grid">
            <StatsCard v-for="stat in certStats" :key="stat.label" :stat="stat" />
          </div>

          <div class="cert-content">
            <div class="certificate-list">
              <CertificateCard
                v-for="certificate in filteredCertificates"
                :key="certificate.id"
                :certificate="certificate"
                :selected="selected.id === certificate.id"
                @click="selected = certificate"
              />
            </div>

            <div class="certificate-preview-large card">
              <div class="paper-certificate">
                <div class="seal" :style="{ background: selected.accent }">{{ selected.icon }}</div>
                <h2>CERTIFICATE</h2>
                <p>OF COMPLETION</p>
                <span>This is to certify that</span>
                <h3>{{ selected.learner }}</h3>
                <span>has successfully completed the course</span>
                <h4>{{ selected.title }}</h4>
                <small>{{ selected.completedOn }}</small>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" type="button">Download Certificate</button>
                <button class="btn btn-ghost" type="button">Share Certificate</button>
              </div>
            </div>
          </div>
        </section>

        <aside class="learning-side">
          <div class="card ring-card">
            <h3>Certificate Overview</h3>
            <div class="progress-ring"><b>80%</b><span>Completion Rate</span></div>
            <p>You have completed 4 of 5 certificates.</p>
          </div>
          <div class="card">
            <h3>Recent Certificates</h3>
            <div class="resource-list">
              <a v-for="certificate in certificates.slice(0, 3)" :key="certificate.id" href="#">
                {{ certificate.title }}
              </a>
            </div>
          </div>
          <div class="card help-card">
            <h3>Showcase Your Achievement</h3>
            <p>Add your certificates to your LinkedIn profile and share your learning journey.</p>
            <button class="btn btn-ghost" type="button">Go to LinkedIn</button>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import SearchBar from '../components/SearchBar.vue';
import StatsCard from '../components/StatsCard.vue';
import CertificateCard from '../components/CertificateCard.vue';
import { certificates } from '../data/certificates';

const search = ref('');
const selected = ref(certificates[0]);
const certStats = [
  { label: 'Total Certificates', value: '5', icon: 'cert' },
  { label: 'Completed', value: '4', icon: 'done' },
  { label: 'In Progress', value: '1', icon: 'time' },
  { label: 'Total Points Earned', value: '820', icon: 'star' }
];

const filteredCertificates = computed(() => {
  const text = search.value.toLowerCase();
  return certificates.filter((certificate) => certificate.title.toLowerCase().includes(text));
});
</script>
