<template>
  <v-layout align-center justify-space-around row wrap fill-height  :style="`background-color: #efebe9;`">
    <div class= "create_dash mt-5" v-if="this.create_dash">
      <v-flex>
        <img src="../mecanicus_head_white_blue.png" style="background-size:contain; background-position:center; height:200px; display: block; margin: 0 auto;">
        <h1 class="text-xs-center">Mecanicus</h1>
      </v-flex>
     <v-flex xs12 text-xs-center mt-4>
      <div>
        <v-btn class= "btn-signup" v-on:click="create_account()">CREATE ACCOUNT</v-btn>
      </div>

      <p class= "btn-signup mt-4">Or sign in with</p>

      <div>
        <v-btn style="width:236px;" class= "mt-4" v-on:click="fbLogin()">
          <div style="padding:0px 20px;">
            <img src="../facebook.png" style="width: 23px;">
          </div>
          <span class= "btn-signup">Facebook</span></v-btn>
      </div>

      <div>
        <v-btn style="width:236px;" class= "btn-signup mt-4" v-on:click="onclickgoogle()">
          <div style="padding:0px 20px;">
            <img src="../google_plus.png" style="width: 23px;">
          </div>
          <span class= "btn-signup">Google</span></v-btn>
      </div>
     </v-flex>
      <div id="google-signin-btn"></div>
      <!-- <div v-on:click="signout()">signout</div> -->

    </div>


    <div class= "create_email" v-if="this.acc_steps">
      <v-flex xs12 text-xs-center mt-4>
      <v-icon class= "mt-2 ml-1 arrow_back" v-on:click="arrow_back">arrow_back</v-icon>
         <h2 class= "btn-signup mt-4">CREATE ACCOUNT</h2>
      </v-flex>
      
      <v-form>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12 sm6 md3 style="margin: 0 auto;" v-if="this.email_dash">
              <p class= "create_account-text">Whats your email address?</p>
              <v-text-field solo
                v-model="e_Mail"
                :append-icon="marker ? 'checked' : ''"
                :rules="emailRules"
                label="Email Address"
                class="email_input"
              ></v-text-field>
              <p class= "email_confirmation_text ml-4" v-if="this.email_confirm_text" >You will have to confirm this email address</p>
              <p class="email_confirmation_text ml-4" v-if="this.email_fill">Please fill the details first.</p>
            </v-flex>

            <v-flex xs12 sm6 md3 style="margin:0 auto" v-if="this.password_dash">
              <p class="create_password-text">Create a password</p>
              <v-text-field solo
              v-model="password_inp"
                :append-icon="show3 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                name="input-10-2"
                hint="Use at least 8 characters"
                value=""
                @click:append="show3 = !show3"
                class= "password"
              ></v-text-field>
              <p class= "password_text ml-4" v-if="this.password_fill" >Please fill the details first.</p>
            </v-flex>

            <v-flex xs12 sm6 md3 style="margin:0 auto" v-if="this.gender_dash">
              <p class="create_gender-text">Whats your gender?</p>
              <v-flex xs12 sm6 md-3 d-flex style= "max-width:100%">
                <v-select
                  :items="items"
                  label="Not selected"
                  solo
                  value= ""
                  v-model= "gender"
                ></v-select>
              </v-flex>
              <p class="gender_text ml-4" v-if="this.gender_fill">Please fill the details first.</p>
            </v-flex>

            <v-flex xs12 sm6 md3 style="margin:0 auto" v-if="this.birthday_dash">
              <p class="create_gender-text">Whats your birthday date?</p>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="208px"
                style="top: 234px; left: 37px;"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                  solo
                    v-model="date"
                    label="Birthday date"
                    prepend-icon="event"
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
              <p class="birthday_text ml-4" v-if="this.birthday_fill">Please fill the details first.</p>
            </v-flex>

            <div class="photoupload mt-5" v-if="this.photoUpload">
                <div class="ml-1">
                  <h4 class="photo-text">Take photo</h4>
                  <i class="fas fa-camera circle-icon ml-3 mt-2"></i>
                </div>
                <div class="accessphoto mt-4">
                  <p class="ml-5" style="color:#1f568c">or</p>
                  
                  <label for="file-input">
                    <span class="accessphoto-btn mt-4">ACCESS PHOTOS</span>
                    </label>
                  <input id="file-input" type="file" name="file" v-on:change="onFileChanged" />
                </div>
            </div>

            <v-flex xs12 sm6 md3 style="margin: 0 auto;" v-if="this.name_dash">
              <p class= "create_name-text">Whats your name/pseudo?</p>
              <v-text-field solo
                v-model="name"
                class="user_name"
              ></v-text-field>
              <!-- <p class= "email_confirmation_text ml-4" v-if="this.email_confirm_text" >You will have to confirm this email address</p> -->
              <p class="name_text ml-4" v-if="this.name_fill">Please fill the details first.</p>
            </v-flex>

            <v-flex xs12 sm4 text-xs-center style="max-width: 100%">
            <v-btn flat large class="next_btn" v-on:click="nextButton">NEXT</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

    </div>
    <div v-if="picklists">
      <pick-list></pick-list>
    </div>
  </v-layout>
