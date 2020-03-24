<template>
  <div @click="$store.commit('hideResults')">
    <v-list
      id="meca--search-results"
      class="py-0">
      <v-list-tile
        avatar
        class="meca--bg-white"
        nuxt
        to="/autopedia/car/507">
        <v-list-tile-content>
          <v-list-tile-title v-text="'BMW - 507'"/>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <img :src="'/507/1.jpg'">
        </v-list-tile-avatar>
      </v-list-tile>

      <v-list-tile
        avatar
        class="meca--bg-white"
        nuxt
        to="/autopedia/car/tipo33">
        <v-list-tile-content>
          <v-list-tile-title v-text="'Alfa Roméo - Tipo 33'"/>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <img :src="'/tipo33/7.jpg'">
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',

  computed: {
    headerHeight() {
      return this.$store.state.headerHeight
    }
  }
}
</script>

<style lang="sass" scoped>
#meca--search-results
  position: fixed
  width: 100%
  top: 56px
  bottom: 0
  z-index: 999999
  background-color: rgba(33,33,33,.48)
</style>
