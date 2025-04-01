<template>
    <div class="reservation-view">
      <Header />
      <main v-if="event">
        <h2>イベント予約</h2>
        <div class="event-info">
          <p><strong>イベント名:</strong> {{ event.title }}</p>
          <p><strong>開催日:</strong> {{ event.date }}</p>
          <p><strong>詳細:</strong> {{ event.description }}</p>
        </div>
        <EventReservationForm :eventId="eventId" />
      </main>
      <p v-else>読み込み中...</p>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { doc, getDoc } from 'firebase/firestore'
  import { db } from '@/firebase'
  
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import EventReservationForm from '@/components/EventReservationForm.vue'
  
  const route = useRoute()
  const eventId = route.params.eventId
  const event = ref(null)
  
  onMounted(async () => {
    const eventDoc = await getDoc(doc(db, 'events', eventId))
    if (eventDoc.exists()) {
      event.value = eventDoc.data()
    } else {
      console.error('イベントが存在しません')
    }
  })
  </script>
  
  <style scoped>
  .reservation-view {
    padding-bottom: 80px;
  }
  main {
    padding: 20px;
  }
  .event-info {
    margin-bottom: 24px;
    background: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
  }
  </style>