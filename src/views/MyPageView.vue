<template>
    <div class="mypage-view">
      <Header />
      <main>
        <MyPage />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import MyPage from '@/components/MyPage.vue'
  </script>
  
  <style scoped>
  .mypage-view {
    padding-bottom: 80px; /* フッター高さ分 */
  }
  main {
    padding: 20px;
  }
  </style>