<template>
    <div class="auth-form">
      <h2>新規登録</h2>
      <input type="email" v-model="email" placeholder="メールアドレス" />
      <input type="password" v-model="password" placeholder="パスワード" />
      <button @click="register">登録</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p>
        すでにアカウントをお持ちの方は
        <router-link to="/login">ログイン</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
  
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  const register = async () => {
    const auth = getAuth()
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      router.push('/')
    } catch (error) {
      errorMessage.value = '登録に失敗しました: ' + error.message
    }
  }
  </script>
  
  <style scoped>
  .auth-form {
    padding: 20px;
  }
  input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
  }
  .error {
    color: red;
  }
  </style>