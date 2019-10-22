import Vue from 'vue'
import Router from 'vue-router'
import Application from '@/components/Application'
import LeaveList from '@/components/LeaveList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Application',
      component: Application
    },
    {
      path: '/leavelist',
      name: 'LeaveList',
      component: LeaveList
    }
  ]
})
