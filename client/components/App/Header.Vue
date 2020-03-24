<template>
  <div>
      <!-- scroll-off-screen -->
      <!-- :scroll-threshold="scrollThreshold" -->
    <v-toolbar
      :color="fillColor"
      app
      dark
      absolute
      class="pa-0"
      id="meca--header">
      <v-container
        fluid
        pa-0
        fill-height>
        <v-layout align-center>
          <v-flex xs2>
            <nuxt-link to="">
              <div @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
              </div>
            </nuxt-link>
          </v-flex>

          <v-flex xs8>
            <v-text-field
              @focus="$store.commit('showResults')"
              class="pa-0"
              dark
              color="white"
              placeholder="Rechercher"
              append-outer-icon="search"
              clearable
              hide-details
              clear-icon="mdi-close-circle"/>
          </v-flex>

          <v-flex
            xs2
            justify-end>
            <nuxt-link to="/account">
              <v-avatar
                :size="42"
                style="float:right">
                <img
                  class="elevation-2"
                  src="~/static/booba.jpeg"
                  alt="Booba"
                  title="Booba">
              </v-avatar>
            </nuxt-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-toolbar>
    <search-results v-if="$store.state.resultsVisible"/>
  </div>
</template>

<script>
import SearchResults from '~/components/App/SearchResults'

export default {
  name: 'MecaHeader',

  components: {
    SearchResults
  },

  data() {
    return {
      // scrollThreshold: 32
      // scrollThreshold: 1
    }
  },

  computed: {
    fillColor() {
      return this.$store.state.colors.mecaBlue
    }
  }
}
</script>
