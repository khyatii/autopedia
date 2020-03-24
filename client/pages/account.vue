<template>
  <v-container fluid>
    <v-container v-if="pagelay">
      <v-layout
        row
        wrap
        justify-center>
        <v-avatar
          :size="143"
          color="grey lighten-4"
          class="elevation-3">
          <img
            :src="profileimage"
            :alt="displayName"
            :title="displayName">
        </v-avatar>

        <v-flex xs10>
          <h2 class="meca--username">{{ this.item.userName }}</h2>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container style="background: white" v-if="pagelay">
      <v-icon class= "far fa-user" style="width: 25%; color:#1f568c" @click="userprofile" >far fa-user</v-icon>
      <!-- <span style="width: 25%;color:#1f568c">Profile</span> -->
      <v-icon class= "s-icons" style="width: 25%;color:#1f568c" @click="addCarsList">watchlist</v-icon>
      <!-- <span style="width: 25%;color:#1f568c">Watchlists</span> -->
      <v-icon class= "s-icons" style="width: 25%;color:#1f568c">contacts</v-icon>
      <!-- <span style="width: 25%;color:#1f568c">Contacts</span> -->
      <v-icon class= "s-icons" style="width: 20%;color:#1f568c">settings</v-icon>
      <!-- <span style="width: 25%;color:#1f568c">Settings</span> -->
   </v-container>

    <v-container style="background: white" v-if="fausers">
      <div class="" style="padding:0px 25px;">
        <v-avatar :size="143" color="grey lighten-4" class="elevation-3">
          <img :src="profileimage" :alt="displayName" :title="displayName">
        </v-avatar>
        <label for="file-input">
          <span style="paddding-left:25px !important;color:#7295b7">Change picture</span>
        </label>
        <input id="file-input" type="file" name="file" v-on:change="onFileChanged" />
      </div>

      <form>
        <div class= "label-row pt-5">
          <div class= "label-div">
            <p>Last Name</p>
          </div>
          <div class= "label-field">
            <v-text-field :value="item.lastName" class= "remove-attr" readonly  @change="fieldchanged(0,{name: 'lastName'},item.lastName,$event)"></v-text-field>
          </div>
          <div class= "label-edit">
             <v-icon class= "s-icons" style="width: 20%;color:#7295b7" color="blue darken-2" v-on:click="editform(0)">edit</v-icon>
          </div>
        </div>

        <div class= "label-row">
          <div class= "label-div">
            <p>First Name</p>
          </div>
          <div class= "label-field">
            <v-text-field :value="item.firstName" class= "remove-attr" readonly @change="fieldchanged(1,{name: 'firstName'},item.firstName,$event)"></v-text-field>
          </div>
          <div class= "label-edit">
             <v-icon class= "s-icons" style="width: 20%" color="blue darken-2" v-on:click="editform(1)">edit</v-icon>
          </div>
        </div>
        
        <div class= "label-row">
          <div class= "label-div">
            <p>User Name</p>
          </div>
          <div class= "label-field">
            <v-text-field :value="item.userName" class= "remove-attr" required readonly @change="fieldchanged(2,{name: 'userName'},item.userName,$event)"></v-text-field>
          </div>
          <div class= "label-edit">
             <v-icon class= "s-icons" style="width: 20%" color="blue darken-2" v-on:click="editform(2)">edit</v-icon>
          </div>
        </div>

        <br>

        <p>Private Info</p>
        <hr>

        <div class= "label-row">
          <div class= "label-div">
            <p>Email</p>
          </div>
          <div class= "label-field">
            <v-text-field :value="item.email" class= "remove-attr" required readonly @change="fieldchanged(3,{name: 'email'},item.email,$event)"></v-text-field>
          </div>
          <div class= "label-edit">
             <v-icon class= "s-icons" style="width: 20%" color="blue darken-2" v-on:click="editform(3)">edit</v-icon>
          </div>
        </div>

        <div class= "label-row">
          <div class= "label-div">
            <p>Birth Date</p>
          </div>
          <div class= "label-field">
            <!-- <v-text-field :value="item.birthdate" class= "remove-attr" readonly  @change="fieldchanged(4,{name: 'birthdate'},item.birthdate,$event)"></v-text-field> -->

            <v-flex xs12 sm6 md3 style="margin:0 auto">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                style="top: 234px; left: 37px;"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                  
                    v-model="date"
                    label="Birthday date"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                  header-color= "#5f85bc"
                  light: true
                  
                ></v-date-picker>
              </v-menu>
            </v-flex>


          </div>
          <div class= "label-edit">
             <v-icon class= "s-icons" style="width: 20%" color="blue darken-2" v-on:click="editform(4)">edit</v-icon>
          </div>
        </div>

        <div class= "label-row">
          <div class= "label-div">
            <p>Gender</p>
          </div>
          <div class= "label-field">
            <!-- <v-text-field :value="item.gender" class= "remove-attr" readonly @change="fieldchanged(5,{name: 'gender'},item.gender,$event)"></v-text-field> -->
            <v-flex xs12 sm6 md-3 d-flex style= "max-width:100%">
                <v-select
                  :items="items"
                  :value="item.gender"
                  :readonly="myVar"
                  class= "remove-attr"  @change="fieldchanged(5,{name: 'gender'},item.gender,$event)"
                ></v-select>
              </v-flex>
          </div>
          <div class= "label-edit">
             <v-icon class= "s-icons" style="width: 20%" color="blue darken-2" v-on:click="editform(5)">edit</v-icon>
          </div>
        </div>

        <div class= "label-row">
          <div class= "label-div">
            <p>Address</p>
          </div>
          <div class= "label-field">
            <v-text-field :value="address" class= "remove-attr" readonly  @change="fieldchanged(6,{name: 'address'},item.address,$event)"></v-text-field>
          </div>
          <div class= "label-edit">
             <v-icon class= "s-icons" style="width: 20%" color="blue darken-2" v-on:click="editform(6)">edit</v-icon>
          </div>
        </div>
      </form>
    </v-container>

      <div v-if="usersaves">
        <v-container style="background: white" class="mt-3 mywatchlists">
        <div class="">
          <i class="fas fa-star" style="color:#1f568c;float:left"></i>
          <p class="ml-5" style="font-weight:500; color:#4f78a4 !important">MY WATCHLIST</p>
          <hr style="background:#90acc7; height: 1px; margin-top: -12px">
        </div>
        <div class="showwatchlists">
          <watch-lists
            v-for="watchlist in watchlists"
            :key="watchlist.publishId._id"
            :watchlist="watchlist"/>
        </div>
      </v-container>

      <v-container style="background: white" class="mt-3 mypublications">
        <div class="">
          <i class="fas fa-edit" style="color:#1f568c;float:left"></i>
          <p class="ml-5" style="font-weight:500; color:#4f78a4 !important">MY PUBLICATIONS</p>
          <hr style="background:#90acc7; height: 1px; margin-top: -12px">
        </div>
        <div class="publications">
          <my-publications
            v-for="publication in publications"
            :key="publication.file[0]._id"
            :publication="publication"/>
        </div>
      </v-container>
      </div>
      <div v-if="addCars">
        <add-cars></add-cars>
      </div>
  </v-container>
