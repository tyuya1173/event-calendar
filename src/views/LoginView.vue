<template>
    <div class="auth-form">
      <h2>ログイン</h2>
      <input type="email" v-model="email" placeholder="メールアドレス" />
      <input type="password" v-model="password" placeholder="パスワード" />
      <button @click="login">ログイン</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p>
        アカウントをお持ちでない方は
        <router-link to="/register">新規登録</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  const login = async () => {
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/')
    } catch (error) {
      errorMessage.value = 'ログインに失敗しました: ' + error.message
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