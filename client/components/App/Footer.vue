<template>
  <v-bottom-nav
    :active.sync="theActiveTab"
    :value="true"
    app
    color="white">

    <!-- <v-btn
      :color="activeColor"
      flat
      nuxt
      to="/"
      value="home">
      <span>Accueil</span>
      <v-icon>mdi-home</v-icon>
    </v-btn> -->

    <v-btn
      :color="activeColor"
      flat
      nuxt
      to="/feed"
      value="feed">
      <span>Découvrir</span>
      <v-avatar
        size="24"
        class="mb-1">
        <img
          src="~/static/car-light-dimmed.svg">
      </v-avatar>
    </v-btn>



    <!-- <v-btn
      :color="activeColor"
      flat
      nuxt
      to="/medias"
      value="medias">
      <span>Médias</span>
      <v-icon>mdi-play-circle-outline</v-icon>
    </v-btn> -->

    <v-btn
      :color="activeColor"
      flat
      nuxt
      to="/autopedia/car/507"
      value="autopedia">
      <span>Autopédia</span>
      <v-icon>mdi-book-open-page-variant</v-icon>
    </v-btn>
  </v-bottom-nav>

</template>

<script>
export default {
  name: 'MecaFooter',

  props: {
    activeTab: {
      type: String,
      default: null
    }
  },

  computed: {
    activeColor: function() {
      return this.$store.state.colors.mecaBlue
    },
    theActiveTab: {
      get: function() {
        return this.$store.state.activeFooterTab
        // return this.activeTab
      },
      set: function(value) {
        this.$store.commit('updateFooterTab', 'medias')
        // return value
      }
    }
  }
}
</script>
