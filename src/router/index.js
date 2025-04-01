import { createRouter, createWebHistory } from 'vue-router'

// views
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ReservationView from '@/views/ReservationView.vue'
import MyPageView from '@/views/MyPageView.vue'
import AdminView from '@/views/AdminView.vue'

// components directly used as views
import ParticipantList from '@/components/ParticipantList.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/reserve/:eventId', name: 'reserve', component: ReservationView },
  { path: '/mypage', name: 'mypage', component: MyPageView },
  { path: '/admin', name: 'admin', component: AdminView },
  { path: '/admin/participants/:eventId', name: 'participants', component: ParticipantList },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router