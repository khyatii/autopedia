<template>
  <h1>d</h1>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  data() {
      return {
          
      }
  },
  mounted() {
      this.emailverify()
  },
  methods: {
      async emailverify(){
      // console.log(this.$route.query.link)
      const response =  await AuthenticationService.postData('emailVerify/'+this.$route.query.link);
        if(response.status === 200){   
            // console.log(response)
            localStorage.setItem('accessToken', response.data.token)
            this.$router.push('login');
        }
      }
  },
}
</script>
