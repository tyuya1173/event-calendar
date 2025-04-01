<template>
    <div class="mypage">
      <h2>マイページ</h2>
  
      <div v-if="user">
        <p><strong>ログイン中:</strong> {{ user.email }}</p>
        <button @click="logout">ログアウト</button>
      </div>
  
      <h3>予約済みイベント</h3>
      <ul>
        <li v-for="res in reservations" :key="res.id">
          <strong>{{ res.event?.title || '（不明なイベント）' }}</strong><br />
          日付: {{ res.event?.date }}<br />
          参加人数: {{ res.participants.length }}人
        </li>
      </ul>
  
      <p v-if="reservations.length === 0">予約はまだありません。</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, signOut } from 'firebase/auth'
  import { db } from '@/firebase'
  import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
  
  const auth = getAuth()
  const user = ref(auth.currentUser)
  const router = useRouter()
  const reservations = ref([])
  
  const logout = async () => {
    await signOut(auth)
    router.push('/login')
  }
  
  // 自身の予約を取得
  onMounted(async () => {
    const currentUser = auth.currentUser
    if (!currentUser) return
  
    user.value = currentUser
    const q = query(collection(db, 'reservations'), where('reservedBy', '==', currentUser.uid))
    const snapshot = await getDocs(q)
  
    const results = await Promise.all(snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data()
      const eventDoc = await getDoc(doc(db, 'events', data.eventId))
      return {
        id: docSnap.id,
        ...data,
        event: eventDoc.exists() ? eventDoc.data() : null
      }
    }))
  
    reservations.value = results
  })
  </script>
  
  <style scoped>
  .mypage {
    padding: 20px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 16px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
  }
  button {
    margin-top: 8px;
  }
  </style>