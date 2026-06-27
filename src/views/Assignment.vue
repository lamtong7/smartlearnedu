<template>
  <div class="app-page">
    <Sidebar />
    <main class="app-main">
      <header class="app-topbar slim">
        <div class="breadcrumbs">My Courses › JavaScript Fundamentals › Assignments</div>
        <div class="user-chip"><span>DS</span><b>Dev San</b><small>Beginner</small></div>
      </header>

      <div class="assignment-screen">
        <section class="assignment-main">
          <RouterLink to="/my-courses" class="link-more">← Back to Assignments</RouterLink>
          <h1>Variables & Data Types Assignment</h1>
          <p>This assignment will help you practice declaring variables, using different data types, and performing basic operations in JavaScript.</p>
          <AssignmentCard />

          <section class="card upload-card">
            <h2>Your Submission</h2>
            <div class="upload-drop">
              <span>⇧</span>
              <p>Drag & drop your file here</p>
              <small>or</small>
              <button class="btn btn-primary" type="button">Choose File</button>
              <small>Accepted files: .js | Max file size: 2MB</small>
            </div>
          </section>

          <section class="card">
            <h2>Submission History</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Submitted On</th>
                  <th>File Name</th>
                  <th>Status</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>May 28, 2025 10:30 AM</td>
                  <td>variables-assignment.js</td>
                  <td><span class="status-chip">Submitted</span></td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>

        <aside class="learning-side">
          <div class="card ring-card">
            <h3>Submission Status</h3>
            <div class="progress-ring"><b>0%</b><span>Submitted</span></div>
            <p>Not Submitted Yet</p>
            <button class="btn btn-primary" type="button">Submit Assignment</button>
          </div>
          <div class="card stat-list">
            <h3>Assignment Details</h3>
            <p><span>Course</span><b>JavaScript Fundamentals</b></p>
            <p><span>Lesson</span><b>Variables and Data Types</b></p>
            <p><span>Assigned On</span><b>May 20, 2025</b></p>
            <p><span>Due Date</span><b>May 30, 2025</b></p>
          </div>
          <div class="card resource-list">
            <h3>Resources</h3>
            <a href="#">Variables in JavaScript</a>
            <a href="#">Data Types Cheat Sheet</a>
            <a href="#">Example Code</a>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import AssignmentCard from '../components/AssignmentCard.vue';
</script>