</template>

<script>
import PickList from '~/components/picklist'
import AuthenticationService from '@/services/AuthenticationService.js'
const gauthOption = {
  clientId: '638700349576-hr5bpnk7f413q4rkva1lf2dop2mu358b.apps.googleusercontent.com',
  scope: 'mohitduttqexon@gmail.com'
}
export default {
  layout: 'dashboard',
  components: {
    PickList
  },
  data() {
      return {
        clientId: '638700349576-hr5bpnk7f413q4rkva1lf2dop2mu358b.apps.googleusercontent.com',
        acc_steps: false,

        create_dash: true,
        email_dash: false,
        password_dash:false,
        gender_dash: false,
        name_dash:false,
        birthday_dash: false,

        e_Mail: '',
        emailRules:[],
        email_confirm_text: false,
        marker: false,
        email_confirmation: true,
        email_fill: false,

        password_fill:false,

        name_fill: false,

        gender_fill: false,

        birthday_fill: false,

        picklists: false,
        
        
        show3: false,
        password: 'Password',
        password_inp: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        },

        items: ['Male', 'Female'],
        btn_value: 0,
        arrowback_value: 0,

        name: '',
        gender: '',

        date: null,
        menu: false,

        photoUpload: false,
        selectedFile: '',
      }
  },
    watch: {
        e_Mail: function (mail) { // e_Mail is the exact name used in v-model
        
        if(this.$el.getElementsByClassName('v-text-field__slot')[0].children[1] != undefined){
          this.$el.getElementsByClassName('v-text-field__slot')[0].children[1].style.color = '#275b8f'
        }
            this.email_fill = false
            if (mail !== '') {
                this.emailRules = [ v => (v.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Invalid Email address']
                // console.log(this.emailRules)
            } else if (mail === '') {
                this.emailRules = []
            }
        },
        password_inp: function(pwd){
          if(pwd.length>= 8){
            this.$el.getElementsByClassName('password')[0].children[0].children[0].children[1].children[0].children[0].innerText = "checked"
          }
        },
        menu (val) {
          val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },
  computed: {
    bgColor() {
      return this.$store.state.colors.mecaBlue
    }
  },
  created() {
     
  },
  mounted() { 
  this.$el.getElementsByClassName('v-btn__content')[1].style.justifyContent = 'left'
  this.$el.getElementsByClassName('v-btn__content')[2].style.justifyContent = 'left'
    gapi.auth2.init({
    client_id: '638700349576-hr5bpnk7f413q4rkva1lf2dop2mu358b.apps.googleusercontent.com',
    scope: 'email'
})

 
  },
  methods: {
    fbLogin(){
   FB.login(res => {
     
   }, { scope: 'email, public_profile' })
 },
    onclickgoogle(){
      gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    })
    },
      signout() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            auth2.disconnect();
        });

    },
    
  async onSignIn (user) {
      // do stuff, for example
      const access_token = user.Zi.access_token
      const response = await AuthenticationService.postData('googleSignup',{
              access_token: access_token
            })
            // console.log('response',response)
            if(response.status === 200){
              alert('user logged in successfully')
            }
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    create_account(){
      this.create_dash = !this.create_dash;
      this.acc_steps = !this.acc_steps
      this.email_dash = !this.email_dash 
      this.arrowback_value = 0;
      this.btn_value =0;
    },
    arrow_back(e){
      
      if(this.arrowback_value === 0){
        this.create_dash = !this.create_dash;
        this.acc_steps = !this.acc_steps
        this.email_dash = !this.email_dash 
          --this.arrowback_value; --this.btn_value;
      }else if(this.arrowback_value === 1){
        this.email_dash = !this.email_dash
        this.password_dash = !this.password_dash
          --this.arrowback_value; --this.btn_value;
      }else if(this.arrowback_value === 2){
        this.password_dash = !this.password_dash
        this.gender_dash = !this.gender_dash
          --this.arrowback_value; --this.btn_value;
      }else if(this.arrowback_value === 3){
        this.gender_dash = !this.gender_dash
        this.birthday_dash = !this.birthday_dash
          --this.arrowback_value; --this.btn_value;
      }else if(this.arrowback_value === 4){
        this.birthday_dash = !this.birthday_dash
        this.photoUpload = !this.photoUpload
          --this.arrowback_value; --this.btn_value;
      }else if(this.arrowback_value === 5){
        this.photoUpload = !this.photoUpload
        this.name_dash = !this.name_dash
        this.$el.getElementsByClassName('next_btn')[0].innerText= "NEXT"
        this.$el.getElementsByClassName('next_btn')[0].type = "button"
          --this.arrowback_value; --this.btn_value;
      }else{

      }
    },
   async nextButton(e){
      

      if(this.btn_value === 0){

        if(this.emailRules.length){
          if(this.email_confirmation){ //marker true only when email will be confirmed
            this.marker = !this.marker
            this.email_confirm_text = !this.email_confirm_text
            this.email_dash = !this.email_dash
            this.password_dash = !this.password_dash
            ++this.btn_value; ++this.arrowback_value;
          }else{
            this.email_confirm_text = !this.email_confirm_text
          }
        }else{
          this.email_fill = !this.email_fill
        }
      }else if(this.btn_value === 1){
        
        if(this.password_inp.length>= 8){
          this.password_dash = !this.password_dash
          this.gender_dash = !this.gender_dash
          ++this.btn_value; ++this.arrowback_value;
        }else{
          // this.password_fill  = !this.password_fill
        }
      }else if(this.btn_value === 2){
        if(this.gender != ""){
          this.gender_dash = !this.gender_dash
          this.birthday_dash = !this.birthday_dash
          ++this.btn_value; ++this.arrowback_value;
        }else{
          this.gender_fill = !this.gender_fill
        }
      }else if(this.btn_value === 3){
        if(this.date != null){
          this.birthday_dash = !this.birthday_dash
          this.photoUpload = !this.photoUpload
          this.$el.getElementsByClassName('btn-signup')[0].innerText = "USER PHOTO"
          this.$el.getElementsByClassName('next_btn')[0].innerText = "Skip"
          this.$el.getElementsByClassName('next_btn')[0].style.margin = "60% 0 0 9%"
          ++this.btn_value; ++this.arrowback_value;
        }else{
          this.birthday_fill = !this.birthday_fill
        }
      }
      else if(this.btn_value === 4){
          this.photoUpload = !this.photoUpload  
          this.name_dash = !this.name_dash
          e["path"][0].innerText = "CREATE"
          ++this.btn_value; ++this.arrowback_value;
      }else if(this.btn_value === 5){
        if(this.name.length != ''){
          this.name_dash = !this.name_dash 
          e["path"][0].type = "button" 
          ++this.btn_value; ++this.arrowback_value;
          this.acc_steps = !this.acc_steps

          if(e["path"][0].type = "button" ){
          var config = { headers: {'Content-Type': 'multipart/form-data'} };
            let formData = new FormData();
            formData.append('photo', this.selectedFile);
            formData.append('userName', this.name);
            formData.append('email', this.e_Mail);
            formData.append('password', this.password_inp);
            formData.append('gender', this.gender);
            formData.append('dob', this.date);
            const response = await AuthenticationService.postDataSignup('signup', formData, config)
            // console.log('response',response)
            if(response.status === 200){
              alert('user added succcessfully!')
              this.picklists = !this.picklists
            }
            // localStorage.setItem('accessToken', response.data.token)
          }else{
            // console.log('error submit!!');
            return false;
          }
        }else{
          this.name_fill = !this.name_fill
        }
      }
    },

    onFileChanged (event) { 
        this.selectedFile = event.target.files[0]
    },
  },
}
</script>

