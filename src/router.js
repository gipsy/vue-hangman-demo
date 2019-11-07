import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hangman',
      component: () => import(/* webpackChunkName: "hangman" */ './views/Hangman.vue')
    },
    {
      path: '/hangman/:suggestedWord',
      name: 'hangman',
      component: () => import(/* webpackChunkName: "hangman" */ './views/Hangman.vue'),
      props: true
    }
  ]
})
