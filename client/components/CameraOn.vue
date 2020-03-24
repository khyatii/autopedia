<template>
    <div class="contentarea">
  <div class="camera">
    <video class="video">Video stream not available.</video>
    <button class="startbutton" v-on:click="takepicture()">Take photo</button> 
  </div>
  <canvas class="canvas">
  </canvas>
  <div class="output">
    <img class="photo" alt="The screen capture will appear in this box."> 
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
           width: 320,
           height: 0,
           streaming: false,
           video: null,
           canvas: null,
           photo: null,
           startbutton: null
        }
    },
    components:{},
    mounted() {
       this.video = this.$el.getElementsByClassName('video')
       this.canvas = this.$el.getElementsByClassName('canvas')
       this.photo = this.$el.getElementsByClassName('photo')
       this.startbutton = this.$el.getElementsByClassName('startbutton')

       navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((stream)=> {
          this.video[0].srcObject = stream;
          this.video[0].play();
        })
        .catch(function(err) {
          console.log("An error occurred: " + err);
        });

        document.querySelector('.video').addEventListener('canplay', function(ev){
        if (!this.streaming) {
          this.height = this.videoHeight / (this.videoWidth/320);
        
          if (isNaN(this.height)) {
            this.height = this.width / (4/3);
          }
        
          this.setAttribute('width', 1000);
          this.setAttribute('height', 1000);
          this.parentNode.parentElement.children[1].setAttribute('width', 320);
          this.parentNode.parentElement.children[1].setAttribute('height', 240);
          this.streaming = true;
        }
      }, false);

    
    this.clearphoto();
    },

    methods: {
        clearphoto() {
          var context = this.canvas[0].getContext('2d');
          context.fillStyle = "#AAA";
          context.fillRect(0, 0, this.canvas[0].width, this.canvas[0].height);

          var data = this.canvas[0].toDataURL('image/png');
          this.$el.getElementsByClassName('photo')[0].setAttribute('src', data);
        },

        takepicture() {
          var context = this.canvas[0].getContext('2d');
          if (this.width) {
            // this.canvas[0].style.width = this.width;
            // this.canvas[0].style.height = this.height;
            context.drawImage(this.video[0], 0, 0, this.width, 240);
    
          var data = this.canvas[0].toDataURL('image/png');
          // this.$store.state.colors.srcurl = data;
          localStorage.setItem('src', data)
          this.$el.getElementsByClassName('photo')[0].setAttribute('src', data);
          this.$store.state.frontpage = true
          this.$store.state.gotocamera = false
          } else {
            this.clearphoto();
            }
  }
    },
}
</script>


<style scoped>
.video {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width:320px;
  height:240px;
}

.photo {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width:320px;
  height:240px;
}

.canvas {
  display:none;
}

.camera {
  width: 340px;
  display:inline-block;
}

.output {
  width: 340px;
  display:inline-block;
}

.startbutton {
  display:block;
  position:relative;
  margin-left:auto;
  margin-right:auto;
  bottom:32px;
  background-color: rgba(0, 150, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-family: "Lucida Grande", "Arial", sans-serif;
  color: rgba(255, 255, 255, 1.0);
}

.contentarea {
  font-size: 16px;
  font-family: "Lucida Grande", "Arial", sans-serif;
  width: 760px;
}
.output{
  display:none;
}
.canvas{
  display:none;
}
</style>
