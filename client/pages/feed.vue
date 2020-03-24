<template>
  <div>
    <v-container fluid style="background: white;">
     <div class="header_post_feeds">
      <span style="color:#7b9cbc!important; font-size: 15px; cursor: pointer" v-on:click="clickFortext()">Say something</span>
       <v-icon class= "camera" style="">camera_alt</v-icon>
    </div>
  </v-container>
  <v-container
    fluid
    class="px-2  pb-0">
   
    <video-post
      v-for="video in videos"
      :key="'feed-vid-' + video.id"
      :video="video"/>
    <photo-post
      v-for="photo in photos"
      :key="'feed-img-' + photo.file[0].id"
      :photo="photo"/>
    <article-post
      v-for="article in articles"
      :key="'feed-art-' + article.id"
      :article="article"/>
    <autopedia-page
      v-for="page in autopediaPages"
      :key="'feed-auto-' + page.id"
      :autopedia-page="page"/>
  </v-container>
  </div>
</template>

<script>
import VideoPost from '~/components/Home/VideoPost'
import PhotoPost from '~/components/Home/PhotoPost'
import ArticlePost from '~/components/Home/ArticlePost'
import AutopediaPage from '~/components/Home/AutopediaPost'

import AuthenticationService from '@/services/AuthenticationService.js'
// import DiscoverText from '~/components/discover/DiscoverText'

export default {
  layout: 'main',
 
  data() {
    return {
      photos:[]
      // firstpage: true,
      // secondpage: false,
      // checkSomethingYouWant: true
    }
  },
  components: {
    VideoPost,
    PhotoPost,
    ArticlePost,
    AutopediaPage,
    // DiscoverText
  },
  // computed: {
  //   videos: function() {
  //     return this.$store.state.home.videos
  //   },
  //   photos: function() {
  //     return this.$store.state.home.photos
  //   },
  //   articles: function() {
  //     return this.$store.state.home.articles
  //   },
  //   autopediaPages: function() {
  //     return this.$store.state.home.autopediaPages
  //   }
  // }
  created() {
    // this.fetchphotos()
    this.$store.commit('updateFooterTab', 'feed')
    
  },
  computed: {
    
    // photos: function() {
    // this.fetchphotos()
    //    return this.$store.state.home.photos
    // },
    videos: function() {
      return this.$store.state.home.videos
    },
    
    articles: function() {
      return this.$store.state.home.articles
    },
    autopediaPages: function() {
      return this.$store.state.home.autopediaPages
    }
  },
  mounted() {
    this.fetchphotos()
  },
  methods: {
    // photos() {
    //   return this.$store.state.home.photos
    // },
    fetchphotos(){
      var config = { headers: {'token': localStorage.accessToken}};
      const response =  AuthenticationService.getData('discover/feeds', config)
      .then((response)=>{
          console.log('resp',response)
          this.$store.state.home.photos = response.data
          this.photos = this.$store.state.home.photos
      }).catch((error)=>{
        console.log('error',error.response.data.message)
      })
    },
    clickFortext(){
      this.$router.push('/feeds_action')
    },

    
  },
}
</script>

<style scoped>
.camera{
  float: right;
  font-size:30px; 
  color:#1f568c; 
  cursor: pointer;
  margin-top: -3px;
}
</style>
