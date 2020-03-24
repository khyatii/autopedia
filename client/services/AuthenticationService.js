import Api from '@/services/Api'
// import Vue from 'vue'
// Vue.use(GAuth, gauthOption)

export default {
 postData(page, data){

    return Api().post(page, data)
  },
  postDataSignup(page, data, config){

    return Api().post(page, data, config)
  },
  postData_onlogin(page, data, config){

    return Api().post(page, data, config)
  },
  getData(page, data){

    return Api().get(page, data)
  },
}
