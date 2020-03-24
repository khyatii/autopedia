<template>
  <div>
    <v-card class="mb-2 pa-2" v-if="basePage">
      <v-img
        :src="photo.file[0].path"
        height="200px"/>

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
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn flat color="#1f568c" dark v-on="on">Share <i class="fas fa-share"></i></v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                <i class="fas fa-times" style="color:#275a8e" @click="dialog = false"></i>
                <span style="color:#8297b4">Share</span>
                <hr style="background:#90acc7; height: 1px; margin-top: -12px">
              </v-card-title>
              <div class= "row" v-on:click="shareOnprofile()">
                <div class= "col-md-4 col-sm-4 col-xs-4"> <i class="fas fa-user-circle" style="color:#1f568c"></i> </div>
                <div class= "col-md-8 col-sm-8 col-xs-8" style="color:#5078a2">On my profile</div>
              </div> 

                <div class= "row ml-4">
                  <!-- <div class= "col-md-4 col-sm-4 col-xs-4"> <i class="fas fa-envelope" style="color:#1f568c"></i> </div> -->
                  <email :url="photo.file[0].path" subject="Hello" scale="2"></email>
                  <div class= "col-md-8 col-sm-8 col-xs-8 ml-1" style="color:#5078a2; text-align: center;">Mail</div>
                </div>

                <div class= "row ml-4">
                  <!-- <div class= "col-md-4 col-sm-4 col-xs-4"> <i class="fab fa-whatsapp" style="color:#1f568c"></i> </div> -->
                  <whats-app :url="photo.file[0].path" :title="Hello" scale="2"></whats-app>
                  <div class= "col-md-8 col-sm-8 col-xs-8 ml-1" style="color:#5078a2; text-align: center;">Whatsapp</div>
                  <!-- <no-ssr placeholder="loading..."> -->
                    
                  <!-- </no-ssr> -->
                </div>

                <div class= "row">
                  <div class= "col-md-4 col-sm-4 col-xs-4"> <i class="fas fa-comment" style="color:#1f568c"></i> </div>
                  <div class= "col-md-8 col-sm-8 col-xs-8" style="color:#5078a2">Messages</div>
                </div>

              </v-card>
            </v-dialog>
          </v-layout>
        <v-btn flat color="#1f568c" v-on:click="postlike()">Like <i class="fas fa-heart"></i></v-btn>
        <v-btn flat color="#1f568c" v-on:click="postwatchlist()">Watchlist <i class="fas fa-bell"></i></v-btn>
      </v-card-actions>

    </v-card>
    <div v-if="openEditor">
      <text-editor :srcImage="photo"></text-editor>
    </div>
  </div>
</template>

<script>
import TextEditor from '~/components/TextEditor'
  // import { whatsApp } from 'vue-socialmedia-share';
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  name: 'Post',
  data() {
    return {
      dialog: false,
      url: 'dvssdv',
      openEditor:false,
      basePage: true
    }
  },
  props: {
    photo: {
      type: Object,
      default: null
    }
  },
  components: {
    // WhatsApp,
    TextEditor
  },
  created() {
    this.getlikes()
  },
  computed: {
    // tags: function() {
    //   return '#' + this.photo.tags.join(' #')
    // }
  },
  methods: {
    postlike(){
      // AuthenticationService.postData_onlogin('like',{
      //   publishId: this.photo._id,
      //   like_status: true,
      //   count: this.photo.count.length
      // }, config).then((response)=>{
      //   console.log('resp',response)
      //   if(response.data.message == 'profilePic_updated'){
      //     this.getuserInfo()
      //   }
      // }).catch((error)=>{
      //   console.log('error',error.response.data.message)
      // })
    },
    getlikes(){
      
      var config = { headers: { 'Content-Type': 'application/json', 'token': localStorage.accessToken} };
        AuthenticationService.getData('discover/getLikeCounts', config)
        .then((response)=>{
          console.log('resp get likes',response)
          // this.likes = response.data
        }).catch((error)=>{
          console.log('error',error.response)
      })
    },
    postwatchlist(){
        
      var config = { headers: {'token': localStorage.accessToken} };
       AuthenticationService.postData_onlogin('discover/watchlist',{
         publishId: this.photo._id
       }, config).then((response)=>{
        //  console.log('resp',response)
         if(response.data.message == 'success'){
          alert('successfully added to watchlists')         
         }
       }).catch((error)=>{
         console.log('error',error.response.data.message)
       })
    },

    shareOnprofile(){
      this.basePage = false
      this.openEditor = true
    }
  },
}
</script>

<style scoped>
.fas{
  font-size: 18px !important;
  padding-left: 7px !important;
}

.row{
  margin-left: 0px;
  margin-right: 0px;
}
</style>
