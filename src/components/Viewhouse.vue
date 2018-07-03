<template>
    <div>
      <div v-show="!loading_flag">
        <div class="loading" style="margin-top: 100px">
          <div class="row">
            <div class="col s8 offset-s2">
              <div class="wrap hide-on-small-and-down">
                <div class="track">
                  <div class="kurt">
                    <div class="loader"></div>
                  </div>
                </div>
              </div>
              <div class="wrap hide-on-med-and-up">
                <div class="spinner spinner-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="viewhouse" v-show="loading_flag">
        <navbar></navbar>
        <section class="section section-viewhouse">
          <div class="container" v-if="this.language==='ch'">
            <div class="row">
              <div class="col s12 m5">
                <div class="card-panel">
                  <div class="blue white-text center" style="padding: 10px; width: 100%;">房屋信息</div>
                  <p>
                    <span>房屋价格：{{price}}</span>
                  </p>
                  <p>
                    <span>名字：{{name_ch}}</span>
                  </p>
                  <p>
                    <span v-if="this.isAdmin.role==='admin'">地址：{{address_ch}}</span>
                    <span v-if="this.isAdmin.role!=='admin'">地址：请联系办公室(电话：69091997)</span>
                  </p>
                  <p>
                    <span>总人数：{{totalPeople}}</span>
                  </p>
                  <p>
                    <span>房屋类型：{{houseType_ch}}</span>
                  </p>
                  <p>
                    <span>配套设施：{{facilities_ch}}</span>
                  </p>
                  <p>
                    <span>邮编号码：{{postCode}}</span>
                  </p>
                  <p>
                    <span>区域：{{area_ch}}</span>
                  </p>
                  <p>
                    <span>WIFI名：{{wifiName}}</span>
                  </p>
                  <p>
                    房屋状态：
                    <span v-if="state_tenant===0" class="green-text">马上入住</span>
                    <span v-if="state_tenant===1" class="green-text">有空房出租</span>
                    <span v-if="state_tenant===2" class="red-text">一个月后马上入住</span>
                    <span v-if="state_tenant===3" class="red-text">至少一个月后有空房出租</span>
                    <span v-if="state_tenant===4" class="grey-text">住满</span>
                  </p>
                </div>
              </div>
              <div class="col s12 m7">
                <div class="divider"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">房屋图片</div>
                </div>
                <div class="carousel carousel-slider">
                  <a class="carousel-item" :value="index" v-for="(image,index) in images">
                    <div class="card">
                      <div class="card-image">
                        <img :src="image | imgUrlHeader" alt="" class="responsive-img">
                      </div>
                    </div>
                  </a>
                </div>
                <div style="text-align: center;">{{page}} / {{images.length}}</div>
                <div class="divider" style="margin-bottom: 10px;"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">房间</div>
                </div>
                <table class="bordered highlight centered">
                  <thead>
                  <tr>
                    <th>房间类型</th>
                    <th>房间容量</th>
                    <th>价格(每人)</th>
                    <th>当前状态 <a @click="onCheckDateRooms" class="btn-floating indigo waves-light waves-effect"><i class="material-icons">refresh</i></a></th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(room,index) in rooms">
                    <td>{{room.roomType_ch}}</td>
                    <td>{{room.capacity}}</td>
                    <td>{{room.basePrice}}</td>
                    <td>
                      <span v-if="room.roomState===0 && DaysLeft[index]" class="green-text">未住满(当前：{{room.tenants.length}}人，剩余：{{DaysLeft[index]}}天)</span>
                      <span v-if="room.roomState===0 && !DaysLeft[index]" class="green-text">未住满(当前：{{room.tenants.length}}人)</span>
                      <span v-if="room.roomState===1 && DaysLeft[index]" class="red-text">至少一个月后可出租(剩余:{{DaysLeft[index]}}天)</span>
                      <span v-if="room.roomState===1 && !DaysLeft[index]" class="red-text">至少一个月后可出租</span>
                      <span v-if="room.roomState===2" class="grey-text">住满</span>
                    </td>
                    <td><a
                      class="btn-floating waves-effect waves-light blue"
                      @click="onEditRoom(room._id)"
                    >
                      <i class="material-icons">remove_red_eye</i>
                    </a></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">

            </div>
          </div>
          <div class="container" v-if="this.language==='en'">
            <div class="row">
              <div class="col s12 m5">
                <div class="card-panel">
                  <div class="blue white-text center" style="padding: 10px; width: 100%;">House Information</div>
                  <p>
                    <span>Price：{{price}}</span>
                  </p>
                  <p>
                    <span>Name：{{name_en}}</span>
                  </p>
                  <p>
                    <span v-if="this.isAdmin.role==='admin'">Address：{{address_ch}}</span>
                    <span v-if="this.isAdmin.role!=='admin'">Address：Please contact the office(Tel：69091997)</span>
                  </p>
                  <p>
                    <span>Total Capacity：{{totalPeople}}</span>
                  </p>
                  <p>
                    <span>Type：{{houseType_en}}</span>
                  </p>
                  <p>
                    <span>Facilities：{{facilities_en}}</span>
                  </p>
                  <p>
                    <span>Postcode：{{postCode}}</span>
                  </p>
                  <p>
                    <span>Area：{{area_en}}</span>
                  </p>
                  <p>
                    <span>WIFI Name：{{wifiName}}</span>
                  </p>
                  <p>
                    House State：
                    <span v-if="state_tenant===0" class="green-text">Vancy</span>
                    <span v-if="state_tenant===1" class="green-text">Room Available</span>
                    <span v-if="state_tenant===2" class="red-text">Vancy after at least 30 days </span>
                    <span v-if="state_tenant===3" class="red-text">Room Available after at least 30 days </span>
                    <span v-if="state_tenant===4" class="grey-text">Full</span>
                  </p>
                </div>
              </div>
              <div class="col s12 m7">
                <div class="divider"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">House Photos</div>
                </div>
                <div class="carousel carousel-slider">
                  <a class="carousel-item" v-for="(image,index) in images">
                    <div class="card">
                      <div class="card-image">
                        <img :src="image | imgUrlHeader" alt="" class="responsive-img">
                      </div>
                    </div>
                  </a>
                </div>
                <div style="text-align: center;">{{page}} / {{images.length}}</div>
                <div class="divider" style="margin-bottom: 10px;"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">Rooms</div>
                </div>
                <table class="bordered highlight centered">
                  <thead>
                  <tr>
                    <th>Type</th>
                    <th>Capacity</th>
                    <th>Price(/person)</th>
                    <th>State <a @click="onCheckDateRooms" class="btn-floating indigo waves-light waves-effect"><i class="material-icons">refresh</i></a></th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(room,index) in rooms">
                    <td>{{room.roomType_en}}</td>
                    <td>{{room.capacity}}</td>
                    <td>{{room.basePrice}}</td>
                    <td>
                      <span v-if="room.roomState===0 && DaysLeft[index]" class="green-text">Vancy({{room.tenants.length}} People here，{{DaysLeft[index]}} days left)</span>
                      <span v-if="room.roomState===0 && !DaysLeft[index]" class="green-text">Vancy({{room.tenants.length}} People here)</span>
                      <span v-if="room.roomState===1 && DaysLeft[index]" class="red-text">Vancy in the next month({{DaysLeft[index]}} days left)</span>
                      <span v-if="room.roomState===1 && !DaysLeft[index]" class="red-text">Vancy in the next month</span>
                      <span v-if="room.roomState===2" class="grey-text">Unavailable</span>
                    </td>
                    <td><a
                      class="btn-floating waves-effect waves-light blue"
                      @click="onEditRoom(room._id)"
                    >
                      <i class="material-icons">remove_red_eye</i>
                    </a></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">

            </div>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
  import $ from 'jquery'
  import init from "@/assets/js/myjs"
  import navbar from "@/components/Nav"
  import axios from 'axios';
  import Config from '@/data/config'
  import timeLocalStorage from 'time-localstorage';
    export default {
        name: "viewhouse",
      components:{
        navbar
      },
      data(){
        return {
          loading_flag:false,
          price:'',
          name_ch:'',
          name_en:'',
          address_ch:'',
          address_en:'',
          totalPeople:'',
          rooms:'',
          houseType_ch:'',
          houseType_en:'',
          facilities_ch:'',
          facilities_en:'',
          postCode:'',
          area_ch:'',
          area_en:'',
          wifiName:'',
          state_tenant:'',
          images:[],
          DaysLeft:[],
          page:1
        }
      },
      created(){
        init.init_all()
        this.load_house()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(!this.checkAdmin){
          this.$router.push('/')
        }
        setTimeout(()=>{
            $('.carousel-item').on('touchend',()=>{
              setTimeout(()=>{
                for(let i=0;i<document.querySelector('.carousel').children.length;i++){
                  if(document.querySelector('.carousel').children[i].className=="carousel-item active"){
                    this.page=i+1
                  }
                }
              },500)
            })
        },3000)
        // setTimeout(()=>{
        //   var timer=setInterval(()=>{
        //     $('.carousel-slider').carousel('next')
        //   },3000)
        //   $('.carousel-item').on('touchstart',()=>{
        //     clearInterval(timer)
        //   })
        //   $('.carousel-item').on('touchend',()=>{
        //     timer=setInterval(()=>{
        //       $('.carousel').carousel('next')
        //     },3000)
        //   })
        // },3000)
      },
      updated(){
          setTimeout(()=>{
            $('.carousel.carousel-slider').carousel({fullWidth: true});
          },2000)
      },
      computed:{
        language(){
          return this.$store.getters.language
        },
        clerks(){
          return this.$store.getters.load_clerks
        },
        isAdmin(){
          return this.$store.getters.loginInfo
        }
      },
      methods:{
        onEditRoom(id){
          this.$router.push('/rooms/'+id)
        },
        load_house() {
          axios({
            method: 'get',
            url: Config._ipAddress+'/houses/' + this.$route.params.houseId
          })
            .then((res) => {
                    setTimeout(()=>{
                      this.loading_flag=true
                    },1000)
              this.price=res.data.price
              this.name_ch=res.data.name_ch
              this.name_en=res.data.name_en
              this.address_ch=res.data.address_ch
              this.address_en=res.data.address_en
              this.totalPeople=res.data.totalPeople
              this.rooms=res.data.rooms
              this.houseType_ch=res.data.houseType_ch
              this.houseType_en=res.data.houseType_en
              this.facilities_ch=res.data.facilities_ch
              this.facilities_en=res.data.facilities_en
              this.postCode=res.data.postCode
              this.area_ch=res.data.area_ch
              this.area_en=res.data.area_en
              this.wifiName=res.data.wifiName
              this.state_tenant=res.data.state_tenant
              this.images=res.data.images
            })
            .catch((err) => {
              console.log(err)
            })
        },
        onCheckDateRooms(){
          axios({
            method:'get',
            url:Config._ipAddress+'/houses/checkDateRooms/'+this.$route.params.houseId
          })
            .then(res=>{
              var timeSpan=new Array()
              for(var i=0;i<res.data.rooms.length;i++){
                timeSpan[i] = new Array()
              }
              for(var i=0;i<res.data.rooms.length;i++){
                for(var j=0;j<res.data.rooms[i].tenants.length;j++){
                  if(res.data.rooms[i].tenants[j].contractEnd){
                    timeSpan[i][j] =( Date.parse(res.data.rooms[i].tenants[j].contractEnd) - Date.now() )/(1000*60*60*24)
                  }
                }
              }
              var minTimeSpan=new Array()
              for(var i=0;i<timeSpan.length;i++){
                minTimeSpan[i]=Math.min.apply(Math,timeSpan[i])
              }
              minTimeSpan=minTimeSpan.map(item=>{if(item===Infinity){return item=null}else{return item=item}})
              for(var i=0;i<minTimeSpan.length;i++){
                if(minTimeSpan[i]===null || minTimeSpan[i]>30){
                  this.DaysLeft[i]=null
                }else{
                  this.DaysLeft[i]=Math.floor(minTimeSpan[i])
                  if(this.rooms[i].roomState!==0){
                    axios({
                      method:'patch',
                      url:Config._ipAddress+'/rooms/'+this.rooms[i]._id,
                      data:{roomState:1}
                    }).then((res)=>{
                      this.load_house()
                    }).catch((err)=>{
                      console.log(err)
                    })
                  }
                }
              }
              console.log(this.DaysLeft)
              this.load_house()
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      }
    }
</script>

<style scoped>
  .wrap {
    text-align: center;
    vertical-align: middle;
  }

  .spinner {
    width: 100px;
    height: 100px;
    background: #eee;
    border-radius: 50%;
    position: relative;
    margin: 50px;
    display: inline-block;
  }
  .spinner:after, .spinner:before {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .spinner-1:after {
    position: absolute;
    top: -4px;
    left: -4px;
    border: 4px solid transparent;
    border-top-color: orangered;
    border-bottom-color: orangered;
    -webkit-animation: spinny 1s linear infinite;
    animation: spinny 1s linear infinite;
  }

  @-webkit-keyframes spinny {
    0% {
      -webkit-transform: rotate(0deg) scale(1);
      transform: rotate(0deg) scale(1);
    }
    50% {
      -webkit-transform: rotate(45deg) scale(1.2);
      transform: rotate(45deg) scale(1.2);
    }
    100% {
      -webkit-transform: rotate(360deg) scale(1);
      transform: rotate(360deg) scale(1);
    }
  }

  @keyframes spinny {
    0% {
      -webkit-transform: rotate(0deg) scale(1);
      transform: rotate(0deg) scale(1);
    }
    50% {
      -webkit-transform: rotate(45deg) scale(1.2);
      transform: rotate(45deg) scale(1.2);
    }
    100% {
      -webkit-transform: rotate(360deg) scale(1);
      transform: rotate(360deg) scale(1);
    }
  }
  .track {
    width: 300px;
    height: 0px;
    position: relative;
    display: inline-block;
    border-top: 8px dotted #eee;
  }
  .track:before {
    content: "";
    position: absolute;
    width: 300px;
    height: 0;
    border-top: 8px solid white;
    top: -8px;
    left: 0;
    -webkit-animation: eatPoints 3s linear infinite;
    animation: eatPoints 3s linear infinite;
  }

  @-webkit-keyframes eatPoints {
    0% {
      left: 0;
      right: auto;
      width: 0;
    }
    49% {
      left: 0;
      right: auto;
      width: 300px;
    }
    50% {
      left: auto;
      right: 0;
      width: 0;
    }
    100% {
      left: auto;
      right: 0;
      width: 300px;
    }
  }

  @keyframes eatPoints {
    0% {
      left: 0;
      right: auto;
      width: 0;
    }
    49% {
      left: 0;
      right: auto;
      width: 300px;
    }
    50% {
      left: auto;
      right: 0;
      width: 0;
    }
    100% {
      left: auto;
      right: 0;
      width: 300px;
    }
  }
  .kurt {
    -webkit-animation: moveChomp 3s linear infinite;
    animation: moveChomp 3s linear infinite;
    background: pink;
    width: 0px;
    height: 0px;
    position: relative;
    top: -15px;
  }
  .kurt:before {
    content: "";
    position: absolute;
    top: -12px;
    left: 30px;
    width: 7px;
    height: 7px;
    border-radius: 7px;
    background: white;
    z-index: 5;
  }

  .loader {
    background: none;
    display: inline-block;
    position: relative;
  }
  .loader:before, .loader:after {
    content: "";
    display: block;
    height: 0px;
    width: 0px;
    border: 30px solid orangered;
    border-radius: 50%;
    border-right-color: transparent;
    border-bottom-color: transparent;
    position: absolute;
    top: 50%;
    margin-top: -34px;
    animation: topchomp 0.4s ease-in-out infinite reverse;
  }
  .loader:after {
    border-color: orangered;
    border-top-color: transparent;
    border-right-color: transparent;
    -webkit-animation: bottomchomp 0.4s ease-in-out infinite;
    animation: bottomchomp 0.4s ease-in-out infinite;
  }

  @-webkit-keyframes bottomchomp {
    0%, 100% {
      -webkit-transform: rotate(10deg);
      transform: rotate(10deg);
    }
    50% {
      -webkit-transform: rotate(-50deg);
      transform: rotate(-50deg);
    }
  }

  @keyframes bottomchomp {
    0%, 100% {
      -webkit-transform: rotate(10deg);
      transform: rotate(10deg);
    }
    50% {
      -webkit-transform: rotate(-50deg);
      transform: rotate(-50deg);
    }
  }
  @-webkit-keyframes topchomp {
    0%, 100% {
      -webkit-transform: rotate(-20deg);
      transform: rotate(-20deg);
    }
    50% {
      -webkit-transform: rotate(37deg);
      transform: rotate(37deg);
    }
  }
  @keyframes topchomp {
    0%, 100% {
      -webkit-transform: rotate(-20deg);
      transform: rotate(-20deg);
    }
    50% {
      -webkit-transform: rotate(37deg);
      transform: rotate(37deg);
    }
  }
  @-webkit-keyframes moveChomp {
    0%, 100% {
      left: 0%;
    }
    50% {
      left: 100%;
    }
    0%, 49% {
      -webkit-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
    50%, 100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
    }
  }
  @keyframes moveChomp {
    0%, 100% {
      left: 0%;
    }
    50% {
      left: 100%;
    }
    0%, 49% {
      -webkit-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
    50%, 100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
    }
  }
</style>
