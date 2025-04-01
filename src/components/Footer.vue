<template>
    <footer class="footer">
      <button @click="$router.push('/')">
        <span>🏠</span>
        <span class="label">ホーム</span>
      </button>
      <button @click="$router.push('/mypage')">
        <span>👤</span>
        <span class="label">マイページ</span>
      </button>
      <button @click="$router.push('/admin')">
        <span>🛠</span>
        <span class="label">管理</span>
      </button>
    </footer>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  </script>
  
  <style scoped>
  .footer {
    background-color: orange;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }
  button {
    background: transparent;
    border: none;
    color: white;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.85;
  }
  .label {
    font-size: 12px;
  }
  </style>