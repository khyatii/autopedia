<template>
  <v-app>
    <meca-header/>
    
    <v-content style="background-color: #EFEBE9; postion: relative">
      <router-view/>
    </v-content>

    <meca-footer/>
  </v-app>
</template>

<script>
// import Header from '~/components/App/Header'
import mecaHeader from '@/components/App/test.vue'
import Footer from '~/components/App/Footer'

export default {
  components: {
    // mecaHeader: Header,
    mecaHeader,
    mecaFooter: Footer
  },
}
</script>

<style lang="sass" src="~/assets/style/app.sass"/>
