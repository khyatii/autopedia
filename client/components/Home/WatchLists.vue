<template>
  <v-card class="mb-2 pa-2">
    <v-img
      :src="watchlist.publishId.file[0].path"
      height="200px" />

    <!-- <v-card-title>
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
      <v-btn flat color="#1f568c" v-on:click="postlike()">Like <i class="fas fa-heart"></i></v-btn>
      <v-btn flat color="#1f568c" v-on:click="postwatchlist()">Watchlist <i class="fas fa-bell"></i></v-btn>
    </v-card-actions> -->

  </v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  name: 'Watchlists',
  data() {
    return {
    }
  },
  props: {
    watchlist: {
      type: Object,
      default: null
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped>
.fas{
  font-size: 18px !important;
  padding-left: 7px !important;

}
</style>
