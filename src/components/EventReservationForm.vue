<template>
    <div class="form-container" v-if="event">
      <h2>{{ event.title }}</h2>
      <p>開催日: {{ event.date }}</p>
  
      <label>参加人数:</label>
      <input type="number" v-model.number="participantCount" min="1" max="5" />
  
      <div v-for="(form, index) in forms" :key="index" class="participant-form">
        <h4>参加者 {{ index + 1 }}</h4>
        <input v-model="form.name" placeholder="氏名" />
        <select v-model="form.faculty">
          <option disabled value="">学部を選択</option>
          <option>システム工学部</option>
          <option>教育学部</option>
          <option>経済学部</option>
          <option>観光学部</option>
          <option>社会インフォマティクス学環</option>
        </select>
        <select v-model="form.gender">
          <option disabled value="">性別を選択</option>
          <option>男性</option>
          <option>女性</option>
          <option>その他</option>
        </select>
      </div>
  
      <button @click="submitReservation">予約する</button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
    <p v-else>読み込み中...</p>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
  import { db } from '@/firebase'
  
  const route = useRoute()
  const eventId = route.params.eventId
  const event = ref(null)
  
  const participantCount = ref(1)
  const forms = ref([{ name: '', faculty: '', gender: '' }])
  const successMessage = ref('')
  
  // イベント情報を取得
  onMounted(async () => {
    const eventDoc = await getDoc(doc(db, 'events', eventId))
    if (eventDoc.exists()) {
      event.value = eventDoc.data()
    } else {
      console.error('イベントが存在しません')
    }
  })
  
  // 人数変更時にフォーム数を調整
  watch(participantCount, (newCount) => {
    while (forms.value.length < newCount) {
      forms.value.push({ name: '', faculty: '', gender: '' })
    }
    while (forms.value.length > newCount) {
      forms.value.pop()
    }
  })
  
  // 予約を送信
  const submitReservation = async () => {
    try {
      await addDoc(collection(db, 'reservations'), {
        eventId,
        participants: forms.value,
        reservedAt: serverTimestamp()
      })
      successMessage.value = '予約が完了しました！'
      forms.value = [{ name: '', faculty: '', gender: '' }]
      participantCount.value = 1
    } catch (error) {
      console.error('予約エラー:', error)
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    padding: 20px;
  }
  .participant-form {
    margin-bottom: 16px;
  }
  input, select {
    display: block;
    margin: 4px 0;
    padding: 6px;
    width: 100%;
  }
  button {
    margin-top: 12px;
    padding: 8px 16px;
  }
  .success {
    color: green;
    margin-top: 10px;
  }
  </style>