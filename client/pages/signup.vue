<template>
<div>
  <mecaHeader/>
  <v-layout align-center justify-space-around row wrap fill-height>
    <v-flex xs12>
      <div style="background-image: url('/mecanicus_head_white.svg'); background-size:contain; background-position:center; height:200px"/>
      <h1 class="text-xs-center">Mecanicus</h1>
    </v-flex>

    <v-flex xs5>
        <v-card
          :color="'white'"
          nuxt
          to="/feed">
          <v-card-text class="text-xs-center">
            <v-icon>mdi-magnify</v-icon>
            <p>Découvrir</p>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex xs5>
        <v-card
          :color="'white'"
          nuxt
          to="/medias">
          <v-card-text class="text-xs-center">
            <v-icon>mdi-play-circle-outline</v-icon>
            <p>Médias</p>
          </v-card-text>

        </v-card>
    </v-flex>
    <v-flex xs5>
        <v-card
          :color="'white'"
          nuxt
          to="/autopedia/car/507">
          <v-card-text class="text-xs-center">
            <v-icon>mdi-book-open-page-variant</v-icon>
            <p>Autopédia</p>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex xs5>
        <v-card
          :color="'white'"
          nuxt
          to="/account">
          <v-card-text class="text-xs-center">
            <v-icon>mdi-account</v-icon>
            <p>Mon compte</p>
          </v-card-text>
        </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import mecaHeader from '@/components/App/test.vue'
export default {
  layout: 'main',
  components: {
    mecaHeader
  },
}
</script>

<style lang="sass" scoped>
h1
  color: white

p
  margin: 0
  margin-top: 13px

i
  font-size: 52px
  color: #18578C !important
</style>
