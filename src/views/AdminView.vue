<template>
    <div class="admin-view">
      <Header />
      <main>
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import AdminDashboard from '@/components/AdminDashboard.vue'
  </script>
  
  <style scoped>
  .admin-view {
    padding-bottom: 80px; /* フッターとの重なり防止 */
  }
  main {
    padding: 20px;
  }
  </style>