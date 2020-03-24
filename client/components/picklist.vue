<template>
    <div class="favourites">
      <v-container>
        <v-icon class= "mt-2 ml-1 arrow_back" @click="backarrow()">arrow_back</v-icon>
        <div class="container">
          <ul class="progressbar">
            <li class="active"></li>
            <li></li>
            <li ></li>
          </ul>
        </div>
        <p class= "fav-brand-tittle">Pick your 3 favourite brands</p>
        <v-text-field solo
               prepend-inner-icon="search"
               name="input-10-2"
               class= "search"
        ></v-text-field>

        <div class="favBrands" v-show="favBrands">
          <v-container style="margin-left:15px" v-show="selectedbrands">
            <div class="row ml-0">
               <div class="col-md-6" style="flex: 0 0 50%; max-width: 50%;" v-for="item in selectedbranditems" :key="item.id">
                 <span class="selecteditems-brands">{{item.name}}</span>
                 <span class="checkmark">
                     <div class="checkmark_circle"></div>
                     <div class="checkmark_stem"></div>
                     <div class="checkmark_kick"></div>
                 </span>
               </div>
            </div>
            <hr class="mt-4" style="background: #87a1bb;"> 
          </v-container>

          <v-container style="margin-left:15px">
           <div class="row ml-0">
              <div class="col-md-6" style="flex: 0 0 50%; max-width: 50%;" v-for="(item,i) in branditems" :key="item.id">
                <span class="items-brands" v-on:click="branditemclicked(i)">{{item.name}}</span>
              </div>
           </div>
          </v-container>
          <v-flex xs12 sm4 text-xs-center class="mt-5">
            <div>
              <v-btn  class="confirmfavbrands" v-on:click="confirmfavbrands()">Confirm Favourites</v-btn>
            </div>
          </v-flex>
        </div>

        <div class="favPeriod" v-show="favPeriod">
          <v-container style="margin-left:15px" v-show="selectedPeriod">
            <div class="row ml-0">
               <div class="col-md-6" style="flex: 0 0 50%; max-width: 50%;" v-for="item in selectedPerioditems" :key="item.id">
                 <span class="selecteditems-Period">{{item.name}}</span>
                 <span class="checkmark">
                     <div class="checkmark_circle"></div>
                     <div class="checkmark_stem"></div>
                     <div class="checkmark_kick"></div>
                 </span>
               </div>
            </div>
            <hr class="mt-4" style="background: #87a1bb;"> 
          </v-container>

          <v-container style="margin-left:15px">
           <div class="row ml-0">
              <div class="col-md-6" style="flex: 0 0 50%; max-width: 50%;" v-for="(item,i) in Perioditems" :key="item.id">
                <span class="items-period" v-on:click="Perioditemclicked(i)">{{item.name}}</span>
              </div>
           </div>
          </v-container>
          <v-flex xs12 sm4 text-xs-center class="mt-5">
            <div>
              <v-btn  class="confirmfavPeriod" v-on:click="confirmfavPeriod()">Confirm Favourites</v-btn>
            </div>
          </v-flex>
        </div>

        <div class="favType" v-show="favType">
          <v-container style="margin-left:15px" v-show="selectedType">
            <div class="row ml-0">
               <div class="col-md-6" style="flex: 0 0 50%; max-width: 50%;" v-for="item in selectedTypeitems" :key="item.id">
                 <span class="selecteditems-Type">{{item.name}}</span>
                 <span class="checkmark">
                     <div class="checkmark_circle"></div>
                     <div class="checkmark_stem"></div>
                     <div class="checkmark_kick"></div>
                 </span>
               </div>
            </div>
            <hr class="mt-4" style="background: #87a1bb;"> 
          </v-container>

          <v-container style="margin-left:15px">
           <div class="row ml-0">
              <div class="col-md-6" style="flex: 0 0 50%; max-width: 50%;" v-for="(item,i) in Typeitems" :key="item.id">
                <span class="Type-period" v-on:click="Typeitemclicked(i)">{{item.name}}</span>
              </div>
           </div>
          </v-container>
          <v-flex xs12 sm4 text-xs-center class="mt-5">
            <div>
              <v-btn  class="confirmfavType" v-on:click="confirmfavType()">Confirm Favourites</v-btn>
            </div>
          </v-flex>
        </div>
      </v-container>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  data() {
    return {
      favBrands: true,
      selectedbrands: false,
      branditems: [{name: 'ferrari'}, {name: 'audi'}],
      selectedbranditems: [],

      favPeriod: false,
      selectedPeriod: false,
      selectedPerioditems: [],
      Perioditems: [{name: '1940'}, {name: '1955'}],

      favType: false,
      selectedType: false,
      selectedTypeitems: [],
      Typeitems: [{name:'Tourism'}, {name: 'Sports'}]
    }
  },
  mounted() {
  },
  methods: {
    backarrow(){
      // this.$router.go(-1)
      this.togglesuccessbar()
    },
    togglesuccessbar(){
      if(this.favBrands == true){
        this.$el.getElementsByClassName('progressbar')[0].children[0].className = 'active'
      }else if(this.favPeriod == true){
        this.$el.getElementsByClassName('progressbar')[0].children[1].className = 'active'
      }else if(this.favType == true){
        this.$el.getElementsByClassName('progressbar')[0].children[2].className = 'active'
      }
    },
    branditemclicked(i){
      let selected = this.branditems.splice(i,1);
      if(this.selectedbranditems.length<3){
        this.selectedbranditems.push(selected[0]);
        this.selectedbrands = true
      }else{
        alert('You cant pick more than 3 favs')
      }
    },

    confirmfavbrands(){
      if(this.selectedbranditems.length){
        this.favBrands = false
        this.favPeriod = true
        this.$el.getElementsByClassName('fav-brand-tittle')[0].innerText = 'Pick Your 3 favourite periods'
        this.togglesuccessbar()
      }else{
        alert('please pick your favourite brands first')
      }
    },


    Perioditemclicked(i){
      let selected = this.Perioditems.splice(i,1);
      if(this.selectedPerioditems.length<3){
        this.selectedPerioditems.push(selected[0]);
        this.selectedPeriod = true
      }else{
        alert('You cant pick more than 3 favs')
      }
    },
    confirmfavPeriod(){
      if(this.selectedPerioditems.length){
        this.favPeriod = false
        this.favType = true
        this.$el.getElementsByClassName('fav-brand-tittle')[0].innerText = 'Pick Your 3 favourite type'
        this.togglesuccessbar()
      }else{
        alert('please pick your favourite period first')
      }
    },


    Typeitemclicked(i){
      let selected = this.Typeitems.splice(i,1);
      if(this.selectedTypeitems.length<3){
        this.selectedTypeitems.push(selected[0]);
        this.selectedType = true
      }else{
        alert('You cant pick more than 3 favs')
      }
    },
    confirmfavType(){
      var config = { headers: {'token': localStorage.accessToken}};
      if(this.selectedTypeitems.length){
        // this.favType = false
        // this.favType = true
        
        this.togglesuccessbar()
        AuthenticationService.postData_onlogin('favourites/add',{
            brand: this.selectedbranditems,
            period: this.selectedPerioditems,
            types: this.selectedTypeitems,
            carsName: []
          }, config).then((response)=>{
              console.log('resp',response)
          }).catch((error)=>{
            console.log('error',error.response)
        })
      }else{
        alert('please pick your favourite type first')
      }
    }
  },
}
</script>

