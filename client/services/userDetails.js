import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  parseJwt() {
    var token = localStorage.getItem("accessToken")
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  },

   async getusedetails(){
    var config = {
      headers: {'token': localStorage.accessToken}
    };
    const response = await AuthenticationService.getData('getUserDetail', config)
    // console.log('responsenew', response)
    return response.data[0]
  }
 }
//  export default() =>{
//     var token = localStorage.getItem("accessToken")
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     return JSON.parse(window.atob(base64));
// }
