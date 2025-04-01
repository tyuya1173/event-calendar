<template>
  <div class="participant-list">
    <h2>参加者一覧</h2>
    
    <div v-if="event">
      <h3>{{ event.title }}</h3>
      <p>開催日: {{ event.date }}</p>
      <p>詳細: {{ event.description }}</p>
    </div>
    
    <div v-if="participants.length > 0">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>氏名</th>
            <th>学部</th>
            <th>性別</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, index) in participants" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.faculty }}</td>
            <td>{{ p.gender }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>参加者がまだいません。</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@/firebase'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'

const route = useRoute()
const eventId = route.params.eventId

const event = ref(null)
const participants = ref([])

onMounted(async () => {
  // イベント情報の取得
  const eventDoc = await getDoc(doc(db, 'events', eventId))
  if (eventDoc.exists()) {
    event.value = eventDoc.data()
  }

  // 予約者情報の取得
  const q = query(collection(db, 'reservations'), where('eventId', '==', eventId))
  const snapshot = await getDocs(q)

  const allParticipants = []
  snapshot.forEach((docSnap) => {
    const data = docSnap.data()
    if (Array.isArray(data.participants)) {
      allParticipants.push(...data.participants)
    }
  })

  participants.value = allParticipants
})
</script>

<style scoped>
.participant-list {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
thead {
  background-color: #f8f8f8;
}
</style>