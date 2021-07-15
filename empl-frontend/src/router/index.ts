import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import i18n from "../i18n";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Login,
    name: i18n.t("titles.auth").toString(),
    meta: {
      title: i18n.t("titles.auth").toString()
    }
  },
  {
    path: '/register',
    component: Register,
    name: i18n.t("titles.registration").toString(),
    meta: {
      title: i18n.t("titles.registration").toString()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title
  next()
})

export default router
