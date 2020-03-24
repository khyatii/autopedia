<template>
    <div>
      <div v-if="this.$store.state.frontpage">
        <v-toolbar
          app
          dark
          absolute
          class="pa-0"
          id="meca--header"
          style="background:#366696">
          <v-container
          
            fluid
            pa-0
            fill-height>
            <v-layout align-center>
              <v-flex>
                <nuxt-link to="">
                  <div @click="$router.go(-1)">
                    <v-icon>mdi-arrow-left</v-icon>
                  </div>
                </nuxt-link>
              </v-flex>
    
                <v-btn style="background-color: #325272;background-color: #325272;border: 1.5px solid white;border-radius: 8px;" v-on:click="publish()">Publish</v-btn>
              
            </v-layout>
          </v-container>
        </v-toolbar>
        <v-container class= "mt-5">
            <text-editor :sendForm="sendForm"></text-editor>
            <hr class="new1">
            <div class="ml-2 labels">
                <v-icon class= "ml-4 icons camera" @click="camerafunc()">camera_alt</v-icon>
                <label for="file-input">
                    <v-icon class= "ml-4 icons image">add_to_photos</v-icon>
                </label>
                <input id="file-input" type="file" name="file" v-on:change="onFileChanged" />

                <v-icon class= "ml-4 icons car" >airport_shuttle</v-icon>
                <v-icon class= "ml-4 icons user" >person</v-icon>
                <v-icon class= "ml-4 icons location">add_location</v-icon>

                <!-- <div class="image-upload" style="float:right"> -->
                  
                <!-- </div> -->

            </div>
        </v-container>
      </div>
      <div v-if="this.$store.state.gotocamera">
          <camera-on></camera-on>

      </div>
    </div>
</template>

<script>
import CameraOn from '~/components/CameraOn'
import TextEditor from '~/components/TextEditor'
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  layout (context) {
    return 'discover'
  },
  components:{
      CameraOn,
      TextEditor
  },
  data() {
      return {
        sendForm: false, selectedFile: ''
      }
  },
  methods: {
      camerafunc(){
        this.$store.state.frontpage = false
        this.$store.state.gotocamera = true
      },
      publish(){
        this.sendForm = true
        localStorage.src = ''
      },

      onFileChanged (event) { 
        this.selectedFile = event.target.files[0]
        this.onUpload()
      },

      async onUpload() {
        var config = { headers: {'Content-Type': 'multipart/form-data', 'token': localStorage.accessToken} };
          let formData = new FormData();
          formData.append('file', this.selectedFile);
          AuthenticationService.postData_onlogin('discover/publish',formData,
           config).then((response)=>{
            console.log('resp',response)
            if(response.data.message == 'success'){
              this.$router.push('feed')
            }
          }).catch((error)=>{
            console.log('error',error.response.data.message)
          })
      },
  },
}
</script>

<style scoped>
.icons{
  font-size:30px; 
  color:#1f568c; 
  cursor: pointer;
}
hr.new1 {
  border-top: 1px solid #1f568c;
}
#file-input {
  display: none;
}
</style>
