<template>
    <div class="home-view">
      <Header />
      <main>
        <h2>イベントカレンダー</h2>
        <CalendarView />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import CalendarView from '@/components/CalendarView.vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  </script>
  
  <style scoped>
  .home-view {
    padding-bottom: 80px; /* フッター分のスペース */
  }
  main {
    padding: 20px;
  }
  </style>