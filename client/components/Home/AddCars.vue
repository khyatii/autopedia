<template>
  <div class="row">
    <div
      class="col-md-12 col-sm-3 col-xs-3 mb-4"
      style="text-align:center; margin-top:5px;"
      v-if="head"
    >
      <i class="fa fa-star" style="font-size:24px; color:#1f568c"></i>
      <span class="text-watchlist" style="font-size:22px; color:#245a8e;">My Watchlist</span>
    </div>
    <div v-if="body">
      <div class="addCarsName margin-bottom">
        <span class="addCars" @click="carslists">ADD A CAR</span>
      </div>
      <div class="addCarsName margin-bottom">
        <span class="manageNotification">MANAGE NOTIFICATIONS</span>
      </div>

      <div class="bgcolor row" style="text-align:left;" v-for="(caraddlist,i) in caraddlists" :key="caraddlist.id">
        <div class="col-4 left">
          <img class="imgTool" :src="caraddlist.carImage" :alt="caraddlist.carName" :title="caraddlist.carName">
        </div>
        <div class="col-6" style="color:#336496">{{caraddlist.carName}}</div>
        <div class="col-2">
          <i class="fa fa-trash vtheight" style="font-size:16px" v-on:click="deleteaddcars(i)"></i>
        </div>
      </div>
      
    </div>
    <div class="carslisting" v-if="carslisting">
        <v-text-field solo
           prepend-inner-icon="search"
           class= "search"
        ></v-text-field>

        <div class="row" style="text-align:left;" v-for="(carlist,i) in carlists" :key="carlist.id" >
          <div class="col-4 lefttool2 pl-4">
            <img class="imgTool" :src="carlist.carImage" :alt="carlist.carName" :title="carlist.carName">
          </div>
          <div class="col-6" style="color:#336496">{{carlist.carName}}</div>
          <div class="col-2">
            <div class="select" v-on:click="carSelected(i,carlist.id)"></div>
          </div>
        </div>
        <div class="confirmlistscars mt-5">
          <span class="confirmcars" @click="confirmlistscars">CONFIRM NEW CARS</span>
        </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  data() {
    return {
      head: true,
      body: true,
      carslisting: false,

      displayName: "testImage",
      profileimage: "http://tineye.com/images/widgets/mona.jpg",

      carlists: [
        {
          id:1,
          carImage: 'http://tineye.com/images/widgets/mona.jpg', 
          carName: 'Alpha Romeo 2000 GTV', 
          isSelected: false
        },
        {
          id:2,
          carImage: 'http://tineye.com/images/widgets/mona.jpg', 
          carName: 'Beta Romeo 2000 GTV', 
          isSelected: false
        },
        {
          id:3,
          carImage: 'http://tineye.com/images/widgets/mona.jpg', 
          carName: 'Gama Romeo 2000 GTV', 
          isSelected: false
        } 
      ],
      selectedCarList: [],

      caraddlists: [
        {
          id:1,
          carImage: 'http://tineye.com/images/widgets/mona.jpg', 
          carName: 'Alpha Romeo 2000 GTV',
        },
        {
          id:2,
          carImage: 'http://tineye.com/images/widgets/mona.jpg', 
          carName: 'Beta Romeo 2000 GTV',
        },
        {
          id:3,
          carImage: 'http://tineye.com/images/widgets/mona.jpg', 
          carName: 'Gama Romeo 2000 GTV',
        }
      ]
      
    }
  },
  mounted() {
    // this.getaddcars()
  },
  methods: {
    carslists() {
      this.body = !this.body;
      this.carslisting = !this.carslisting;
    },

    carSelected(i,id){
     if(this.carlists[i].isSelected == false ){
       this.$el.getElementsByClassName('select')[i].style.background = '#1f568c'
       this.carlists[i].isSelected = true
       this.selectedCarList.push(this.carlists[i])
     }else if(this.carlists[i].isSelected == true){
       for(let j=0; j<this.selectedCarList.length;j++){
         if(id == this.selectedCarList[j].id){
           this.$el.getElementsByClassName('select')[i].style.background = '';
           this.carlists[i].isSelected = false
           this.selectedCarList.splice(j,1)
         }
       }
     }
    },

    confirmlistscars(){
      var config = { headers: {'token': localStorage.accessToken} };
        AuthenticationService.postData_onlogin('favourites/addCar',{
        carName: this.selectedCarList
      }, config).then((response)=>{
          console.log('resp',response)
          if(response.data.message == 'success'){
            // alert('cars added successfully!')
          }
        }).catch((error)=>{
          console.log('error',error.response.data)
      })
    },

    getaddcars(){
      var config = { headers: {'token': localStorage.accessToken} };
        AuthenticationService.getData('favourites/getcars', config).then((response)=>{
          console.log('resp',response)
          if(response.data.message == 'success'){
            // alert('cars added successfully!')
            response.data = this.caraddlists
          }
        }).catch((error)=>{
          console.log('error',error.response.data)
      })
    },

    deleteaddcars(i){
       this.caraddlists.splice(i,1);
    }
  }
};
</script>

<style scoped>
.left {
  padding-left: 5px !important;
}
.bgcolor {
  background-color: #fff;
  margin: 5px 20px;
  border-radius: 4px;
  padding: 5px 0px;
}
.vtheight {
  vertical-align: -webkit-baseline-middle;
  color: #1f568c;
  /* white-space: nowrap; */
}
.select {
  border-radius: 50%;
  border: 1px solid #547aa3;
  height: 15px;
  width: 15px
}
.width20 {
  width: 20%;
}
.imgTool {
  padding: 2px;
  max-height: 50px;
  width: 90px;
}
.details {
  display: inline-block;
}
.margin-bottom {
  margin-bottom: 30px;
}
.addCarsName, .confirmlistscars{
  text-align: center;
  width: 100%;
}
.addCars, .confirmcars {
  background-color: #fff;
  line-height: 2;
  padding: 15px 100px;
  width: 80%;
  border-radius: 4px;
  border: 1px solid #728bac;
  color: #386596;
  /* font-size: 24px; */
}
.manageNotification {
  background-color: #fff;
  line-height: 2;
  padding: 15px 52px;
  width: 80%;
  border-radius: 4px;
  border: 1px solid #728bac;
  color: #386596;
}
</style>
