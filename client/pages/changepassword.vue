<template>
  <v-layout class= "container-fluid" align-center justify-space-around wrap fill-height  :style="`background-color: #efebe9;`">
    
    <div class= "change_password">
      <v-flex xs12 text-xs-center mt-4>
        <div style="display:inline-block; vertical-align:bottom;">
          <v-icon style="font-size:32px;" class= " arrow_back" >lock</v-icon>
        </div>
         <h2 style="display:inline-block" class= "btn-signup mt-4">Change Password</h2>
      </v-flex>
      
      <v-form @submit="checkForm">
          <v-container fluid class= "mt-5" style="background: white">
            <v-flex xs12 sm6 md3 style="margin:0 auto">
              <span class="create_password-text">Previous Password</span>
              <v-text-field 
              @focusout="focus(false)"
              v-model="pre_pwd"
                :append-icon="show3 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                value=""
                @click:append="show3 = !show3"
                class= "pre_pwd"
              ></v-text-field>
              <p class= "password_text ml-4" v-if="this.password_fill" >Please fill the details first.</p>
              <p class= "password_text ml-4" v-if="this.password_fill_correct" >Please fill correct password.</p>
            </v-flex>

            <v-flex xs12 sm6 md3 style="margin:0 auto">
              <span class="create_password-text">New Password</span>
              <v-text-field 
              v-model="new_pwd"
                :append-icon="show3 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                value=""
                @click:append="show3 = !show3"
                class= "new_pwd"
              ></v-text-field>
              <p class= "password_text ml-4" v-if="this.password_fill" >Please fill the details first.</p>
            </v-flex>

            <v-flex xs12 sm6 md3 style="margin:0 auto">
              <span class="create_password-text">Confirm Password</span>
              <v-text-field 
              v-model="confirm_pwd"
               @focusout="focusout(false)"
                :append-icon="show3 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                value=""
                @click:append="show3 = !show3"
                class= "confirm_pwd"
              ></v-text-field>
              <p class= "password_text ml-4" v-if="this.password_fill" >Please fill the details first.</p>
              <p class= "password_text ml-4" v-if="this.password_match" >Please fill the same password as above.</p>
            </v-flex>

            <!-- <v-flex xs12 sm4 text-xs-center style="max-width: 100%"> -->
            <v-btn style="width:100%; margin:0px;" flat large class="next_btn" type= "submit">Confirm Password</v-btn>
            <!-- </v-flex> -->
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
  layout: 'main',
  components: {
    pickList
  },
  data() {
      return {
        email: '',
        pre_pwd: '',
        new_pwd: '',
        confirm_pwd: '',

        password_fill: false,
        password_fill_correct: false,
        password_match: false,
        picklists: false,
        
        
        show3: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8
        },
      }
  },
    watch: {
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
    focusout(){
      if(this.confirm_pwd != this.new_pwd){
        this.password_match = true
      }else if(this.confirm_pwd == this.new_pwd){
        this.password_match = false
      }
    },
     focus(){
      var config = { headers: {'token': localStorage.accessToken}};
      AuthenticationService.postData_onlogin('checkOldPassword',{
        oldPassword: this.pre_pwd
      }, config).then((response)=>{
          console.log('resp',response)
          if( response.data.message == 'Password Match'){
            this.password_fill_correct = false
          }
      }).catch((error)=>{
        console.log('error',error.response.data.message)
        if(error.response.data.message== 'Previous Password doesnot match'){
          this.password_fill_correct = true
        }
      })
    },
     async getuserInfo(){
         const userdetail = await userdetails.getusedetails();
        //  console.log('userdetail',userdetail);
         this.email = userdetail.email
      },
  //  async nextButton(e){
     
  //  },
   async checkForm(){
   if(this.pre_pwd != '' && this.new_pwd != '' && this.confirm_pwd != ''){
     var config = { headers: {'token': localStorage.accessToken}};
     const response = await AuthenticationService.postData_onlogin('changePassword',{
        email: this.email,
        oldPassword: this.pre_pwd,
        newPassword: this.new_pwd
      }, config)
      // console.log('response',response)
   }else{
     alert('please fill up the details')
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
    font-weight: 400;
    font-size: 16px;
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
