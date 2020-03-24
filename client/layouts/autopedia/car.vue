<template>
  <app-layout>
    <router-view/>
  </app-layout>
</template>

<script>
import AppLayout from '~/components/App/AppLayout'

export default {
  components: {
    AppLayout
  },

mounted() {
    this.$store.commit('hideResults')
  },

updated() {
    this.$store.commit('hideResults')
  }
}
</script>
