<template>
  <v-layout align-center justify-space-around row wrap fill-height  :style="`background-color: #efebe9;`">
    
    <div class= "create_email">
      <v-flex xs12 text-xs-center mt-4>
         <h2 class= "btn-signup mt-4">Login</h2>
      </v-flex>
      
      <v-form>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12 sm6 md3 style="margin: 0 auto;">
              <p class= "create_account-text">Email</p>
              <v-text-field solo
                v-model="e_Mail"
                :rules="emailRules"
                label="Email Address"
                class="email_input"
              ></v-text-field>
              <!-- <p class= "email_confirmation_text ml-4" v-if="this.email_confirm_text" >You will have to confirm this email address</p> -->
              <p class="email_confirmation_text ml-4" v-if="this.email_fill">Please fill the details first.</p>
            </v-flex>

            <v-flex xs12 sm6 md3 style="margin:0 auto">
              <p class="create_password-text">Password</p>
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

            <v-flex xs12 sm4 text-xs-center style="max-width: 100%">
            <v-btn flat large class="next_btn" v-on:click="nextButton">NEXT</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

    </div>
    <div v-if="this.picklists">
      <pickList/>
    </div>
  </v-layout>
</template>

<script>
import userdetails from '@/services/userDetails'
import pickList from '@/components/picklist.vue'
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  layout: 'dashboard',
  components: {
    pickList,
    // userdetails
  },
  data() {
      return {
        e_Mail: '',
        emailRules:[],
        email_fill: false,
        password_fill: false,
        picklists: false,
        
        
        show3: false,
        password: 'Password',
        password_inp: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        },
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
        }
    },
  computed: {
    bgColor() {
      return this.$store.state.colors.mecaBlue
    }
  },
  mounted() {
      this.getuserInfo()
  },
  methods: {
     async getuserInfo(){
         const userdetail = await userdetails.parseJwt()
        //  console.log(userdetail)
      },
    nextButton(e){
      
      if(this.emailRules.length){
          if(this.password_inp.length>= 8){
              const response =  AuthenticationService.postData('login',{
              email: this.e_Mail,
              password: this.password_inp
            }).then((response)=>{
              console.log('res',response)
               alert('user logged in successfully!')
            //   this.picklists = !this.picklists
             localStorage.setItem('accessToken', response.data.token)
            this.$router.push('/signup');
            }).catch((error)=>{
              console.log(error.response)
            })
            // console.log('response',response)
            if(response.status === 200){
             
            }
          }else{
            //   this.password_fill =!this.password_fill
          }
      }else{
          this.email_fill = !this.email_fill
      }
   }
  }
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
.create_account-text{
    padding-top: 50px;
    /* margin: 0 auto; */
    /* text-align: center; */
    color: #275b8f !important;
    font-weight: 500;
    font-size: 21px;
}
.create_password-text{
    /* text-align: center; */
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
</style>
