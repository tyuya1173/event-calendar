<template>
  <footer class="footer">
    <button @click="router.push('/')">
      <span class="icon">🏠</span>
      <span class="label">ホーム</span>
    </button>
    <button @click="router.push('/mypage')">
      <span class="icon">👤</span>
      <span class="label">マイページ</span>
    </button>
    <button @click="router.push('/admin')">
      <span class="icon">🛠</span>
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
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: orange;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-sizing: border-box;
  padding: 0 12px;
}

button {
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 2px;
}

button:hover {
  opacity: 0.85;
}

.icon {
  font-size: 20px;
}

.label {
  font-size: 12px;
}

/* スマホ対応 */
@media (max-width: 600px) {
  .footer {
    height: 56px;
    padding: 0 8px;
  }

  .icon {
    font-size: 18px;
  }

  .label {
    font-size: 11px;
  }

  button {
    font-size: 13px;
  }
}
</style>