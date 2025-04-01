<template>
    <div class="calendar-container">
      <FullCalendar
        :plugins="calendarPlugins"
        initial-view="dayGridMonth"
        :header-toolbar="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }"
        :events="events"
        @eventClick="handleEventClick"
      />
    </div>
  </template>
  
  <script setup>
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { collection, getDocs } from 'firebase/firestore'
  import { db } from '@/firebase/index.js'
  
  const calendarPlugins = [dayGridPlugin, timeGridPlugin]
  const events = ref([]) // カレンダーに表示するイベント
  const router = useRouter()
  
  // Firestoreからイベント取得
  onMounted(async () => {
    const eventSnapshot = await getDocs(collection(db, 'events'))
    events.value = eventSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title,
        date: data.date,
      }
    })
  })
  
  // イベントをクリックしたときの処理
  const handleEventClick = (info) => {
    const eventId = info.event.id
    router.push(`/reserve/${eventId}`)
  }
  </script>
  
  <style scoped>
  .calendar-container {
    padding: 16px;
  }
  </style>