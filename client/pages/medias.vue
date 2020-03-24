<template>
  <div>
    <v-toolbar
      dense
      color="white"
      class="meca--toolbar-no-padding meca--tabs">
      <v-tabs
        v-model="active"
        slider-color="blue"
        fixed-tabs>
        <v-tab>Vidéos</v-tab>
        <v-tab>Photos</v-tab>
        <v-tab>Articles</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items
      v-model="active"
      touchless
      class="meca--tabs-content">
      <v-tab-item>
        <v-card
          flat
          class="meca--bg-transparent">
          <v-card-text class="pa-2">
            <x-scroll
              slot="videos"
              :videos="videos"
              base-page="medias"
              section-title="Videos"/>
            <x-scroll
              slot="videos"
              :videos="videos"
              base-page="medias"
              section-title="Videos"/>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card
          flat
          class="meca--bg-transparent">
          <!-- <photos-section :photos="photos"/> -->
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card
          flat
          class="meca--bg-transparent">
          <v-container
            px-2
            pt-2
            pb-0>
            <!-- <articles-section
              v-for="article in articles"
              :key="`medias-art-${article.id}`"
              :article="article"/> -->
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import XScroll from '~/components/App/XScroll'
// import PhotosSection from '~/components/Medias/Section/Photos'
// import ArticlesSection from '~/components/Medias/Section/Articles'

export default {
  name: 'MediasTabs',

  layout: 'main',

  components: {
    XScroll,
    // PhotosSection,
    // ArticlesSection
  },

  data() {
    return {
      active: 0
    }
  },

  computed: {
    videos: function() {
      return this.$store.state.medias.videos
    },
    photos: function() {
      return this.$store.state.medias.photos
    },
    articles: function() {
      return this.$store.state.medias.articles
    }
  },

  created() {
    this.$store.commit('updateFooterTab', 'medias')
  },
  mounted() {
    this.$store.commit('stickyTabs')
  }
}
</script>
