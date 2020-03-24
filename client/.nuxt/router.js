import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _012ac7f0 = () => interopDefault(import('../pages/account.vue' /* webpackChunkName: "pages/account" */))
const _76782358 = () => interopDefault(import('../pages/changepassword.vue' /* webpackChunkName: "pages/changepassword" */))
const _ed577110 = () => interopDefault(import('../pages/emailVerify.vue' /* webpackChunkName: "pages/emailVerify" */))
const _4c0c876b = () => interopDefault(import('../pages/feed.vue' /* webpackChunkName: "pages/feed" */))
const _e975d226 = () => interopDefault(import('../pages/feeds_action.vue' /* webpackChunkName: "pages/feeds_action" */))
const _33a49dec = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _2065551c = () => interopDefault(import('../pages/medias.vue' /* webpackChunkName: "pages/medias" */))
const _e56de6b6 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _13224c5f = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _69fcfad5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/account",
      component: _012ac7f0,
      name: "account"
    }, {
      path: "/changepassword",
      component: _76782358,
      name: "changepassword"
    }, {
      path: "/emailVerify",
      component: _ed577110,
      name: "emailVerify"
    }, {
      path: "/feed",
      component: _4c0c876b,
      name: "feed"
    }, {
      path: "/feeds_action",
      component: _e975d226,
      name: "feeds_action"
    }, {
      path: "/login",
      component: _33a49dec,
      name: "login"
    }, {
      path: "/medias",
      component: _2065551c,
      name: "medias"
    }, {
      path: "/signup",
      component: _e56de6b6,
      name: "signup"
    }, {
      path: "/test",
      component: _13224c5f,
      name: "test"
    }, {
      path: "/",
      component: _69fcfad5,
      name: "index"
    }],

    fallback: false
  })
}
