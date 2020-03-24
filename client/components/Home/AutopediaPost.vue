<template>
  <v-card class="mb-2 pa-2">
    <nuxt-link :to="'/autopedia/car/' + autopediaPage.id">
      <v-img
        :src="autopediaPage.heroImage"
        :title="`${autopediaPage.make} - ${autopediaPage.model}`"
        height="200px"/>

      <v-card-text
        primary-title
        class="pb-2 pt-3 px-1">
        <v-layout
          row
          align-center>
          <v-flex class="meca--post-icon-container mr-2">
            <v-icon color="brown">mdi-book-open-page-variant</v-icon>
          </v-flex>
          <v-flex>
            <h4 >{{ autopediaPage.make }} - {{ autopediaPage.model }}</h4>
            <span
              v-if="autopediaPage.year_stop"
              class="grey--text ma-0 mt-2">
              {{ autopediaPage.year_start }} - {{ autopediaPage.year_stop }}
            </span>
            <span
              v-else
              class="grey--text ma-0 mt-2">
              {{ autopediaPage.year_start }}
            </span>
          </v-flex>
        </v-layout>
      </v-card-text>
    </nuxt-link>

    <v-card-actions class="pa-0">
      <v-spacer/>
      <v-btn
        flat
        color="brown">
        Aimer</v-btn>
      <v-btn
        flat
        color="brown">
        Partager</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AutopediaPost',

  props: {
    autopediaPage: {
      type: Object,
      default: null
    }
  }
}
</script>
