import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'

Vue.use(Router)
const routerPath = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = new Router({
  routes: routerPath
})

router.beforeEach((to, from, next) => {
  // ...
  const routerRedirect = routerPath.map(value => value.name)
  let isLogin = localStorage.getItem('token')
  if (routerRedirect.indexOf(to.name) >= 0 && !isLogin) {
    if (to.name.indexOf('Login') >= 0) {
      next()
    } else {
      console.log(12)
      next({name: 'Login'})
    }
  } else {
    if (isLogin && routerRedirect.indexOf(to.name) >= 0) {
      next({name: Hello})
    } else {
      next()
    }
  }
})

export default router
