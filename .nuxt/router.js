import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _f55a8e00 = () => interopDefault(import('../pages/account.vue' /* webpackChunkName: "pages/account" */))
const _2600b05b = () => interopDefault(import('../pages/feed.vue' /* webpackChunkName: "pages/feed" */))
const _4df3020c = () => interopDefault(import('../pages/medias.vue' /* webpackChunkName: "pages/medias" */))
const _8a528cd6 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _25d31562 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _62e42036 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

const scrollBehavior = function(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/account",
      component: _f55a8e00,
      name: "account"
    }, {
      path: "/feed",
      component: _2600b05b,
      name: "feed"
    }, {
      path: "/medias",
      component: _4df3020c,
      name: "medias"
    }, {
      path: "/signup",
      component: _8a528cd6,
      name: "signup"
    }, {
      path: "/test",
      component: _25d31562,
      name: "test"
    }, {
      path: "/",
      component: _62e42036,
      name: "index"
    }],

    fallback: false
  })
}
