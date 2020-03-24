<template>
  <v-card class="mb-2">
    <div class="GalleryVideoWrapper">
      <iframe
        :src="'https://www.youtube.com/embed/' + video.youtubeId"
        width="100%"
        height="200px"
        seamless
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen/>
    </div>

    
    <!-- <v-card-title
      primary-title
      class="pa-2">
      <v-layout
        row
        align-center>
        <v-flex
          mr-2
          class="meca--post-icon-container">
          <v-icon color="blue">mdi-video</v-icon>
        </v-flex>
        <v-flex>
          <span class="grey--text">{{ tags }}</span>
        </v-flex>
      </v-layout>
    </v-card-title> -->

    <v-card-title>
      <div class="" style="width:100%">
        <div class="" style="width:65%">
          <v-icon color= "#1f568c" style="font-size:30px;">account_circle</v-icon>
          <span class="pl-1" style="color:#2e6193; vertical-align: super;">User name</span>
          <p class="ml-5" style="color:grey; font-size:8px">2 days ago</p>
        </div>
        <div class="" style="width:30%; float:right">
          <span style="color:grey">45</span>
          <i class="fas fa-heart" style="color:grey"></i>
        </div>
      </div>
      
      <div class="">
        <span style="color:#2e6193">text</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="#1f568c">Share <i class="fas fa-share"></i></v-btn>
      <v-btn flat color="#1f568c">Like <i class="fas fa-heart"></i></v-btn>
      <v-btn flat color="#1f568c">Watchlist <i class="fas fa-bell"></i></v-btn>
    </v-card-actions>

    <!-- <v-card-actions>
      <v-spacer/>
      <v-btn
        flat
        color="blue">
        Aimer</v-btn>
      <v-btn
        flat
        color="blue">
        Partager</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  name: 'Post',

  props: {
    video: {
      type: Object,
      default: null
    }
  },

  computed: {
    tags: function() {
      return '# ' + this.video.tags.join(' #')
    }
  }
}
</script>

<style scoped>
.fas{
  font-size: 18px !important;
  padding-left: 7px !important;

}
</style>