</template>

<script>
import XScroll from "~/components/App/XScroll";
import AuthenticationService from '@/services/AuthenticationService.js'
import userdetails from "@/services/userDetails";
import WatchLists from '~/components/Home/WatchLists'
import MyPublications from '~/components/Home/MyPublications'
import AddCars from '~/components/Home/AddCars'

// import VeeValidate from 'vee-validate'
export default {
  layout: "main",
  data() {
    return {
      selectedFile: '',
      date: null,
      menu:false,
      myVar: true,
      address: '',
      item: [{userName: '', lastName: '', firstName: '', email: '', birthdate:  '', gender: ''}],
      items: ['Male', 'Female'],
      profileimage: '',

      fausers: false,
      pagelay: false,
      usersaves: false,
      addCars: true,

      watchlists: [],
      publications: [],
    };
  },
  components: {
    XScroll,
    WatchLists,
    MyPublications,
    AddCars
    // VeeValidate
  },
  watch: {
     menu (val) {
          val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    displayName() {
      return this.$store.getters["users/displayName"];
    }
  },
  created() {
    this.$store.commit("updateFooterTab", "account");
    this.getuserInfo();
  },
  mounted() {
    this.getwatchlists()
    this.getmypublications()
  },
  methods: {
     save (date) {
      this.$refs.menu.save(date)
    },
     changefocus(x){
      if(this.$el.getElementsByClassName('s-icons')[x].innerText == 'edit'){
        if(x==5){
          this.$el.getElementsByClassName('s-icons')[x].innerText= 'cancel'
          // this.$el.getElementsByClassName('v-select__selections')[0].children[1].focus()
          // this.$el.getElementsByClassName('v-select__selections')[0].children[1].removeAttribute('aria-readonly')
          // this.$el.getElementsByClassName('v-select__selections')[0].children[1].removeAttribute('readonly')
          this.myVar = false
        }else if(x==6){
          this.$el.getElementsByClassName('s-icons')[x].innerText= 'cancel'
          this.$el.getElementsByClassName('v-text-field__slot')[5].children[0].focus()
          this.$el.getElementsByClassName('v-text-field__slot')[5].children[0].removeAttribute('readonly')
        }else{
          for(var i =0; i< this.$el.getElementsByClassName('v-text-field__slot').length; i++){
          this.$el.getElementsByClassName('s-icons')[x].innerText= 'cancel'
          this.$el.getElementsByClassName('v-text-field__slot')[x].children[0].focus()
          this.$el.getElementsByClassName('v-text-field__slot')[x].children[0].removeAttribute('readonly')
          }
        }
        
      }else if(this.$el.getElementsByClassName('s-icons')[x].innerText == 'cancel'){
        if(x==5){
          this.$el.getElementsByClassName('s-icons')[x].innerText= 'edit'
           this.myVar = true
          // this.$el.getElementsByClassName('v-text-field__slot')[x].children[0].readOnly = true
        }else if(x==6){
          this.$el.getElementsByClassName('s-icons')[x].innerText= 'edit'
          this.$el.getElementsByClassName('v-text-field__slot')[5].children[0].readOnly = true
        }else{
          for(var i =0; i< this.$el.getElementsByClassName('v-text-field__slot').length; i++){
            this.$el.getElementsByClassName('s-icons')[x].innerText= 'edit'
            this.$el.getElementsByClassName('v-text-field__slot')[x].children[0].readOnly = true
          }
        }
        
      }

    },
    async getuserInfo() {
      const userdetail = await userdetails.getusedetails();
      // console.log('userdetail',userdetail);
      this.item.userName = userdetail.userName;
      this.item.lastName = userdetail.lastName
      this.item.firstName = userdetail.firstName
      this.item.email = userdetail.email
      this.item.birthdate = userdetail.dob
      this.item.gender = userdetail.gender
      this.address = userdetail.address
      this.profileimage = userdetail.photo
    },

    editform(x){
      this.changefocus(x)
    },
     fieldchanged(x,value,ovalue,event){
      this.changefocus(x)
      var config = { headers: {'token': localStorage.accessToken} };
      if(ovalue != event){
        if(value.name == 'lastName'){
          this.item.lastName = event
        }else if(value.name == 'firstName'){
          this.item.firstName = event
        }
        else if(value.name == 'userName'){
         this.item.userName = event
        }
        else if(value.name == 'email'){
          this.item.email = event
        }
        else if(value.name == 'birthdate'){
          this.item.birthdate = event
        }
        else if(value.name == 'gender'){
          this.item.gender = event
        }
        else if(value.name == 'address'){
          this.address = event
        }
      }

      const response =  AuthenticationService.postData_onlogin('updateProfile',{
        firstName: this.item.firstName,
        lastName: this.item.lastName,
        userName: this.item.userName,
        email: this.item.email,
        gender: this.item.gender,
        dob: this.item.birthdate,
        address: this.address
      }, config)
      // console.log('responseinupdateprofile',response)
    },


    onFileChanged (event) { 
        this.selectedFile = event.target.files[0]
        this.onUpload()
    },

    onUpload() {
        var config = { headers: {'Content-Type': 'multipart/form-data', 'token': localStorage.accessToken} };
          let formData = new FormData();
          formData.append('photo', this.selectedFile);
          AuthenticationService.postData_onlogin('changeProfilePic',formData,
           config).then((response)=>{
            // console.log('resp',response)
            if(response.data.message == 'profilePic_updated'){
              this.getuserInfo()
            }
          }).catch((error)=>{
            console.log('error',error.response.data.message)
          })
      },

      userprofile(){
        this.fausers = !this.fausers
        this.pagelay = !this.pagelay
        this.usersaves = !this.usersaves
      },

      addCarsList(){
        this.addCars = !this.addCars
        this.pagelay = !this.pagelay
        this.usersaves = !this.usersaves
      },

      getwatchlists(){
        var config = { headers: { 'token': localStorage.accessToken} };
        AuthenticationService.getData('discover/myWatchlist', config)
        .then((response)=>{
          console.log('respwatchlist',response)
          this.watchlists = response.data
        }).catch((error)=>{
          console.log('error',error.response)
        })
       
      },

      getmypublications(){
        
        var config = { headers: { 'token': localStorage.accessToken} };
        AuthenticationService.getData('discover/myPublication', config)
        .then((response)=>{
          console.log('resp',response)
          this.publications = response.data
        }).catch((error)=>{
          console.log('error',error.response)
        })
      }
      
  }
};
</script>

<style scoped>
.meca--username {
  text-align: center;
  margin-top: 20px;
}
.elevation-3 {
  height: 75px !important;
  width: 75px !important;
}
.meca--username {
  color: #2c5f91;
}
.label-row{
  width:100%; 
  /* padding-top:20px; */
}
.label-div{
  width:25%; 
  display:inline-block; 
  font-size: 14px;
}
.label-field{
  width:60%; 
  display:inline-block; 
  font-size: 14px;
}
.label-edit{
  width:10%; 
  display:inline-block; 
  font-size: 14px;
}
p, input{
  color:#7295b7 !important;
}

#file-input{
  display: none;
}
</style>