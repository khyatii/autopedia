<template>
  <v-card class="mb-2 pa-2">
    <nuxt-link :to="'/single/article/' + article.id">
      <v-img
        :src="article.featuredImgSrc"
        height="200px"/>

      <v-card-text
        primary-title
        class="pb-2 px-1">
        <v-layout
          row
          align-center>
          <v-flex
            mr-2
            class="meca--post-icon-container">
            <v-icon color="red">mdi-text</v-icon>
          </v-flex>
          <v-flex>
            <h4 class="meca--txt-justify">{{ article.title }}</h4>
          </v-flex>
        </v-layout>
        <article>
          <p class="grey--text ma-0 mt-2  meca--txt-justify">{{ articlePreview }}</p>
        </article>
      </v-card-text>
    </nuxt-link>

    <v-card-actions class="pa-0">
      <v-spacer/>
      <v-btn
        flat
        color="red">
        Aimer</v-btn>
      <v-btn
        flat
        color="red">
        Partager</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Post',

  props: {
    article: {
      type: Object,
      default: null
    }
  },

  computed: {
    articlePreview: function() {
      return this.article.content.slice(0, 200) + '...'
    }
  }
}
</script>
