import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ReservationForm from './components/ReservationForm.vue'
import DateForm from './components/DateForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
      {
        path: '/reservation',
          name: 'reservation',
          component: ReservationForm
      },
      {
        path: '/dates',
          name: 'dates',
          component: DateForm
      }
  ]
})
