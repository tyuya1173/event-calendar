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
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
  
  const auth = getAuth()
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
    background-color: orange;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }
  .auth-buttons button {
    background: white;
    color: orange;
    border: 1px solid white;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .auth-buttons button:hover {
    background: #fff5e6;
  }
  </style>