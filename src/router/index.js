import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'
import SignUp from '@/components/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path : "/signup",
      name : "SignUp",
      component : SignUp
    },
    {
      path : '/chat',
      name : 'Chat',
      component : Chat,
      props : true
    }
  ]
})
