<template>
    <div class="admin">
      <h2>イベント登録</h2>
  
      <div class="form">
        <input v-model="title" placeholder="イベント名" />
        <input v-model="date" type="date" />
        <textarea v-model="description" placeholder="詳細"></textarea>
        <button @click="registerEvent">登録</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>
  
      <h3>登録済みイベント一覧</h3>
      <ul>
        <li v-for="event in events" :key="event.id" @click="goToParticipants(event.id)">
          <strong>{{ event.title }}</strong> - {{ event.date }}<br />
          {{ event.description }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth } from 'firebase/auth'
  import { db } from '@/firebase'
  import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
  
  const title = ref('')
  const date = ref('')
  const description = ref('')
  const events = ref([])
  const successMessage = ref('')
  const auth = getAuth()
  const router = useRouter()
  
  // イベント登録
  const registerEvent = async () => {
    if (!title.value || !date.value) return
  
    const user = auth.currentUser
    if (!user) {
      alert('ログインしてください')
      return
    }
  
    await addDoc(collection(db, 'events'), {
      title: title.value,
      date: date.value,
      description: description.value,
      createdBy: user.uid,
      createdAt: serverTimestamp()
    })
  
    title.value = ''
    date.value = ''
    description.value = ''
    successMessage.value = 'イベントを登録しました！'
    await loadEvents()
  }
  
  // 登録済みイベント一覧を取得
  const loadEvents = async () => {
    const snapshot = await getDocs(collection(db, 'events'))
    events.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }
  
  onMounted(() => {
    loadEvents()
  })
  
  // イベントクリック → 参加者一覧画面へ（将来的に使用）
  const goToParticipants = (eventId) => {
    router.push(`/admin/participants/${eventId}`)
  }
  </script>
  
  <style scoped>
  .admin {
    padding: 20px;
  }
  .form input,
  .form textarea {
    display: block;
    width: 100%;
    margin: 8px 0;
    padding: 8px;
  }
  button {
    margin-top: 10px;
    padding: 8px 16px;
  }
  .success {
    color: green;
    margin-top: 8px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  li:hover {
    background-color: #fef6e8;
  }
  </style>