<style scoped>
.container {
  width: 100%;
}

.progressbar {
  counter-reset: step;
}
.progressbar li {
  list-style: none;
  display: inline-block;
  width: 30.33%;
  position: relative;
  text-align: center;
  cursor: pointer;
}
.progressbar li:before {
  content: no-open-quote;
  width: 20px;
  height: 20px;
  line-height: 30px;
  border: 1px solid #20578c;
  border-radius: 16px;
  display: block;
  margin: 4px auto 10px auto;
  background-color: #fff;
}
.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #20578c;
  top: 15px;
  left: -50%;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active {
  color: #20578c;
}
.progressbar li.active:before {
  border-color: #20578c;
  background: #20578c
} 
.progressbar li.active + li:after {
  background-color: #20578c;
}


.fav-brand-tittle{
  text-align: center;
  color: #275b8f !important;
  font-weight: 500;
  font-size: 21px;
}
.arrow_back{
  float:left;
  color: #275b8e;
  cursor: pointer;
}

.items-brands, .items-period, .Type-period{
  background: transparent;
  padding: 20px 20px 20px 20px;
  border: 1px solid #bebebe;
  border-radius: 5px;
  color: #1f568c;
  font-weight: 500;
  font-size: 20px;
}

.selecteditems-brands, .selecteditems-Period, .selecteditems-Type{
  background: #ffffff;
  padding: 20px 20px 20px 20px;
  border: 1px solid #bebebe;
  border-radius: 5px;
  color: #1f568c;
  font-weight: 500;
  font-size: 20px;
}


.checkmark {
    display:inline-block;
    width: 22px;
    height:22px;
    -ms-transform: rotate(45deg); /* IE 9 */
    -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
    transform: rotate(45deg);
}

.checkmark_circle {
    position: absolute;
    width:22px;
    height:22px;
    background-color: #569d50;
    border-radius:11px;
    left:0;
    top:0;
}

.checkmark_stem {
    position: absolute;
    width:3px;
    height:9px;
    background-color:#fff;
    left:11px;
    top:6px;
}

.checkmark_kick {
    position: absolute;
    width:3px;
    height:3px;
    background-color:#fff;
    left:8px;
    top:12px;
}

.confirmfavbrands, .confirmfavPeriod, .confirmfavType{
  color: #1f568c;
  border-color: #1f568c;
  border-style: double;
  border-radius: 6px;
  padding: 18px 12px 36px 12px;
  background: #fff
}
</style>