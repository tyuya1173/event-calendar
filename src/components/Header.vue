<template>
  <header class="header">
    <div class="title" @click="$router.push('/')">リクホ イベントカレンダー</div>
    <div class="auth-buttons">
      <button v-if="!user" @click="$router.push('/login')">ログイン</button>
      <button v-else @click="logout">ログアウト</button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})

const logout = async () => {
  try {
    await signOut(auth)
    user.value = null
    router.push('/login')
  } catch (error) {
    console.error('ログアウト失敗:', error)
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  background-color: orange;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.title {
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  white-space: nowrap;
}

.auth-buttons {
  display: flex;
  gap: 8px;
}

.auth-buttons button {
  background: white;
  color: orange;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.auth-buttons button:hover {
  background: #fff5e6;
}

/* スマホ対応 */
@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .title {
    font-size: 18px;
  }

  .auth-buttons {
    width: 100%;
    justify-content: flex-end;
  }

  .auth-buttons button {
    font-size: 13px;
    padding: 6px 10px;
  }
}
</style>