<style scoped>
h1{
    color: #15598d;
}
.btn-signup{
    color: #275b8f !important;
    margin-bottom: 0;
    font-size: x-large;
    font-weight: 500;
}
.layout{
    display: block !important;
}
.create_account-text, .create_password-text, .create_gender-text, .create_name-text{
    padding-top: 100px;
    /* margin: 0 auto; */
    text-align: center;
    color: #275b8f !important;
    font-weight: 500;
    font-size: 21px;
}
.next_btn{
    color: #1f568c;
    border: 1px solid #1f568c;
}
.email_confirmation_text, .name_text, .gender_text, .password_text, .birthday_text{
    color: #49749e;
    font-size: 10px;
}
.email_input{
  color: #275b8f !important
}
.arrow_back{
  float:left;
  color: #275b8e;
  cursor: pointer;
}


#customBtn {
      display: inline-block;
      background: white;
      color: #444;
      width: 190px;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
    }
    #customBtn:hover {
      cursor: pointer;
    }
    span.label {
      font-family: serif;
      font-weight: normal;
    }
    span.icon {
      background: url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
      display: inline-block;
      vertical-align: middle;
      width: 42px;
      height: 42px;
    }
    span.buttonText {
      display: inline-block;
      vertical-align: middle;
      padding-left: 42px;
      padding-right: 42px;
      font-size: 14px;
      font-weight: bold;
      /* Use the Roboto font that is loaded in the <head> */
      font-family: 'Roboto', sans-serif;
    }

.circle-icon{
  color: #1f568c;
  font-size: 40px;
  background: white;
  width: 80px;
  height: 75px;
  border-radius: 50%;
  text-align: center;
  line-height: 67px;
  vertical-align: middle;
  background-color: white;
  border: 1px solid #00000033;
}

.photo-text{
  font-weight: 200;
  width: 110px;
  color: #5077a1;
  font-size: 22px;
}

.photoupload{
    width: 100px;
    height: 100px;
    margin: auto;
}

.accessphoto-btn{
  background: rgb(255, 255, 255);
  border: 2px solid #1f568c;
  border-radius: 5px;
  color: #6b8bb0;
  padding: 6px 28px 4px 30px;
  display: inline-block;
  margin: 0 auto;
}
#file-input{
  display: none;
}
</style>
