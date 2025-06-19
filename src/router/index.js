import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import SearchResult from '@/views/SearchResult.vue'
import Monitoring from '@/views/Monitoring.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/monitor',
      name: 'Monitoring',
      component: Monitoring
    }
    
  ]
})
